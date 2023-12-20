import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { FlexBuilderForm } from "@/modules/flex-builder";

import { Box } from "@/theme/ui-elements";
import { FilePlusIcon, Layout, PageHeader } from "@/modules/common";
import { useRouter } from "next/router";
import { IImportantAdoKeys, ITemplate } from "@/lib/schema/types";
import { useExecuteModal } from "@/modules/modals/hooks";
import { getADOExecuteTemplate } from "@/lib/schema/utils";
import useConstructADOExecuteMsg from "@/modules/sdk/hooks/useConstructaADOExecuteMsg";
import { useGetFunds } from "@/modules/sdk/hooks";
import { useEffect, useMemo, useState } from "react";
import useConstructProxyMsg from "@/modules/sdk/hooks/useConstructProxyMsg";
import { Button, HStack, Icon, IconButton, Input, Menu, MenuButton, Tooltip, useToast } from "@chakra-ui/react";
import { cloneDeep } from "@apollo/client/utilities";
import { parseJsonFromFile } from "@/lib/json";
import { parseFlexFile } from "@/lib/schema/utils/flexFile";
import { FlexBuilderFormProps } from "@/modules/flex-builder/components/FlexBuilderForm";
import { EXECUTE_CLI_QUERY, useAndromedaClient } from "@/lib/andrjs";
import { ITemplateFormData } from "@/lib/schema/templates/types";
import { useGetFlexFileFromSession, useGetFlexFileFromUrl } from "@/modules/flex-builder/hooks/useFlexFile";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { ListIcon } from "lucide-react";
import ModifierDropdown from "@/modules/assets/components/AdosList/ModifierDropdown";

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
  const client = useAndromedaClient();

  const { flex: urlFlex, loading: urlLoading } = useGetFlexFileFromUrl();
  const { flex: sessionFlex, loading: sessionLoading } = useGetFlexFileFromSession();
  const importedTemplate = useMemo(() => {
    if (urlFlex && urlFlex.id === template.id) return urlFlex;
    if (sessionFlex && sessionFlex.id === template.id) return sessionFlex;
    return template;
  }, [urlFlex, sessionFlex, template])

  const loading = useMemo(() => urlLoading || sessionLoading, [urlLoading, sessionLoading])

  const isProxy = (formData: ITemplateFormData) => (IImportantAdoKeys.PROXY_SETTING.key in formData && formData[IImportantAdoKeys.PROXY_SETTING.key].$enabled === true)
  const [modifiedTemplate, setModifiedTemplate] = useState(importedTemplate);
  useEffect(() => {
    if (loading) return;
    const tid = setTimeout(async () => {
      const _template = await handleFlexUpdate(importedTemplate).catch(() => template)

      const newTemplate = cloneDeep(_template);
      const formData = newTemplate.formData ?? {};
      formData[IImportantAdoKeys.PROXY_SETTING.key] = {
        ...(formData[IImportantAdoKeys.PROXY_SETTING.key] ?? {}),
        parent: ADO_DATA.appAddress,
        component_name: ADO_DATA.name,
      };
      newTemplate.formData = formData;
      setModifiedTemplate(newTemplate);
    }, 500)
    return () => clearTimeout(tid);
  }, [ADO_DATA, importedTemplate])


  const handleFlexInput = async (file: File) => {
    try {
      const json = await parseJsonFromFile(file) as ITemplate;
      const _template = await handleFlexUpdate(json);
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

  const handleFlexUpdate = async (json: ITemplate) => {
    if (json.id !== template.id) throw new Error('This staging file is not supported for this template')
    json.name = template.name;
    json.description = template.description;
    const _template = await parseFlexFile(json);
    const formData = _template.formData ?? {};
    formData[IImportantAdoKeys.PROXY_SETTING.key] = {
      ...(formData[IImportantAdoKeys.PROXY_SETTING.key] ?? {}),
      parent: ADO_DATA.appAddress,
      component_name: ADO_DATA.name,
    };
    _template.formData = formData;
    _template.modules = template.modules
    return _template;
  }
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
        <Menu placement="bottom-end">
          <MenuButton
            as={Button}
            variant="theme-low"
            size='sm'
            leftIcon={<Icon as={ListIcon} />}
          >
            More Modifiers
          </MenuButton>
          <ModifierDropdown
            address={ADO_DATA.address}
            ado={template.adoType}
            version={template.adoVersion}
            name={ADO_DATA.name}
            proxyAddress={ADO_DATA.appAddress}
          />
        </Menu>
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
          notReady={loading && !client?.isConnected}
          addButtonTitle="Add Attachment"
          onCliCopy={handleCliCopy}
          copyProps={{
            url: (uri) => SITE_LINKS.adoExecute(template.id, ADO_DATA.address, ADO_DATA.name, ADO_DATA.appAddress, uri)
          }}
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
