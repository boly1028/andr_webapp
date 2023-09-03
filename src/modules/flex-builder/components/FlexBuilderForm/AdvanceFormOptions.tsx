import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button, Collapse, HStack, Icon, Switch, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import React, { Dispatch, FC, ReactNode, SetStateAction } from "react"

interface Props {
    validate: boolean;
    setValidate: Dispatch<SetStateAction<boolean>>;
}

const AdvanceFormOptions: FC<Props> = (props) => {
    const { validate, setValidate } = props;
    const { isOpen, onToggle } = useDisclosure()
    return (
        <Box>
            <Button variant="theme-ghost" size='xs' rightIcon={<Icon as={ChevronDown} transform='auto' rotate={isOpen ? 180 : 0} />} onClick={onToggle}>Advance Options</Button>
            <Collapse in={isOpen} animateOpacity>
                <Box
                    mt='2'
                    ml='1'
                    p='4'
                    border='1px'
                    borderColor='border.main'
                    rounded='xl '
                    maxW='fit-content'
                >
                    <VStack spacing={1} alignItems='stretch'>
                        <HStack spacing='6'>
                            <Text textStyle='main-md-medium' flex='1'>Validate</Text>
                            <Switch
                                isChecked={validate}
                                onChange={() => {
                                    setValidate(prev => !prev)
                                }}
                                size='md'
                            />
                        </HStack>
                        <Text textStyle='main-xs-regular' color='content.low' maxW='60'>Disable it if you do not want to validate form before publishing</Text>
                    </VStack>
                </Box>
            </Collapse>
        </Box>
    )
}

export default AdvanceFormOptions