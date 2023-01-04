import React, { createRef, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef } from "react";

import {
  FieldTemplateProps,
  getTemplate,
  getUiOptions,
  getSchemaType,
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

  useLayoutEffect(() => {
    return () => {
      if (fieldContextRef.current.connectedEdge) {
        console.log("Connected here")
        deleteElements({ edges: [{ id: fieldContextRef.current.connectedEdge.id }] })
      }
    }
  }, [])

  useEffect(() => {
    fieldContextRef.current.onChange = (data: any) => {
      updateNodeInternals(formContext.name)
      onChange(data, undefined, id);
    }
  }, [onChange, id, fieldContextRef, formContext.name])

  if (hidden) {
    return <>{children}</>;
  }

  if (schema.type === "null") {
    return <>{children}</>;
  }

  const hasWrapper = !!schema?.anyOf || !!schema?.oneOf;

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
        {!hasWrapper && uiOptions.info && (
          <Alert
            status={uiOptions.infoType as any}
            variant="left-accent"
            rounded="lg"
            fontSize="sm"
            mb="4"
          >
            <AlertIcon />
            <AlertDescription
              listStylePos="inside"
              dangerouslySetInnerHTML={{
                __html: `${uiOptions.info}`,
              }}
            />
          </Alert>
        )}
        <Box position='relative' px={isIdentifier ? '4' : 0}>
          {isIdentifier && (
            <>
              <Handle onConnect={handleConnect} id={leftHandle} type='source' position={Position.Left} style={{ backgroundColor: 'teal', border: '0px' }} />
              <Handle onConnect={handleConnect} id={rightHandle} type='source' position={Position.Right} style={{ backgroundColor: 'teal', border: '0px' }} />
            </>
          )}
          <FormControl
            isRequired={hasWrapper ? false : required}
            isInvalid={rawErrors && rawErrors.length > 0}
            position='relative'
          >
            {/* {displayLabel && <>{description}</>} */}

            <Box border={hasWrapper ? '1px' : '0px'} borderColor="dark.300" p={hasWrapper ? 2 : 0} rounded="lg">
              {children}
            </Box>

            {/* {props.help} */}
            {!hideError && props.errors}
          </FormControl>
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
  connectedEdge?: AppBuilderContext['edges'][number];
}

const defaultValue: FieldTemplateContext = {
  fieldRef: createRef<IFieldRef>() as any
};

const FieldTemplateContext = React.createContext(defaultValue);
export const useFieldTemplate = () => useContext(FieldTemplateContext);

export default FieldTemplate
