import React, { createRef, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import {
  FieldTemplateProps,
  getTemplate,
  getUiOptions,
  getSchemaType
} from "@andromedarjsf/utils";

import {
  Text,
  FormControl,
  FormLabel,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useId,
  Divider,
} from "@chakra-ui/react";
import { JSONSchema7 } from "json-schema";
import { Handle, OnConnect, Position, useUpdateNodeInternals } from "reactflow";
import { AppBuilderContext, useAppBuilder, useReactFlow } from "../../canvas/Provider";
import { useIsIdentifier } from "../connections/identifier";
import { DIRECTION, getSourceHandlePrefix } from "../connections/utils";
import { useIsModule } from "../connections/module";

const FieldTemplate = (props: FieldTemplateProps) => {
  const {
    id,
    children,
    classNames,
    disabled,
    displayLabel,
    hidden,
    label,
    onDropPropertyClick,
    onKeyChange,
    readonly,
    required,
    rawErrors = [],
    rawHelp,
    rawDescription,
    schema,
    uiSchema,
    registry,
    onChange,
    formData,
    hideError,
    formContext
  } = props;

  const { deleteElements } = useReactFlow()
  const updateNodeInternals = useUpdateNodeInternals();

  const fieldContextRef = useRef<IFieldRef>({})

  const { isIdentifier, handleConnect, edgeId } = useIsIdentifier(formContext.name, id, formData, fieldContextRef)
  const { isModule } = useIsModule(schema, formData, fieldContextRef)

  const [leftHandle, rightHandle] = useMemo(() => {
    return [getSourceHandlePrefix(edgeId, DIRECTION.LEFT), getSourceHandlePrefix(edgeId, DIRECTION.RIGHT)]
  }, [edgeId])


  const uiOptions = getUiOptions(uiSchema);
  const WrapIfAdditionalTemplate = getTemplate<"WrapIfAdditionalTemplate">(
    "WrapIfAdditionalTemplate",
    registry,
    uiOptions,
  );

  useEffect(() => {
    fieldContextRef.current.onChange = (data: any) => {
      console.log("OnChange", data, id)
      onChange(data, undefined, id);
      updateNodeInternals(formContext.name)
    }
  }, [onChange, id, fieldContextRef, formContext.name])

  if (hidden) {
    return <>{children}</>;
  }

  if (schema.type === "null") {
    return <>{children}</>;
  }

  const hasWrapper = !!schema?.anyOf || !!schema?.oneOf;

  const showAlert = !hasWrapper && !!uiOptions.alerts;
  const alerts: Array<any> = !showAlert ? [] : uiOptions.alerts as Array<any>

  return (
    <FieldTemplateContext.Provider value={{ fieldRef: fieldContextRef }}>
      <WrapIfAdditionalTemplate
        classNames={classNames}
        disabled={disabled}
        id={id}
        label={label}
        onDropPropertyClick={onDropPropertyClick}
        onKeyChange={onKeyChange}
        readonly={readonly}
        required={required}
        schema={schema}
        uiSchema={uiSchema}
        registry={registry}
      >
        {alerts.map((alert, idx) => (
          <Alert
            key={idx}
            status={alert.type}
            variant="left-accent"
            rounded="lg"
            fontSize="xs"
            my='2'
            w='95%'
            mx='auto'
            py='1.5'
          >
            <AlertIcon />
            <AlertDescription
              listStylePos="inside"
              dangerouslySetInnerHTML={{
                __html: `${alert.text}`,
              }}
              lineHeight='1.4'
            />
          </Alert>
        ))}
        <Box position='relative' py={hasWrapper ? '4' : '0'}
        // bg={hasWrapper?'#ffffff04':'transparent'}0
        >
          {hasWrapper && <Divider mb='2' mx='auto' w='95%' />}
          {isIdentifier && (
            <>
              <Handle onConnect={handleConnect} id={leftHandle} type='source' position={Position.Left} style={{ backgroundColor: 'teal', border: '0px', left: '-5px', padding: '4px' }} />
              <Handle onConnect={handleConnect} id={rightHandle} type='source' position={Position.Right} style={{ backgroundColor: 'teal', border: '0px', right: '-5px', padding: '4px' }} />
            </>
          )}
          <FormControl
            isRequired={hasWrapper ? false : required}
            isInvalid={rawErrors && rawErrors.length > 0}
            position='relative'
          >
            {/* {displayLabel && <>{description}</>} */}

            {children}

            {/* {props.help} */}
            {!hideError && (<Box px='4'>{props.errors}</Box>)}
          </FormControl>
          {hasWrapper && <Divider mt='2' mx='auto' w='95%' />}
        </Box>
      </WrapIfAdditionalTemplate>
    </FieldTemplateContext.Provider>
  );
};

interface FieldTemplateContext {
  fieldRef: React.MutableRefObject<IFieldRef>
}

export interface IFieldRef {
  onChange?: (data: any) => void;
}

const defaultValue: FieldTemplateContext = {
  fieldRef: createRef<IFieldRef>() as any
};

const FieldTemplateContext = React.createContext(defaultValue);
export const useFieldTemplate = () => useContext(FieldTemplateContext);

export default FieldTemplate
