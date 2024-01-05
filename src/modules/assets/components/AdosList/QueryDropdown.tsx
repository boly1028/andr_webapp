import { IAdoType } from "@/lib/schema/types";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, MenuDivider, MenuItem, MenuList, Skeleton, Text, VStack } from "@chakra-ui/react";
import React, { FC } from "react";
import NextLink from "next/link";
import { useGetSchemaVersions } from "@/lib/schema/hooks/useGetSchemaVersion";
import { useGetSchemaADOP } from "@/lib/schema/hooks/useGetSchemaADOP";
import { FallbackPlaceholder } from "@/modules/common";

interface Props {
    ado: IAdoType;
    version?: string;
    address: string;
}

const QueryDropdown: FC<Props> = (props) => {
    const { ado, version, address } = props;
    const { data: _version } = useGetSchemaVersions(ado);
    const { data: adopData, isLoading } = useGetSchemaADOP(
        ado,
        version || _version?.latest,
    );
    return (
        <MenuList maxH="max(50vh,20rem)" overflow="auto">
            {adopData?.queries?.map((action) => {
                const path = `${ado}/${version}/${action}`;
                return (
                    <MenuItem
                        as={NextLink}
                        href={SITE_LINKS.adoQuery(path, address ?? "")}
                        key={action}
                        textStyle="main-sm-regular"
                    >
                        {action
                            .replace(".query", "")
                            .split("-")
                            .map((sub) => sub[0]?.toUpperCase() + sub.substring(1))
                            .join(" ")}
                    </MenuItem>
                );
            })}
            {isLoading && <MenuItem><Skeleton h='5' w='full' /></MenuItem>}
            {!isLoading && !adopData && (
                <Alert
                    status='error'
                    variant='subtle'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                >
                    <AlertIcon boxSize='30px' mr={0} />
                    <AlertTitle mt='4' mb='1' textStyle='main-sm-bold'>SCHEMA NOT FOUND!</AlertTitle>
                    <AlertDescription maxW='sm' textStyle='main-xs-regular'>
                        Looks like support for this ADO is deprecated or not yet added.
                        Please contact Andromeda team for more support.
                    </AlertDescription>
                </Alert>
            )}
        </MenuList>
    );
};

export default QueryDropdown;
