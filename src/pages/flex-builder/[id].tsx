import { Box, HStack, IconButton, Input, Tooltip, useToast } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { INSTANTIATE_CLI_QUERY, useCodeId } from "@/lib/andrjs";
import { FilePlusIcon, Layout, PageHeader } from "@/modules/common";
import { FlexBuilderForm } from "@/modules/flex-builder";
import { useInstantiateModal } from "@/modules/modals/hooks";
import { useConstructAppMsg } from "@/modules/sdk/hooks";
import { ITemplate } from "@/lib/schema/types";
import { getAppTemplateById } from "@/lib/schema/utils";
import { useWallet } from "@/lib/wallet";
import { ILinkItemKey } from "@/modules/common/components/Sidebar";
import { FlexBuilderFormProps } from "@/modules/flex-builder/components/FlexBuilderForm";
import { useCallback, useEffect, useMemo, useState } from "react";
import { parseJsonFromFile } from "@/lib/json";
import { parseFlexFile } from "@/lib/schema/utils/flexFile";

type Props = {
  template: ITemplate;
};

const TemplatePage: NextPage<Props> = ({ template }) => {
  const codeId = useCodeId(template.adoType, template.adoVersion);
  const account = useWallet();
  const [modifiedTemplate, setModifiedTemplate] = useState(template);
  const toast = useToast({
    position: "top-right",
  });
  const construct = useConstructAppMsg();
  const openModal = useInstantiateModal(codeId);

  const getMsg = (formData: any) => {
    console.log(formData);
    const msg = construct(formData);
    return msg;
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
      if (json.id !== template.id) throw new Error('This staging file is not supported for this template')
      json.name = template.name;
      json.description = template.description;
      json.ados.forEach(ado => {
        ado.removable = true;
        ado.required = false;
      })
      const _template = await parseFlexFile(json);

      // By default parse Flex file add all available ados in modules. Replace them with template specific modules
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
          notReady={!codeId || codeId === -1 || !account}
          addButtonTitle="Add App Component"
          onCliCopy={handleCliCopy}
        />
      </Box>
    </Layout>
  );
};

// DIRECTLY CALLING DATABASE FUNCTION IS FASTER THAN CALLING THROUGH API ENDPOINTZ

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const { params } = ctx;
  const id = params?.id as string;
  const data = await getAppTemplateById(id);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { template: data },
    revalidate: 300,
  };
};

export default TemplatePage;
