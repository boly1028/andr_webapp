import React from "react";
import { getTemplate, WidgetProps } from "@andromedarjsf/utils";
import { VStack } from "@chakra-ui/react";
import VfsResolver from "./VfsResolver";

const AndrAddrWidget = (props: WidgetProps) => {
    const { value, registry } = props;
    const allPanels = Object.keys(registry.rootSchema.properties ?? {}).map(p => `./${p}`);
    const BaseInputTemplate = getTemplate<'BaseInputTemplate'>('BaseInputTemplate', props.registry, props.options);

    return (
        <>
            <VStack alignItems="start">
                <BaseInputTemplate
                    {...props}
                    schema={{
                        ...props.schema,
                        examples: allPanels
                    }}
                    mr='0'
                />
                <VfsResolver formData={value} />
            </VStack>
        </>
    );
};

export default AndrAddrWidget;
