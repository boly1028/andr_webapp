import { useCodeId } from '@/lib/andrjs'
import { ITemplateFormData } from '@/lib/schema/templates/types'
import { useInstantiateModal } from '@/modules/modals/hooks'
import { useConstructAppMsg } from '@/modules/sdk/hooks'
import { Button, ButtonProps, Icon, useToast } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import React, { FC, useCallback, useEffect } from 'react'
import { useAppBuilder } from '../canvas/Provider'

interface PublishButtonProps extends ButtonProps {

}
const PublishButton: FC<PublishButtonProps> = (props) => {
    const { } = props
    const { formRefs, editorRef } = useAppBuilder()
    const toast = useToast()
    const codeId = useCodeId("app");
    const construct = useConstructAppMsg();
    const openModal = useInstantiateModal(codeId);

    const handlePublish = useCallback(() => {
        if (codeId === -1) {
            console.warn("Code ID not fetched");
            return;
        }
        try {
            const publishData: ITemplateFormData = {}
            const ados = formRefs.current ?? {};
            Object.keys(ados).forEach(adoKey => {
                console.log(adoKey);
                const adoFormData = ados[adoKey].validate();
                publishData[adoKey] = adoFormData;
            })
            const msg = construct(publishData, "Test Name for app from builder");
            openModal(msg);
        } catch (err) {
            toast({
                title: `Error while validating`,
                status: 'error'
            })
        }
    }, [codeId, toast, construct, openModal, formRefs])

    useEffect(() => {
        editorRef.current.publish = handlePublish
    }, [editorRef, handlePublish])



    return (
        <Button colorScheme='primary' {...props} onClick={handlePublish}>
            Publish
        </Button>
    )
}
export default PublishButton