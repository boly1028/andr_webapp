import React, { FC } from 'react'
import InsertComponent from '../leftSidebar/InsertComponent'
import { IUIComponents } from '../types'

interface RenderUiComponentProps {
    component: IUIComponents;
}
const RenderUiComponent: FC<RenderUiComponentProps> = (props) => {
    const { component } = props

    if (component === IUIComponents.INSERT) {
        return (
            <InsertComponent />
        )
    }

    if(component === IUIComponents.ADO_LIST){

    }

    return null
}
export default RenderUiComponent