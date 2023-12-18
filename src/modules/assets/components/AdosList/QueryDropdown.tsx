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
}

const QueryDropdown: FC<Props> = (props) => {
    const { ado, version, address } = props;
    const { data: _version } = useGetSchemaVersions(ado);
    const { data: adopData } = useGetSchemaADOP(ado, version || _version?.latest);
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
                        {action.replace('.query', '').split('-').map(sub => sub[0]?.toUpperCase() + sub.substring(1)).join(' ')}
                    </MenuItem>
                );
            })}
        </MenuList>
    )
}

export default QueryDropdown