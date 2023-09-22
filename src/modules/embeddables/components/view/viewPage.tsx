import ViewHeader from "./viewHeader";
import ViewInfo from "./viewInfo";
import ViewTable from "./viewTable";
import { FC } from 'react';
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useGetEmbeddabeleConfig } from "../../hooks/useGetEmbeddableConfig";

const ViewPage: FC = (props) => {
    const router = useRouter();
    const eKey = router.query.id as string;

    const { config, loading } = useGetEmbeddabeleConfig(eKey);

    return (
        <>
            <Box mt='30px'>
                <ViewHeader
                    loading={loading}
                    data={config}
                />
            </Box>

            <Box mt='50px'>
                <ViewInfo
                    data={config}
                    loading={loading}
                />
            </Box>

            {config &&
                <Box mt='64px' mb='100px'>
                    <ViewTable
                        // address={embeddable.address}
                        data={config}
                        loading={loading}
                    />
                </Box>
            }
        </>
    )
}

export default ViewPage