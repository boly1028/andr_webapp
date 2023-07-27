import { FC } from 'react';
import { EmbViewPageIcon } from '@/modules/common';
import { Flex, Icon, IconButton, HStack, Text, Button, Skeleton, Stack, SkeletonText } from '@chakra-ui/react';
import { MoreHorizontal } from 'lucide-react';
interface ViewHeaderProps {
    name: string | undefined;
    loading: boolean;
}
const ViewHeader: FC<ViewHeaderProps> = (props) => {
    const { name, loading } = props;
    return (
        <Flex justifyContent={'space-between'}>
            <HStack gap='16px'>
                <Icon as={EmbViewPageIcon} w='40px' h='40px' />
                {loading &&
                    <SkeletonText skeletonHeight="20px" noOfLines={1} color='gray'/>
                }
                {name &&
                    <Text fontSize={'24px'} fontWeight='600'>{name}</Text>
                }
            </HStack>
            <HStack gap='8px'>
                <Button
                    colorScheme={'primary'}
                    py='8px'
                    px='16px'
                    fontSize={'16px'}
                    fontWeight='600'
                    size='sm'
                    rounded={'8px'}
                >
                    Preview
                </Button>
                <IconButton
                    icon={<MoreHorizontal />}
                    aria-label='Options'
                    bgColor={'rgba(255, 255, 255, 0.05)'}
                />
            </HStack>
        </Flex>
    )
}

export default ViewHeader