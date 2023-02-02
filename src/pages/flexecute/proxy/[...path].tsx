import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { FlexBuilderForm, StagingDocumentsModal } from "@/modules/flex-builder";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from "@/theme/ui-elements";
import {
  DownloadIcon,
  FileCheckIcon,
  Layout,
  PageHeader,
} from "@/modules/common";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { cloneDeep } from "lodash";
import { IImportantAdoKeys, ITemplate } from "@/lib/schema/types";
import { getProxyTemplate } from "@/lib/schema/utils";
import { useExecuteModal } from "@/modules/modals/hooks";
import useConstructProxyMsg from "@/modules/sdk/hooks/useConstructProxyMsg";
import { useGetFunds } from "@/modules/sdk/hooks";
import { useWallet } from "@/lib/wallet";
import { parseJsonFromFile } from "@/lib/json";
import { parseFlexFile } from "@/lib/schema/utils/flexFile";
import { useToast } from "@chakra-ui/react";

type Props = {
  template: ITemplate;
};

const TemplatePage: NextPage<Props> = ({ template }) => {
  const router = useRouter();
  const name = router.query.name as string;
  const contract = router.query.contract as string;
  const construct = useConstructProxyMsg();
  const getFunds = useGetFunds();
  const openModal = useExecuteModal(contract);
  const account = useWallet();
  const toast = useToast({
    position: "top-right",
  });
  const [modifiedTemplate, setModifiedTemplate] = useState(template);

  useEffect(() => {
    const newTemplate = cloneDeep(template);
    newTemplate.name = name;
    const formData = newTemplate.formData ?? {};
    formData[IImportantAdoKeys.PROXY_MESSAGE] = {
      ...(formData[IImportantAdoKeys.PROXY_MESSAGE] ?? {}),
      parent: contract,
      component_name: name,
    };
    newTemplate.formData = formData;
    setModifiedTemplate(newTemplate);
  }, [name, contract]);

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

  const handleSubmit = async (
    {
      formData,
    }: {
      formData: any;
    }
  ) => {
    const msg = construct(formData);
    // console.log(msg)
    const funds = getFunds(formData);
    openModal(msg, funds);
  };

  //TODO: Setup staging availability flags for loading staging sections if passed
  const staging_available = false;

  const InputElement = useMemo(
    () => (
      <HStack>
        <Box>
          <IconButton
            as="label"
            htmlFor="flexecute-file-input"
            variant="outline"
            aria-label="flex-input"
            cursor="pointer"
            icon={<DownloadIcon boxSize={5} color="gray.500" />}
          />
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

      <Box mt={10}>
        {/* Staging section to be shown when declared */}
        {/* ToDO: Modularize as component? */}
        {staging_available && (
          <Flex
            align="center"
            border="1px solid"
            borderColor="primary.300"
            borderRadius="lg"
            bg="primary.25"
            mb={4}
            p={3}
          >
            <Box mr={4}>
              <Flex
                justify="center"
                align="center"
                bg="primary.100"
                color="primary.700"
                borderRadius="full"
                p={3}
              >
                <FileCheckIcon boxSize={6} />
              </Flex>
            </Box>

            <Box flex={1}>
              <Text color="primary.700" fontWeight={500}>
                Staging Available
              </Text>
              <Text color="primary.600" fontSize="sm">
                Need to perform this operation multiple times? Staging documents
                are available.
              </Text>
            </Box>

            <StagingDocumentsModal />
          </Flex>
        )}
        {/* end of toggleable staging section */}
        <FlexBuilderForm
          // ID is required to refresh the component after we modify the template. If not provided,
          // form will not populate name and address field on direct visit to the page
          key={UPDATE_KEY}
          template={modifiedTemplate}
          onSubmit={handleSubmit}
          notReady={!account}
          addButtonTitle="Add Attachment"
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
  const data = await getProxyTemplate(path.join("/"));
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { template: JSON.parse(JSON.stringify(data)) },
    revalidate: 300,
  };
};

export default TemplatePage;
