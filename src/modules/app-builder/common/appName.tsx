import { AppBuilder } from '@/modules/common'
import { Button, Icon, Input } from '@chakra-ui/react'
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
        <Button
            leftIcon={<Icon as={AppBuilder} boxSize='4' />}
        >
            <Input
                value={appName}
                onChange={(e) => updateName(e.target.value)}
                variant='unstyled'
                w='20'
                fontSize='sm'
                placeholder={AppConfig.DEFAULT_APP_NAME}
            />
        </Button>
    )
}
export default AppNameButton