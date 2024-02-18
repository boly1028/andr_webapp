import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { FlexBuilderForm } from "@/modules/flex-builder";

import { Box } from "@/theme/ui-elements";
import { FilePlusIcon, Layout, PageHeader } from "@/modules/common";
import { useRouter } from "next/router";
import { IImportantAdoKeys, ITemplate } from "@/lib/schema/types";
import { useEffect, useMemo, useState } from "react";
import { HStack, Icon, IconButton, Input, Tooltip, useToast } from "@chakra-ui/react";
import { parseJsonFromFile } from "@/lib/json";
import { parseFlexFile } from "@/lib/schema/utils/flexFile";
import { FlexBuilderFormProps } from "@/modules/flex-builder/components/FlexBuilderForm";
import { ITemplateFormData } from "@/lib/schema/types/templates";
import { IEmbeddableConfig } from "@/lib/schema/types/embeddables";
import { constructMsg } from "@/modules/sdk/utils";
import useEmbeddableModal from "@/modules/modals/hooks/useEmbeddableModal";
import { useGetEmbeddabeleConfig } from "@/modules/embeddables/hooks/useGetEmbeddableConfig";
import { cloneDeep } from "@apollo/client/utilities";
import { CogIcon } from "lucide-react";
import { getFlexBuilderTemplateById } from "@/lib/schema/utils/template";
import { EMBEDDABLE_TEMPLATES } from "@/lib/schema/templates/embeddable";

type Props = {
  template: ITemplate
};

const TemplatePage: NextPage<Props> = ({ template }) => {
  const [modifiedTemplate, setModifiedTemplate] = useState(template);
  const router = useRouter();
  const eKey = router.query.key as string;
  const { config, loading } = useGetEmbeddabeleConfig(eKey);

  useEffect(() => {
    if (!config) return;
    if (config.$type !== template.id) return;
    handleConfigInput(config);

  }, [config])

  const handleConfigInput = async (config: IEmbeddableConfig) => {
    const newTemplate = cloneDeep(template);
    const formData: ITemplateFormData = {};
    const { collections, ...appMeta } = config;
    formData[IImportantAdoKeys.EMBEDDABLE_APP.key] = {
      ...appMeta as any,
    }
    collections.forEach(col => {
      const { id, ...colMeta } = col
      formData[id] = {
        ...colMeta as any,
      }
      newTemplate.ados.push({ path: template.modules?.find(module => module.schema?.schema.$id === col.type as any)?.path ?? '', 'id': col.id, 'required': false, enabled: true, removable: true })
    })
    newTemplate.formData = formData;
    parseFlexFile(newTemplate).then(_template => {
      setModifiedTemplate({
        ...template,
        ados: _template.ados,
        formData: _template.formData,
        schema: _template.schema,
        uiSchema: _template.uiSchema
      });
    })
  }

  const toast = useToast({
    position: "top-right",
  });

  const openModal = useEmbeddableModal();


  const handleFlexInput = async (file: File) => {
    try {
      const json = await parseJsonFromFile(file) as ITemplate;
      json.ados.forEach(ado => {
        const templateAdo = template.ados.find(a => a.id === ado.id)
        if (templateAdo) {
          ado = templateAdo
        } else {
          ado.required = false;
        }
      })
      const _template = await parseFlexFile(json);
      setModifiedTemplate({
        ...template,
        ados: _template.ados,
        formData: _template.formData,
        schema: _template.schema,
        uiSchema: _template.uiSchema
      });
      toast({
        title: "Import successfull",
        status: "success",
      });
    } catch (err) {
      console.log(err)
      toast({
        title: "Error while importing",
        status: "error",
      });
    }
  };

  const getMsg = (formData: ITemplateFormData) => {
    const appConfig = formData[IImportantAdoKeys.EMBEDDABLE_APP.key];
    const msg: IEmbeddableConfig = {
      // Remove system fields starting with $
      ...constructMsg(appConfig),
      collections: [],
      $type: template.id
    }
    Object.entries(formData).forEach(([name, config]) => {
      if (config.$class !== 'embeddable') return;
      if (!config.$enabled) return;
      msg.collections.push({
        ...constructMsg(config),
        id: name,
        type: config.$type as any,
      })
    })
    return msg;
  }

  const handleSubmit: FlexBuilderFormProps['onSubmit'] = async ({ formData }) => {
    const config = getMsg(formData);
    openModal({ config, eKey });
  };


  const InputElement = useMemo(
    () => (
      <HStack spacing={4}>
        <Box>
          <Tooltip label='Import Config'>
            <IconButton
              as="label"
              htmlFor="config-file-input"
              variant="outline"
              aria-label="flex-input"
              cursor="pointer"
              icon={<Icon as={CogIcon} boxSize={5} color='content.medium' />}
            />
          </Tooltip>
          <Input
            onChange={(e) => {
              const file = e.target.files?.item(0);
              if (file) {
                try {
                  parseJsonFromFile(file).then((json: IEmbeddableConfig) => {
                    handleConfigInput(json);
                  })
                } catch (err) {
                  toast({
                    status: 'error',
                    title: "Error while loading config"
                  })
                }
              }
            }}
            multiple={false}
            type="file"
            id="config-file-input"
            // Only Allow flex file
            accept=".json"
            srOnly
          />
        </Box>
        <Box>
          <Tooltip label='Import Staging'>
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
        title={modifiedTemplate.name}
        desc={modifiedTemplate.description}
        rightElement={InputElement}
      />

      <Box my={10}>
        <FlexBuilderForm
          // ID is required to refresh the component after we modify the template. If not provided,
          // form will not populate name and address field on direct visit to the page
          key={UPDATE_KEY}
          template={modifiedTemplate}
          onSubmit={handleSubmit}
          notReady={loading}
          addButtonTitle="Add Collection"
          hideOpenInAppBuilder
        />
      </Box>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: EMBEDDABLE_TEMPLATES.map(t => ({
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
  const template = await getFlexBuilderTemplateById(id, EMBEDDABLE_TEMPLATES);
  if (!template) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      template: template,
    },
    revalidate: 300,
  };
};

export default TemplatePage;
