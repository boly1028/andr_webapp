import { IAdoType } from "@/lib/schema/types";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { Alert, AlertDescription, AlertIcon, AlertTitle, MenuDivider, MenuItem, MenuList, Skeleton } from "@chakra-ui/react";
import React, { FC } from "react"
import NextLink from 'next/link'
import { useGetSchemaVersions } from "@/lib/schema/hooks/useGetSchemaVersion";
import { useGetSchemaADOP } from "@/lib/schema/hooks/useGetSchemaADOP";

interface Props {
    ado: IAdoType;
    version?: string;
    address: string;
    name?: string;
    proxyAddress?: string;
}

const ModifierDropdown: FC<Props> = (props) => {
    const { ado, version, address, name, proxyAddress } = props;
    const { data: _version } = useGetSchemaVersions(ado);
    const { data: adopData, isLoading } = useGetSchemaADOP(ado, version || _version?.latest);
    return (
        <MenuList maxH="max(50vh,20rem)" overflow="auto">
            {adopData?.modifiers && (
                <>
                    <MenuItem as={NextLink}
                        href={SITE_LINKS.adoMultiExecute(`${ado}/${version}`, address ?? "", name, proxyAddress)}
                        textStyle="main-sm-regular"
                    >
                        Multi Execute
                    </MenuItem>
                    <MenuDivider />
                </>
            )}
            {adopData?.modifiers?.map((action) => {
                const path = `${ado}/${version}/${action}`;
                return (
                    <MenuItem
                        as={NextLink}
                        href={SITE_LINKS.adoExecute(path, address ?? "", name, proxyAddress)}
                        key={action}
                        textStyle="main-sm-regular"
                    >
                        {action.split('-').map(sub => sub[0]?.toUpperCase() + sub.substring(1)).join(' ')}
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
    )
}

export default ModifierDropdown