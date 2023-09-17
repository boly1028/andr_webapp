import { Box, HStack, IconButton, Input, Skeleton, Stack, Tooltip, useToast } from "@chakra-ui/react";
import React, { FC, ReactNode, useEffect, useMemo, useState } from "react"
import { ITemplate } from "@/lib/schema/types";
import { FilePlusIcon, Layout, PageHeader } from "@/modules/common";
import { FlexBuilderForm } from "@/modules/flex-builder";
import { GetStaticProps } from "next";
import { processTemplate } from "@/lib/schema/utils/template";
import { ITemplateFormData } from "@/lib/schema/templates/types";
import { useGlobalModalContext } from "@/modules/modals/hooks";
import { ModalType, MultiTransactionModalProps } from "@/modules/modals/types";
import { useAndromedaClient } from "@/lib/andrjs";
import { constructMsg } from "@/modules/sdk/utils";
import { coin } from "@cosmjs/amino";
import { getCodeId } from "@/lib/andrjs/hooks/useCodeId";
import { cloneDeep } from "@apollo/client/utilities";
import { parseJsonFromFile } from "@/lib/json";
import { parseFlexFile } from "@/lib/schema/utils/flexFile";
import { useRouter } from "next/router";
import { useGetFlexFileFromUrl } from "@/modules/flex-builder/hooks/useFlexFile";
import { resolveVfs } from "@/lib/andrjs/hooks/vfs/useResolvePath";

interface Props {
    template: ITemplate;
}

const Page: FC<Props> = (props) => {
    const { template } = props;
    const { flex: urlFlex, loading: urlLoading } = useGetFlexFileFromUrl();
    const loading = useMemo(() => urlLoading, [urlLoading])
    const toast = useToast({
        position: "top-right",
    });
    const client = useAndromedaClient()
    const { open } = useGlobalModalContext()
    const [modifiedTemplate, setModifiedTemplate] = useState(template);

    useEffect(() => {
        const newTemplate = cloneDeep(urlFlex ?? template);
        const formData = newTemplate.formData ?? {};
        newTemplate.formData = formData;
        setModifiedTemplate(newTemplate);
    }, [template, urlFlex]);

    const handleFlexInput = async (file: File) => {
        try {
            const json = await parseJsonFromFile(file) as ITemplate;
            json.ados.forEach(ado => {
                ado.removable = true;
                ado.required = false;
            })
            const _template = await parseFlexFile(json);

            const formData = _template.formData ?? {};
            _template.formData = formData;
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

    const getFunds = (rawFunds: Array<{ amount: number, denom: string }>) => {
        return rawFunds.map(fund => coin(fund.amount, fund.denom))
    }

    const submit = async ({ formData }) => {
        if (!client) {
            toast({
                title: "Client not connected",
                'status': 'error'
            })
            return;
        }
        const msgs: MultiTransactionModalProps['msgs'] = [];
        for (const panel of Object.values(formData as ITemplateFormData)) {
            if (!panel.$enabled) continue;
            const panelMsg = constructMsg(JSON.parse(panel.msg));
            console.log(panelMsg, panel.$type)
            if (panel.$type as any === 'instantiate') {
                let codeId = panel.codeId;
                if (typeof codeId === 'string') {
                    codeId = await getCodeId(client!, codeId);
                }
                const msg = client?.chainClient?.encodeInstantiateMsg(codeId, panelMsg, panel.label ?? "Instantiate");
                if (msg)
                    msgs.push(msg);
            } else if (panel.$type as any === 'execute') {
                const address = await resolveVfs(client, panel.address)
                const msg = client?.chainClient?.encodeExecuteMsg(address, panelMsg, getFunds(panel.funds));
                if (msg)
                    msgs.push(msg);
            }
        }

        open(ModalType.MultiTransaction, {
            msgs: msgs
        })
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
            <PageHeader title={template.name} desc={template.description} rightElement={InputElement} />
            <Box mt={10}>
                {loading ? (
                    <Stack>
                        <Skeleton h="14" rounded="xl" />
                        <Skeleton h="24" rounded="xl" />
                    </Stack>
                ) : (
                    <FlexBuilderForm
                        key={UPDATE_KEY}
                        template={modifiedTemplate}
                        onSubmit={submit}
                        notReady={!client?.isConnected}
                        addButtonTitle="Add Multi Message"
                        copyProps={{
                            baseUrl: '/admin/wasm'
                        }}
                        hideOpenInAppBuilder
                    />
                )}
            </Box>
        </Layout>
    )
}

const TEMPLATE: ITemplate = {
    id: `admin-wasm`,
    adoType: "app-contract",
    name: "Custom Wasm",
    icon: "/app-templates/icons/blank.png",
    description:
        "Use this template to test your contracts with base wasm messages. You can use our schema helpers or choose raw json as input. No Restriction",
    opts: [
        "Wasm Messages",
        "Custom Message Support",
        "Multi Message"
    ],
    ados: [
        {
            path: '$admin/latest/instantiate',
            id: 'instantiate',
            required: false,
            removable: true,
            enabled: false
        },
        {
            path: '$admin/latest/execute',
            id: 'execute',
            required: false,
            removable: true,
            enabled: false
        },
    ],

    modules: [
        {
            path: '$admin/latest/instantiate',
        },
        {
            path: '$admin/latest/execute',
        },
        // {
        //     path: '$admin/latest/query',
        // },
    ],
    system: true,
    starter: true,
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
    const data = await processTemplate(TEMPLATE);
    if (!data) {
        return {
            notFound: true,
        };
    }
    return {
        props: { template: data },
        revalidate: false,
    };
};

export default Page