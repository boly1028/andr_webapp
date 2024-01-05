// import { CopyButton } from '@/modules/common';
// import { SITE_LINKS } from '@/modules/common/utils/sitelinks';
import { Box, Text, Heading, Flex, Skeleton, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { IEmbeddableConfig } from '@/lib/schema/types/embeddables';
import Table from './table';
interface ViewTableProps {
  data: IEmbeddableConfig | undefined;
  loading: boolean;
}
const ViewTable: FC<ViewTableProps> = (props) => {
  const { data: configData, loading } = props;

  return (
    <Box>
      <Heading fontSize={'20px'} fontWeight='600' pb='8px'>Linked ADOs</Heading>
      {/* <Text fontSize={'14px'} fontWeight='100' color='rgba(255, 255, 255, 0.6)'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus</Text> */}

      <Flex
        borderColor="border.main"
        borderRadius="lg"
        mb={4}
        _last={{ mb: 0 }}
        direction="column"
        mt='24px'
      >
        {loading &&
          <Stack>
            <Skeleton h="10" rounded="lg" />
            <Skeleton h="10" rounded="lg" />
          </Stack>
        }
        {configData?.collections.map((item, index) => {
          return (
            <Table
              key={index}
              item={item}
              eKey={configData.key}
              config={configData}
            />
          )
        })}
      </Flex>
    </Box>
  )
}

export default ViewTable
