import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { FlexBuilderForm } from "@/modules/flex-builder";

import { Box } from "@/theme/ui-elements";
import { FilePlusIcon, Layout, PageHeader } from "@/modules/common";
import { useRouter } from "next/router";
import { IImportantAdoKeys, ITemplate } from "@/lib/schema/types";
import { useGetFunds } from "@/modules/sdk/hooks";
import { useWallet } from "@/lib/wallet";
import { useEffect, useMemo, useState } from "react";
import { HStack, IconButton, Input, Tooltip, useToast } from "@chakra-ui/react";
import { cloneDeep } from "@apollo/client/utilities";
import { parseJsonFromFile } from "@/lib/json";
import { parseFlexFile } from "@/lib/schema/utils/flexFile";
import { FlexBuilderFormProps } from "@/modules/flex-builder/components/FlexBuilderForm";
import { EXECUTE_CLI_QUERY } from "@/lib/andrjs";
import { ITemplateFormData } from "@/lib/schema/templates/types";
import { getEmbeddableTemplateById } from "@/lib/schema/utils/embeddables";
import { IEmbeddableConfig } from "@/lib/schema/types/embeddables";
import { constructMsg } from "@/modules/sdk/utils";
import useEmbeddableModal from "@/modules/modals/hooks/useEmbeddableModal";

type Props = {
  template: ITemplate
};

const TemplatePage: NextPage<Props> = ({ template }) => {
  const router = useRouter();
  const toast = useToast({
    position: "top-right",
  });

  const account = useWallet();
  const openModal = useEmbeddableModal();

  const [modifiedTemplate, setModifiedTemplate] = useState(template);

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
      toast({
        title: "Error while importing",
        status: "error",
      });
    }
  };

  const getMsg = (formData: ITemplateFormData) => {
    const appConfig = formData[IImportantAdoKeys.EMBEDDABLE_APP];
    const msg: IEmbeddableConfig = {
      // Remove system fields starting with $
      ...constructMsg(appConfig),
      collections: []
    }
    Object.entries(formData).forEach(([name, config]) => {
      console.log(config);
      if(config.$class !== 'embeddable') return;
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
    openModal({ config });
  };


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
          notReady={!account}
          addButtonTitle="Add Collection"
          hideOpenInAppBuilder
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
  const id = params?.id as string;
  const template = await getEmbeddableTemplateById(id);
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
