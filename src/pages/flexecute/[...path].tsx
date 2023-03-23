import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { FlexBuilderForm, StagingDocumentsModal } from "@/modules/flex-builder";

import { Box, Flex, Text } from "@/theme/ui-elements";
import { FileCheckIcon, FilePlusIcon, Layout, PageHeader, truncate } from "@/modules/common";
import { useRouter } from "next/router";
import { IImportantAdoKeys, ITemplate } from "@/lib/schema/types";
import { useExecuteModal } from "@/modules/modals/hooks";
import { getADOExecuteTemplate, getProxyTemplate } from "@/lib/schema/utils";
import useConstructADOExecuteMsg from "@/modules/sdk/hooks/useConstructaADOExecuteMsg";
import { useGetFunds } from "@/modules/sdk/hooks";
import { useWallet } from "@/lib/wallet";
import { useCallback, useEffect, useMemo, useState } from "react";
import useConstructProxyMsg from "@/modules/sdk/hooks/useConstructProxyMsg";
import { FormControl, FormLabel, HStack, IconButton, Input, Switch, Tooltip, useToast } from "@chakra-ui/react";
import { cloneDeep } from "@apollo/client/utilities";
import { parseJsonFromFile } from "@/lib/json";
import { parseFlexFile } from "@/lib/schema/utils/flexFile";
import { DownloadIcon } from "@chakra-ui/icons";
import { FlexBuilderFormProps } from "@/modules/flex-builder/components/FlexBuilderForm";
import { EXECUTE_CLI_QUERY } from "@/lib/andrjs";

type Props = {
  executeTemplate: ITemplate
  proxyTemplate: ITemplate
};

const TemplatePage: NextPage<Props> = ({ executeTemplate, proxyTemplate }) => {
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


  const [toggleProxy, setToggleProxy] = useState(false)
  const [modifiedTemplate, setModifiedTemplate] = useState(executeTemplate);

  useEffect(() => {
    if (!toggleProxy) {
      setModifiedTemplate(executeTemplate)
      return;
    };
    const newTemplate = cloneDeep(proxyTemplate);
    const formData = newTemplate.formData ?? {};
    formData[IImportantAdoKeys.PROXY_MESSAGE] = {
      ...(formData[IImportantAdoKeys.PROXY_MESSAGE] ?? {}),
      parent: ADO_DATA.appAddress,
      component_name: ADO_DATA.name,
    };
    newTemplate.formData = formData;
    setModifiedTemplate(newTemplate);
  }, [ADO_DATA, toggleProxy, executeTemplate, proxyTemplate]);

  const handleFlexInput = async (file: File) => {
    try {
      const json = await parseJsonFromFile(file);
      const _template = await parseFlexFile(json);

      const clone = cloneDeep(modifiedTemplate);
      clone.ados.forEach((ado) => {
        if (ado.id === IImportantAdoKeys.PROXY_MESSAGE) return;
        if (!_template.formData?.[ado.id]) throw new Error("Wrong flex file");
        if (clone.formData) {
          clone.formData[ado.id] = {
            ...clone.formData[ado.id],
            ..._template.formData?.[ado.id],
          };
        }
      });
      setModifiedTemplate(clone);
      toast({
        title: "Import successfull",
        status: "success",
      });
    } catch (err) {
      toast({
        title: "Error while importing",
        status: "error",
      });
    }
  };

  const getMsg = (formData: any) => {
    if (toggleProxy) {
      return constructProxyMsg(formData);
    }
    return constructExecuteMsg(formData);
  }

  const handleSubmit: FlexBuilderFormProps['onSubmit'] = async ({ formData }) => {
    const funds = getFunds(formData);
    const msg = getMsg(formData);
    if (toggleProxy) {
      openProxyModal(msg, funds);
    } else {
      openExecuteModal(msg, funds);
    }
  };

  const handleCliCopy: FlexBuilderFormProps['onCliCopy'] = (formData) => {
    const funds = getFunds(formData);
    const msg = getMsg(formData);
    const query = EXECUTE_CLI_QUERY({
      funds,
      msg,
      address: toggleProxy ? ADO_DATA.appAddress : ADO_DATA.address
    })
    console.log(query, "QUERY")
    return query
  }

  const InputElement = useMemo(
    () => (
      <HStack spacing={4}>
        <Box>
          <FormControl display='flex' alignItems='center' color='dark.500'>
            <FormLabel htmlFor='use-proxy' mb='0' fontSize='sm'>
              Use Proxy?
            </FormLabel>
            <Switch isChecked={toggleProxy} onChange={(e) => setToggleProxy(e.target.checked)} id='use-proxy' />
          </FormControl>
        </Box>
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
    [handleFlexInput, toggleProxy],
  );

  const UPDATE_KEY = useMemo(() => Math.random(), [modifiedTemplate]);


  return (
    <Layout>
      <PageHeader
        title={modifiedTemplate.name || `Execute message`}
        desc={modifiedTemplate.description || `${toggleProxy ? 'App' : 'Ado'} address ${toggleProxy ? ADO_DATA.appAddress : ADO_DATA.address}`}
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
  const proxyTemplate = await getProxyTemplate(path.join("/"));
  if (!executeTemplate || !proxyTemplate) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      executeTemplate: JSON.parse(JSON.stringify(executeTemplate)),
      proxyTemplate: JSON.parse(JSON.stringify(proxyTemplate))
    },
    revalidate: 300,
  };
};

export default TemplatePage;
