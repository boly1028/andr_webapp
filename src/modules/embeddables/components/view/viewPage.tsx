import ViewHeader from "./viewHeader";
import ViewInfo from "./viewInfo";
import ViewTable from "./viewTable";
import { FC } from 'react';
import { Box } from "@chakra-ui/react";

const ViewPage: FC = (props) => {
    console.log('props:', props);

    return (
        <>
            <Box mt='30px'>
                <ViewHeader />
            </Box>
            <Box mt='50px'>
                <ViewInfo />
            </Box>
            <Box mt='64px' mb='100px'>
                <ViewTable />
            </Box>
        </>
    )
}

export default ViewPage