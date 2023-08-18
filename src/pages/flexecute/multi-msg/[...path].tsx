import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { FlexBuilderForm } from "@/modules/flex-builder";

import { Box } from "@/theme/ui-elements";
import { FilePlusIcon, Layout, PageHeader } from "@/modules/common";
import { useRouter } from "next/router";
import { IImportantAdoKeys, ITemplate } from "@/lib/schema/types";
import { getADOMultiExecuteTemplate } from "@/lib/schema/utils";
import { useGetFunds } from "@/modules/sdk/hooks";
import { useEffect, useMemo, useState } from "react";
import { HStack, IconButton, Input, Tooltip, useToast } from "@chakra-ui/react";
import { cloneDeep } from "@apollo/client/utilities";
import { parseJsonFromFile } from "@/lib/json";
import { parseFlexFile } from "@/lib/schema/utils/flexFile";
import { FlexBuilderFormProps } from "@/modules/flex-builder/components/FlexBuilderForm";
import { EXECUTE_CLI_QUERY, useAndromedaClient } from "@/lib/andrjs";
import { ITemplateFormData } from "@/lib/schema/templates/types";
import useConstructMultiExecuteMsg from "@/modules/sdk/hooks/useConstructMultiExecuteMsg";
import useMultiExecuteModal from "@/modules/modals/hooks/useMultiExecuteModal";
import { useAccount } from "@/lib/andrjs/hooks/useAccount";

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
  const constructMultiMsg = useConstructMultiExecuteMsg();
  const getFunds = useGetFunds();
  const { isConnected } = useAndromedaClient();
  const openMultiExecuteModal = useMultiExecuteModal(ADO_DATA.address)
  const openProxyMultiExecuteModal = useMultiExecuteModal(ADO_DATA.appAddress)

  const [modifiedTemplate, setModifiedTemplate] = useState(template);

  const isProxy = (formData: ITemplateFormData) => (IImportantAdoKeys.PROXY_MESSAGE in formData && formData[IImportantAdoKeys.PROXY_MESSAGE].$enabled === true)

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
    return constructMultiMsg(formData, proxy);
  }

  const handleSubmit: FlexBuilderFormProps['onSubmit'] = async ({ formData }) => {
    const funds = getFunds(formData);
    const msgs = getMsg(formData);
    if (isProxy(formData)) {
      openProxyMultiExecuteModal(msgs, funds)
    } else {
      openMultiExecuteModal(msgs, funds)
    }
  };

  const handleCliCopy: FlexBuilderFormProps['onCliCopy'] = (formData: ITemplateFormData) => {
    const proxy = isProxy(formData);
    const funds = getFunds(formData);
    const msgs = getMsg(formData);
    const queries: string[] = []
    msgs.forEach(msg => {
      const query = EXECUTE_CLI_QUERY({
        funds,
        msg,
        address: proxy ? ADO_DATA.appAddress : ADO_DATA.address
      })
      queries.push(query);
    })
    return queries.join('\n')
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
          notReady={!isConnected}
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
  const template = await getADOMultiExecuteTemplate(path.join("/"));
  if (!template) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      template: JSON.parse(JSON.stringify(template)),
    },
    revalidate: 300,
  };
};

export default TemplatePage;
