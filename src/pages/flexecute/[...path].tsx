import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { FlexBuilderForm } from "@/modules/flex-builder";

import { Box, Flex, Text } from "@/theme/ui-elements";
import { FileCheckIcon, FilePlusIcon, Layout, PageHeader, truncate } from "@/modules/common";
import { useRouter } from "next/router";
import { IImportantAdoKeys, ITemplate } from "@/lib/schema/types";
import { useExecuteModal } from "@/modules/modals/hooks";
import { getADOExecuteTemplate } from "@/lib/schema/utils";
import useConstructADOExecuteMsg from "@/modules/sdk/hooks/useConstructaADOExecuteMsg";
import { useGetFunds } from "@/modules/sdk/hooks";
import { useWallet } from "@/lib/wallet";
import { useCallback, useEffect, useMemo, useState } from "react";
import useConstructProxyMsg from "@/modules/sdk/hooks/useConstructProxyMsg";
import { FormControl, FormLabel, HStack, IconButton, Input, Switch, Tooltip, useToast } from "@chakra-ui/react";
import { cloneDeep } from "@apollo/client/utilities";
import { parseJsonFromFile } from "@/lib/json";
import { parseFlexFile } from "@/lib/schema/utils/flexFile";
import { FlexBuilderFormProps } from "@/modules/flex-builder/components/FlexBuilderForm";
import { EXECUTE_CLI_QUERY } from "@/lib/andrjs";
import { ITemplateFormData } from "@/lib/schema/templates/types";

type Props = {
  template: ITemplate
};

const TemplatePage: NextPage<Props> = ({ template }) => {
  const router = useRouter();
  const toast = useToast({
    position: "top-right",
  });

  const ADO_DATA = useMemo(() => {
    const name = router.query.name as string;
    const address = router.query.address as string;
    const appAddress = router.query.appAddress as string;
    return {
      name,
      address,
      appAddress
    }
  }, [router])

  const constructExecuteMsg = useConstructADOExecuteMsg();
  const constructProxyMsg = useConstructProxyMsg();

  const openExecuteModal = useExecuteModal(ADO_DATA.address);
  const openProxyModal = useExecuteModal(ADO_DATA.appAddress);

  const getFunds = useGetFunds();
  const account = useWallet();

  const isProxy = (formData: ITemplateFormData) => (IImportantAdoKeys.PROXY_MESSAGE in formData && formData[IImportantAdoKeys.PROXY_MESSAGE].$enabled === true)
  const [modifiedTemplate, setModifiedTemplate] = useState(template);

  useEffect(() => {
    const newTemplate = cloneDeep(template);
    const formData = newTemplate.formData ?? {};
    formData[IImportantAdoKeys.PROXY_MESSAGE] = {
      ...(formData[IImportantAdoKeys.PROXY_MESSAGE] ?? {}),
      parent: ADO_DATA.appAddress,
      component_name: ADO_DATA.name,
    };
    newTemplate.formData = formData;
    setModifiedTemplate(newTemplate);
  }, [ADO_DATA, template]);

  const handleFlexInput = async (file: File) => {
    try {
      const json = await parseJsonFromFile(file) as ITemplate;
      if (json.id !== template.id) throw new Error('This staging file is not supported for this template')
      json.name = template.name;
      json.description = template.description;
      json.ados.forEach(ado => {
        ado.removable = true;
        ado.required = false;
      })
      const _template = await parseFlexFile(json);
      const formData = _template.formData ?? {};
      formData[IImportantAdoKeys.PROXY_MESSAGE] = {
        ...(formData[IImportantAdoKeys.PROXY_MESSAGE] ?? {}),
        parent: ADO_DATA.appAddress,
        component_name: ADO_DATA.name,
      };
      _template.formData = formData;
      _template.modules = template.modules
      setModifiedTemplate(_template);
      toast({
        title: "Import successfull",
        status: "success",
      });
    } catch (err) {
      toast({
        title: "Error while importing",
        status: "error",
        description: (err as any).message
      });
    }
  };

  const getMsg = (formData: any) => {
    const proxy = isProxy(formData);
    if (proxy) {
      return constructProxyMsg(formData);
    }
    return constructExecuteMsg(formData);
  }

  const handleSubmit: FlexBuilderFormProps['onSubmit'] = async ({ formData }) => {
    const funds = getFunds(formData);
    const msg = getMsg(formData);
    const proxy = isProxy(formData);
    if (proxy) {
      openProxyModal(msg, funds);
    } else {
      openExecuteModal(msg, funds);
    }
  };

  const handleCliCopy: FlexBuilderFormProps['onCliCopy'] = (formData) => {
    const proxy = isProxy(formData);
    const funds = getFunds(formData);
    const msg = getMsg(formData);
    const query = EXECUTE_CLI_QUERY({
      funds,
      msg,
      address: proxy ? ADO_DATA.appAddress : ADO_DATA.address
    })
    console.log(query, "QUERY")
    return query
  }

  const InputElement = useMemo(
    () => (
      <HStack spacing={4}>
        <Box>
          <Tooltip label='Import Staging' color='dark.500'>
            <IconButton
              as="label"
              htmlFor="flexecute-file-input"
              variant="outline"
              aria-label="flex-input"
              cursor="pointer"
              icon={<FilePlusIcon boxSize={5} color="gray.500" />}
            />
          </Tooltip>
          <Input
            onChange={(e) => {
              const file = e.target.files?.item(0);
              if (file) {
                handleFlexInput(file);
              }
            }}
            multiple={false}
            type="file"
            id="flexecute-file-input"
            // Only Allow flex file
            accept=".flex"
            srOnly
          />
        </Box>
      </HStack>
    ),
    [handleFlexInput],
  );

  const UPDATE_KEY = useMemo(() => Math.random(), [modifiedTemplate]);

  return (
    <Layout>
      <PageHeader
        title={modifiedTemplate.name || `Execute message`}
        desc={modifiedTemplate.description || `Ado address ${ADO_DATA.address}`}
        rightElement={InputElement}
      />
      <Box mt={10}>
        <FlexBuilderForm
          // ID is required to refresh the component after we modify the template. If not provided,
          // form will not populate name and address field on direct visit to the page
          key={UPDATE_KEY}
          template={modifiedTemplate}
          onSubmit={handleSubmit}
          notReady={!account}
          addButtonTitle="Add Attachment"
          onCliCopy={handleCliCopy}
        />
      </Box>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const { params } = ctx;
  const path = params?.path as string[];
  const executeTemplate = await getADOExecuteTemplate(path.join("/"));
  if (!executeTemplate) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      template: JSON.parse(JSON.stringify(executeTemplate)),
    },
    revalidate: 300,
  };
};

export default TemplatePage;
