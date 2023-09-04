import { IAdoType } from "@/lib/schema/types";
import ClassifierIcon from "@/theme/icons/classifiers";
import { HStack, Text } from "@chakra-ui/react";
import React, { FC } from "react"

interface Props {
    adoType: IAdoType
}

const AssetInfoModalTitle: FC<Props> = (props) => {
    const { adoType } = props;
    return (
        <HStack spacing={3}>
            <ClassifierIcon adoType={adoType} boxSize={5} />
            <Text>Ado Info</Text>
        </HStack>
    )
}

export default AssetInfoModalTitle