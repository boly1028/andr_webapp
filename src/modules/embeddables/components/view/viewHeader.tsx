import { FC, useMemo } from 'react';
import { EmbViewPageIcon } from '@/modules/common';
import { Flex, Icon, IconButton, HStack, Text, Button, Skeleton, Stack, SkeletonText, Link } from '@chakra-ui/react';
import { MoreHorizontal } from 'lucide-react';
import { IEmbeddableConfig } from '@/lib/schema/types/embeddables';
import { createEmbeddableUrl } from '@/lib/schema/utils/embeddables';
import { SITE_LINKS } from '@/modules/common/utils/sitelinks';
interface ViewHeaderProps {
    loading: boolean;
    data: IEmbeddableConfig | undefined;
}
const ViewHeader: FC<ViewHeaderProps> = (props) => {
    const { data, loading } = props;

    const uri = useMemo(() => data ? createEmbeddableUrl(data) : '', [data]);

    return (
        <Flex justifyContent={'space-between'}>
            <HStack gap='16px'>
                <Icon as={EmbViewPageIcon} w='40px' h='40px' />
                {loading &&
                    <SkeletonText skeletonHeight="20px" noOfLines={1} color='gray' />
                }
                {data?.name &&
                    <Text fontSize={'24px'} fontWeight='600'>{data.name}</Text>
                }
            </HStack>
            <HStack gap='8px'>
                <Link href={SITE_LINKS.embeddablePreview(uri)} isExternal>
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
                </Link>
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