import { Button, ButtonProps, ComponentWithAs } from "@chakra-ui/react";
import React, { FC } from "react";


const Component: typeof Button = (props) => {
    const { children } = props;

    return (
        <Button
            bg='newSystem.backgroundState.idle'
            _hover={{ bg: 'newSystem.backgroundState.hover' }}
            _active={{ bg: 'newSystem.backgroundState.active' }}
            fontSize='md'
            {...props}
        />
    );
};

export default Component;