import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { FlexBuilderForm } from "@/modules/flex-builder";

import { Box } from "@/theme/ui-elements";
import { CopyButton, FallbackPlaceholder, FilePlusIcon, Layout, PageHeader } from "@/modules/common";
import { useRouter } from "next/router";
import { IAndromedaSchemaJSON, ITemplate } from "@/lib/schema/types";
import { useEffect, useMemo, useState } from "react";
import { Button, Center, HStack, Icon, IconButton, Input, Menu, MenuButton, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip, VStack, useToast } from "@chakra-ui/react";
import { cloneDeep } from "@apollo/client/utilities";
import { parseJsonFromFile } from "@/lib/json";
import { parseFlexFile } from "@/lib/schema/utils/flexFile";
import { FlexBuilderFormProps } from "@/modules/flex-builder/components/FlexBuilderForm";
import { useAndromedaClient } from "@/lib/andrjs";
import useConstructADOQueryMsg from "@/modules/sdk/hooks/useConstructaADOQueryMsg";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { useGetFlexFileFromSession, useGetFlexFileFromUrl } from "@/modules/flex-builder/hooks/useFlexFile";
import Form from "@/modules/flex-builder/components/FlexBuilderForm/Form";
import hljs from "highlight.js";
import QueryDropdown from "@/modules/assets/components/AdosList/QueryDropdown";
import { ListIcon } from "lucide-react";
import { getADOQueryTemplate } from "@/lib/schema/utils/template";
import { getSchemaFromPath } from "@/lib/schema/utils";

type Props = {
  template: ITemplate;
  responseSchema?: IAndromedaSchemaJSON;
};

const TemplatePage: NextPage<Props> = ({ template, responseSchema }) => {
  const router = useRouter();
  const toast = useToast({
    position: "top-right",
  });
  const address = router.query.address as string;
  const client = useAndromedaClient();

  const [response, setResponse] = useState<{
    result: any;
    generatedAt: Date;
  }>();

  useEffect(() => {
    setResponse(undefined);
  }, [template])

  const responseJsonHighlight = useMemo(() => {
    if (response) {
      return hljs.highlight(JSON.stringify(response.result, undefined, 2), { language: 'json' }).value;
    }
  }, [response])
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
      const result = await client!.queryContract(address, msg);
      console.log(result);
      setResponse({
        result,
        generatedAt: new Date()
      });
    } catch (err: any) {
      console.error(err);
      toast({
        status: 'error',
        title: "Error",
        description: err?.message
      })
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
        <Menu placement="bottom-end">
          <MenuButton
            as={Button}
            variant="theme-low"
            size='sm'
            leftIcon={<Icon as={ListIcon} />}
          >
            More Queries
          </MenuButton>
          <QueryDropdown
            address={address}
            ado={template.adoType}
            version={template.adoVersion}
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
        title={modifiedTemplate.name || `Query message`}
        desc={modifiedTemplate.description || `Ado address ${address}`}
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
          submitButtonLabel="Query"
        />
      </Box>
      <Box mt='10'>
        <Tabs variant='soft-rounded' size='sm' colorScheme='primary' isLazy>
          <HStack gap={3}>
            <Text textStyle="main-xl-medium">Query Response</Text>
            <Text textStyle='main-xs-regular' textColor='content.low' flex={1} mt='1'>
              {response && (<>
                Last executed on <b>{response.generatedAt.toLocaleString()}</b>
              </>)}
            </Text>
            {response && (
              <CopyButton text={JSON.stringify(response)} variant='theme-low' size='xs'>
                Copy Response
              </CopyButton>
            )}
            <TabList>
              <Tab>Raw</Tab>
              <Tab isDisabled>Response</Tab>
            </TabList>
          </HStack>
          {response ? (
            <TabPanels>
              <TabPanel px={0}>
                <Box textStyle='code-xs-regular' bg='background.800' p='6' rounded='lg' overflow='auto'>
                  <Box as='pre'>
                    <code dangerouslySetInnerHTML={{ __html: responseJsonHighlight ?? '' }}></code>
                  </Box>
                </Box>
              </TabPanel>
              {responseSchema && (
                <TabPanel px='0'>
                  <Form
                    readonly
                    schema={responseSchema.schema}
                    uiSchema={responseSchema['ui-schema']}
                    formData={response}
                  >
                    <>
                    </>
                  </Form>
                </TabPanel>
              )}
            </TabPanels>
          ) : (
            <Center mt='10' bg='background.800' p='6' pt='8' rounded='lg'>
              <FallbackPlaceholder
                title="No Response"
                desc="There is no response to display here"
              />
            </Center>
          )}
        </Tabs>
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
  const queryTemplate = await getADOQueryTemplate(path.join("/"));
  if (!queryTemplate) {
    return {
      notFound: true,
    };
  }
  const responseSchema = await getSchemaFromPath(queryTemplate.id.replace('.query', '.response')).catch(err => null);
  return {
    props: {
      template: JSON.parse(JSON.stringify(queryTemplate)),
      responseSchema: responseSchema && JSON.parse(JSON.stringify(responseSchema))
    },
    revalidate: 3600,
  };
};

export default TemplatePage;
