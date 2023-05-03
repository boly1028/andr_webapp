import React, { FC } from 'react'
import AdoList from '../leftSidebar/AdoList'
import InsertComponent from '../leftSidebar/InsertComponent'
import TemplateList from '../leftSidebar/TemplateList'
import { IUIComponentProps, IUIComponents } from '../types'


const RenderUiComponent: FC<IUIComponentProps> = (props) => {
    if (props.type === IUIComponents.INSERT) {
        return <InsertComponent {...props} />
    }
    if (props.type === IUIComponents.ADO_LIST) {
        return <AdoList {...props} />
    }
    if (props.type === IUIComponents.TEMPLATE_LIST) {
        return <TemplateList {...props} />
    }
    return null
}
export default RenderUiComponent