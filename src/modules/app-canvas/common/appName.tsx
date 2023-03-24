import { AppBuilder } from '@/modules/common'
import { TmpButton } from '@/theme/new-system-tmp/ui-elements'
import { Icon, Input } from '@chakra-ui/react'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { AppBuilderContext, useAppBuilder } from '../canvas/Provider'
import { IEditorRef } from '../types'

interface AppNameButtonProps {

}
const AppNameButton: FC<AppNameButtonProps> = (props) => {
    const { } = props
    const { editorRef } = useAppBuilder()
    const [appName, setAppName] = useState('Untitled App')
    useEffect(() => {

    }, [appName])

    const updateName: IEditorRef['setAppName'] = useCallback((name) => {
        setAppName(name)
    }, [setAppName])

    useEffect(() => {
        editorRef.current.setAppName = updateName
        editorRef.current.getAppName = () => appName
    }, [editorRef, updateName, appName])

    return (
        <TmpButton
            leftIcon={<Icon as={AppBuilder} boxSize='5' />}
        >
            <Input
                value={appName}
                onChange={(e) => updateName(e.target.value)}
                variant='unstyled'
                w='20'
                fontSize='sm'
            />
        </TmpButton>
    )
}
export default AppNameButton