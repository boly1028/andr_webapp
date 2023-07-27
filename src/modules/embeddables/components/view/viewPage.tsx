import ViewHeader from "./viewHeader";
import ViewInfo from "./viewInfo";
import ViewTable from "./viewTable";
import { FC } from 'react';
import { Box } from "@chakra-ui/react";
import { useGetEmbeddableApp } from "../../hooks/useGetEmbeddableApp";
import { useRouter } from "next/router";
import { useGetEmbeddabeleConfig } from "../../hooks/useGetEmbeddableConfig";

const ViewPage: FC = (props) => {
    console.log('props:', props);
    const { embeddable } = useGetEmbeddableApp();

    const router = useRouter();
    const eKey = router.query.id ?? '';

    const { config: EmbeddableItem, loading } = useGetEmbeddabeleConfig(embeddable ? embeddable.address : '', `${eKey}`);

    return (
        <>
            <Box mt='30px'>
                <ViewHeader
                    name={EmbeddableItem?.name}
                    loading={loading}
                />
            </Box>
            <Box mt='50px'>
                <ViewInfo
                    data={EmbeddableItem}
                    loading={loading}
                />
            </Box>
            {embeddable &&
                <Box mt='64px' mb='100px'>
                    <ViewTable
                        // address={embeddable.address}
                        data={EmbeddableItem}
                        loading={loading}
                    />
                </Box>
            }
        </>
    )
}

export default ViewPage