import { parseJsonFromFile } from "@/lib/json";
import { Button, Icon, IconButton, Input, Tooltip } from "@chakra-ui/react";
import { Upload } from "lucide-react";
import React, { FC } from "react";
import { useAppBuilder } from "../../canvas/Provider";

interface LoadButtonProps {
    name: string;
}

const LoadButton: FC<LoadButtonProps> = (props) => {
    const { name } = props;
    const { formRefs } = useAppBuilder()

    const importJson = async (file: File) => {
        const parsed = await parseJsonFromFile(file);
        formRefs?.current?.[name]?.updateFormData(parsed)
    };

    return (
        <Tooltip label='Load' bg='base.white' placement='top'>
            <Button
                as="label"
                aria-label="load json"
                variant='ghost'
                htmlFor={`${name}-json-input`}
                cursor='pointer'
                px='1.5'
            >
                <Icon as={Upload} boxSize='4' />
                <Input
                    onChange={(e) => {
                        const file = e.target.files?.item(0);
                        if (file) {
                            importJson(file);
                        }
                    }}
                    multiple={false}
                    type="file"
                    id={`${name}-json-input`}
                    // Only Allow json file
                    accept=".json"
                    srOnly
                />
            </Button>
        </Tooltip>
    );
};

export default LoadButton;