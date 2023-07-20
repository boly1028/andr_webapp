import { FC } from 'react';
import { EmbViewPageIcon } from '@/modules/common';
import { Flex, Icon, IconButton, HStack, Text, Button } from '@chakra-ui/react';
import { MoreHorizontal } from 'lucide-react';

const ViewHeader: FC = () => {
    return (
        <Flex justifyContent={'space-between'}>
            <HStack gap='16px'>
                <Icon as={EmbViewPageIcon} w='40px' h='40px' />
                <Text fontSize={'24px'} fontWeight='600'>My NFT Embeddable</Text>
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