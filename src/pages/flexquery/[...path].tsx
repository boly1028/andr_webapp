import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { FlexBuilderForm } from "@/modules/flex-builder";

import { Box } from "@/theme/ui-elements";
import { FilePlusIcon, Layout, PageHeader } from "@/modules/common";
import { useRouter } from "next/router";
import { ITemplate } from "@/lib/schema/types";
import { getADOQueryTemplate } from "@/lib/schema/utils";
import { useEffect, useMemo, useState } from "react";
import { HStack, IconButton, Input, Tooltip, useToast } from "@chakra-ui/react";
import { cloneDeep } from "@apollo/client/utilities";
import { parseJsonFromFile } from "@/lib/json";
import { parseFlexFile } from "@/lib/schema/utils/flexFile";
import { FlexBuilderFormProps } from "@/modules/flex-builder/components/FlexBuilderForm";
import { useAndromedaClient } from "@/lib/andrjs";
import useConstructADOQueryMsg from "@/modules/sdk/hooks/useConstructaADOQueryMsg";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { useGetFlexFileFromSession, useGetFlexFileFromUrl } from "@/modules/flex-builder/hooks/useFlexFile";

type Props = {
  template: ITemplate
};

const TemplatePage: NextPage<Props> = ({ template }) => {
  const router = useRouter();
  const toast = useToast({
    position: "top-right",
  });
  const address = router.query.address as string;
  const client = useAndromedaClient();

  const { flex: urlFlex, loading: urlLoading } = useGetFlexFileFromUrl();
  const { flex: sessionFlex, loading: sessionLoading } = useGetFlexFileFromSession();
  const importedTemplate = useMemo(() => {
    if (urlFlex && urlFlex.id === template.id) return urlFlex;
    if (sessionFlex && sessionFlex.id === template.id) return sessionFlex;
    return template;
  }, [urlFlex, sessionFlex, template])

  const loading = useMemo(() => urlLoading || sessionLoading, [urlLoading, sessionLoading])
  const [modifiedTemplate, setModifiedTemplate] = useState(template);

  useEffect(() => {
    if (loading) return;
    const tid = setTimeout(async () => {
      const _template = await handleFlexUpdate(importedTemplate).catch(() => template)
      const newTemplate = cloneDeep(_template);
      const formData = newTemplate.formData ?? {};
      newTemplate.formData = formData;
      setModifiedTemplate(newTemplate);
    }, 500)
    return () => clearTimeout(tid);
  }, [importedTemplate]);

  const constructQueryMsg = useConstructADOQueryMsg()

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
    json.ados.forEach(ado => {
      ado.removable = true;
      ado.required = false;
    })
    const _template = await parseFlexFile(json);
    const formData = _template.formData ?? {};
    _template.formData = formData;
    _template.modules = template.modules
    return _template;
  }
  const getMsg = (formData: any) => {
    return constructQueryMsg(formData);
  }

  const handleSubmit: FlexBuilderFormProps['onSubmit'] = async ({ formData }) => {
    try {
      const msg = getMsg(formData);
      console.log(msg)
      const result = await client!.queryContract(address, msg);
      console.log(result)
    } catch (err) {
      console.error(err)
    }
  };

  const handleCliCopy: FlexBuilderFormProps['onCliCopy'] = (formData) => {
    // const funds = getFunds(formData);
    // const msg = getMsg(formData);
    // const query = EXECUTE_CLI_QUERY({
    //   funds,
    //   msg,
    //   address: proxy ? ADO_DATA.appAddress : ADO_DATA.address
    // })
    // console.log(query, "QUERY")
    // return query
    return ''
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
        title={modifiedTemplate.name || `Query message`}
        desc={modifiedTemplate.description || `Ado address ${address}. Check your console for query results.`}
        rightElement={InputElement}
      />
      <Box mt={10}>
        <FlexBuilderForm
          // ID is required to refresh the component after we modify the template. If not provided,
          // form will not populate name and address field on direct visit to the page
          key={UPDATE_KEY}
          template={modifiedTemplate}
          onSubmit={handleSubmit}
          notReady={!client?.isConnected}
          addButtonTitle="Add Attachment"
          onCliCopy={handleCliCopy}
          copyProps={{
            url: (uri) => SITE_LINKS.adoQuery(template.id, address, uri)
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
  const executeTemplate = await getADOQueryTemplate(path.join("/"));
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
