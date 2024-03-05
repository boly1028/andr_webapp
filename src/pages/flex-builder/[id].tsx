import { Box, HStack, IconButton, Input, Tooltip, useToast } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { INSTANTIATE_CLI_QUERY, useCodeId } from "@/lib/andrjs";
import { FilePlusIcon, Layout, PageHeader } from "@/modules/common";
import { FlexBuilderForm } from "@/modules/flex-builder";
import { useInstantiateModal } from "@/modules/modals/hooks";
import { useConstructAppMsg } from "@/modules/sdk/hooks";
import { IImportantAdoKeys, IImportantTemplateTypes, ITemplate } from "@/lib/schema/types";
import { ILinkItemKey } from "@/modules/common/components/sidebar/utils";
import { FlexBuilderFormProps } from "@/modules/flex-builder/components/FlexBuilderForm";
import { useCallback, useEffect, useMemo, useState } from "react";
import { parseJsonFromFile } from "@/lib/json";
import { parseFlexFile } from "@/lib/schema/utils/flexFile";
import useConstructADOMsg from "@/modules/sdk/hooks/useConstructADOMsg";
import { useAccount } from "@/lib/andrjs/hooks/useAccount";
import { useGetFlexFileFromSession, useGetFlexFileFromUrl } from "@/modules/flex-builder/hooks/useFlexFile";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { getFlexBuilderTemplateById } from "@/lib/schema/utils/template";
import APP_TEMPLATES from "@/lib/schema/templates";

type Props = {
  template: ITemplate;
};

const TemplatePage: NextPage<Props> = ({ template }) => {
  const { flex: urlFlex, loading: urlLoading } = useGetFlexFileFromUrl();
  const { flex: sessionFlex, loading: sessionLoading } = useGetFlexFileFromSession();
  const importedTemplate = useMemo(() => {
    if (urlFlex && urlFlex.id === template.id) return urlFlex;
    if (sessionFlex && sessionFlex.id === template.id) return sessionFlex;
    return template;
  }, [urlFlex, sessionFlex, template])

  const loading = useMemo(() => urlLoading || sessionLoading, [urlLoading, sessionLoading])

  const codeId = useCodeId(template.adoType, template.adoVersion);
  const account = useAccount();

  const [modifiedTemplate, setModifiedTemplate] = useState(importedTemplate);
  useEffect(() => {
    if (loading) return;
    const tid = setTimeout(async () => {
      await handleFlexUpdate(importedTemplate).then(res => {
        setModifiedTemplate(res);
      }).catch(console.error)
    }, 500)
    return () => clearTimeout(tid);
  }, [importedTemplate, loading])

  const toast = useToast({
    position: "top-right",
  });
  const construct = useConstructAppMsg();
  const constructAdo = useConstructADOMsg();
  const openModal = useInstantiateModal(codeId);

  const getMsg = (formData: any) => {
    console.log(formData);
    if (template.adoType === 'app' || template.adoType === 'app-contract') {
      return construct(formData);
    } else {
      return constructAdo(formData)
    }
  }

  const handleSubmit = async ({ formData }) => {
    if (codeId === -1) {
      console.warn("Code ID not fetched");
      return;
    }
    const msg = getMsg(formData);
    openModal(msg);
  };

  const handleCliCopy: FlexBuilderFormProps['onCliCopy'] = useCallback((formData) => {
    if (codeId === -1) {
      console.warn("Code ID not fetched");
      return '';
    }
    const msg = getMsg(formData);
    const query = INSTANTIATE_CLI_QUERY({
      msg,
      codeId: codeId
    })
    console.log(query)
    return query
  }, [codeId, getMsg])

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
    if (template.id !== IImportantTemplateTypes.BLANK_CANVAS && json.id !== template.id) throw new Error('This staging file is not supported for this template')
    json.name = template.name;
    json.description = template.description;
    if (template.id === IImportantTemplateTypes.BLANK_CANVAS) {
      json.ados.forEach(ado => {
        if (ado.id === IImportantAdoKeys.PUBLISH_SETTING.key) return;
        ado.removable = true;
        ado.required = false;
      })
    }
    const _template = await parseFlexFile(json);

    // By default parse Flex file add all available ados in modules. Replace them with template specific modules
    _template.modules = template.modules
    return _template;
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
    <Layout activeLink={ILinkItemKey.ADO_BUILDER}>
      <PageHeader title={template.name} desc={template.description}
        rightElement={InputElement}
      />
      <Box mt={10}>
        <FlexBuilderForm
          key={UPDATE_KEY}
          template={modifiedTemplate}
          onSubmit={handleSubmit}
          notReady={loading && !codeId || codeId === -1 || !account}
          addButtonTitle="Add App Component"
          onCliCopy={handleCliCopy}
          copyProps={{
            url: (uri) => SITE_LINKS.flexBuilder(template.id, uri)
          }}
        />
      </Box>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: APP_TEMPLATES.map(t => ({
      params: {
        id: t.id
      }
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const { params } = ctx;
  const id = params?.id as string;
  const data = await getFlexBuilderTemplateById(id, APP_TEMPLATES);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { template: data },
    revalidate: 3600,
  };
};

export default TemplatePage;
