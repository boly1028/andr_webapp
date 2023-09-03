import { AppBuilder } from '@/modules/common'
import { Button, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { AppBuilderContext, useAppBuilder } from '../canvas/Provider'
import { AppConfig } from '../config'
import { IEditorRef } from '../types'

interface AppNameButtonProps {

}
const AppNameButton: FC<AppNameButtonProps> = (props) => {
    const { } = props
    const { editorRef } = useAppBuilder()
    const [appName, setAppName] = useState(AppConfig.DEFAULT_APP_NAME)

    const updateName: IEditorRef['setAppName'] = useCallback((name) => {
        setAppName(name)
    }, [setAppName])

    useEffect(() => {
        editorRef.current.setAppName = updateName
        editorRef.current.getAppName = () => appName
    }, [editorRef, updateName, appName])

    return (
        <InputGroup w='36' size='sm' variant="filled" rounded='lg' bg="primaryLow.idle">
            <InputLeftElement pointerEvents='none'>
                <Icon as={AppBuilder} boxSize='4' />
            </InputLeftElement>
            <Input
                value={appName}
                onChange={(e) => updateName(e.target.value)}
                placeholder={AppConfig.DEFAULT_APP_NAME}
            />
        </InputGroup>
    )
}
export default AppNameButton