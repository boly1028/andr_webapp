import { IAdoType } from "@/lib/schema/types";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";
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
    const { data: adopData } = useGetSchemaADOP(ado, version || _version?.latest);
    return (
        <MenuList maxH="max(50vh,20rem)" overflow="auto">
            <MenuItem as={NextLink}
                href={SITE_LINKS.adoMultiExecute(`${ado}/${version}`, address ?? "", name, proxyAddress)}
                textStyle="main-sm-regular"
            >
                Multi Execute
            </MenuItem>
            <MenuDivider />
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
        </MenuList>
    )
}

export default ModifierDropdown