import { SYSTEM_DOCUMENTATION_LINKS } from "@/lib/schema/documentation";
import { useGetSchemaJson } from "@/lib/schema/hooks";
import { ITemplate } from "@/lib/schema/types";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import ClassifierIcon from "@/theme/icons/classifiers";
import { Box, BoxProps, GridItem, SimpleGrid, Text, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC, ReactNode } from "react"

interface Props extends BoxProps {
    template: ITemplate;
}

const RelatedResources: FC<Props> = (props) => {
    const { template, ...boxProps } = props;
    return (
        <Box {...boxProps}>
            <Text textStyle="main-xl-semibold">
                Related Resources
            </Text>
            <Text textStyle="main-sm-regular" color="content.medium" mt='4'>
                Use the following resources to help guide you through the process of implementing a &quot;{template.name}&quot; for yourself.
            </Text>

            <SimpleGrid columns={2} spacing={6} mt='6'>
                {Array.from(new Set([...template.ados, ...template.modules ?? []].map(a => a.path))).map(path => (
                    <AdoCard key={path} path={path} />
                ))}
            </SimpleGrid>
        </Box>
    )
}


interface AdoCardProps {
    path: string;
}

const AdoCard: FC<AdoCardProps> = (props) => {
    const { path } = props;
    const { data: ado } = useGetSchemaJson(path);
    if (!ado) return null;
    return (
        <GridItem
            as={Link}
            href={SYSTEM_DOCUMENTATION_LINKS[ado.schema.$id] ?? SITE_LINKS.documentation(
                ado.schema.$id,
            )}
            target="_blank"
            p='6' w='full'
            transition="all"
            transitionDuration="150ms"
            transform="auto"
            _hover={{ scale: "102%" }}
            cursor='pointer'
            rounded='xl'
            border='1px'
            borderColor="border.main"
            overflow="hidden"
        >
            <Box
                p='10'
                bg='background.800'
            >
                <ClassifierIcon adoType={ado?.schema.$id} w='full' h='full' type="outline" />
            </Box>
            <Text textStyle="main-lg-semibold" mt='4'>
                {ado.schema.title}
            </Text>
            <Tooltip label={ado.schema.description} openDelay={500}>
                <Text textStyle="main-xs-regular" color="content.medium" wordBreak="keep-all" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                    {ado.schema.description}
                </Text>
            </Tooltip>
        </GridItem>
    )
}
export default RelatedResources;