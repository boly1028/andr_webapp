import { useGetClassColor } from "@/theme/icons/classifiers";
import React, { HTMLAttributes, RefAttributes } from "react";
import { Handle as ReactFlowHandle, HandleProps } from 'reactflow'

type IHandleProps = HandleProps & Omit<HTMLAttributes<HTMLDivElement>, "id"> & RefAttributes<HTMLDivElement> & {
    adoType: string;
}
const Handle = (props: IHandleProps, ref: any) => {
    const { adoType, style, ...handleProps } = props;
    const adoColor = useGetClassColor({ adoType: adoType as any }) as any

    return (
        <ReactFlowHandle ref={ref} {...handleProps} style={{ backgroundColor: adoColor, border: '0px', aspectRatio: '1/1', height: 'auto', width: '0.6rem', ...style }} />
    );
};

export default React.memo(React.forwardRef<any, IHandleProps>(Handle));