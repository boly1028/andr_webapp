import { Box, Skeleton, Stack } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import { INSTANTIATE_CLI_QUERY, useCodeId } from "@/lib/andrjs";
import { Layout, PageHeader } from "@/modules/common";
import { FlexBuilderForm } from "@/modules/flex-builder";
import { useInstantiateModal } from "@/modules/modals/hooks";
import { useConstructAppMsg } from "@/modules/sdk/hooks";
import { ITemplate } from "@/lib/schema/types";
import { useWallet } from "@/lib/wallet";
import { ILinkItemKey } from "@/modules/common/components/Sidebar";
import { FlexBuilderFormProps } from "@/modules/flex-builder/components/FlexBuilderForm";
import { useCallback, useMemo, useState } from "react";
import { useGetFlexFileFromSession, useGetFlexFileFromUrl } from "@/modules/flex-builder/hooks/useFlexFile";
import { processTemplate } from "@/lib/schema/utils/template";
import { UPLOAD_TEMPLATE } from "@/lib/schema/templates/upload";

type Props = {
    defaultTemplate: ITemplate;
};

const TemplatePage: NextPage<Props> = ({ defaultTemplate }) => {
    const account = useWallet();

    const { flex: urlFlex, loading: urlLoading } = useGetFlexFileFromUrl();
    const { flex: sessionFlex, loading: sessionLoading } = useGetFlexFileFromSession();
    const template = useMemo(() => urlFlex ?? sessionFlex ?? defaultTemplate, [urlFlex, sessionFlex, defaultTemplate])
    const loading = useMemo(() => urlLoading || sessionLoading, [urlLoading, sessionLoading])

    const codeId = useCodeId(template.adoType, template.adoVersion);


    const construct = useConstructAppMsg();
    const openModal = useInstantiateModal(codeId);

    const getMsg = (formData: any) => {
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


    return (
        <Layout activeLink={ILinkItemKey.ADO_BUILDER}>
            <PageHeader title={template.name} desc={template.description} />
            <Box mt={10}>
                {loading ? (
                    <Stack>
                        <Skeleton h="14" rounded="xl" />
                        <Skeleton h="24" rounded="xl" />
                    </Stack>
                ) : (
                    <FlexBuilderForm
                        template={template}
                        onSubmit={handleSubmit}
                        notReady={!codeId || codeId === -1 || !account}
                        addButtonTitle="Add App Component"
                        onCliCopy={handleCliCopy}
                    />
                )}
            </Box>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
    const data = await processTemplate(UPLOAD_TEMPLATE);
    if (!data) {
        return {
            notFound: true,
        };
    }
    return {
        props: { defaultTemplate: data },
        revalidate: false,
    };
};

export default TemplatePage;
