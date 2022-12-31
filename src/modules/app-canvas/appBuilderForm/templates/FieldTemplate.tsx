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

  const { edges, nodes } = useAppBuilder()
  const mountId = useId()

  const { deleteElements } = useReactFlow()
  const updateNodeInternals = useUpdateNodeInternals();

  const handlerPrefix = useMemo(() => {
    // @ts-ignore
    if (!!schema?.properties?.address?.properties?.identifier) {
      return `${formContext.name}-${id}-${mountId}-source-`
    }
  }, [schema, formContext.name, id])

  const connectedEdge = useMemo(() => {
    if (handlerPrefix) {
      return edges.find(edge => edge.sourceHandle?.startsWith(handlerPrefix))
    }
  }, [edges, handlerPrefix])

  const handleConnect: OnConnect = (connection) => {
    const targetNode = nodes.find(node => node.id === connection.target)
    if (targetNode) {
      const adoType = targetNode.data.andromedaSchema.schema.$id
      const targetName = targetNode.data.name;
      fieldContextRef.current.onChange?.({
        ...formData,
        address: {
          identifier: targetName
        },
        module_type: adoType
      })
    }
    if (connectedEdge) {
      deleteElements({ edges: [{ id: connectedEdge.id }] })
    }
  }


  useEffect(() => {
    fieldContextRef.current.connectedEdge = connectedEdge;
    updateNodeInternals(formContext.name)
  }, [connectedEdge])

  const fieldContextRef = useRef<IFieldRef>({})

  const uiOptions = getUiOptions(uiSchema);
  const WrapIfAdditionalTemplate = getTemplate<"WrapIfAdditionalTemplate">(
    "WrapIfAdditionalTemplate",
    registry,
    uiOptions,
  );

  useEffect(() => {
    /**
     * A Hack to by pass required field enforcement for array and boolean.
     * These fields are supposed to have default values:
     * array = empty array
     * boolean = false
     * So, if default value is not provided and the field is required,
     * we inject default values ourselves.
     */

    // RJSF Bug so we need to have a timeout to update form data
    const tId = setTimeout(() => {
      if (!required) return;
      if (schema.default) return;
      const type = getSchemaType(schema) as JSONSchema7["type"];
      if (type === "array") {
        if (!Array.isArray(formData)) {
          onChange([], undefined, id);
        }
      } else if (type === "boolean") {
        if (formData === undefined) {
          onChange(false, undefined, id);
        }
      }
    }, 500);

    return () => clearTimeout(tId);
  }, []);

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
        <Box position='relative' px={handlerPrefix ? '4' : 0}>
          {handlerPrefix && (
            <>
              <Handle onConnect={handleConnect} id={`${handlerPrefix}-left`} type='source' position={Position.Left} style={{ backgroundColor: 'teal', border: '0px' }} />
              <Handle onConnect={handleConnect} id={`${handlerPrefix}-right`} type='source' position={Position.Right} style={{ backgroundColor: 'teal', border: '0px' }} />
            </>
          )}
          <FormControl
            isRequired={hasWrapper ? false : required}
            isInvalid={rawErrors && rawErrors.length > 0}
            position='relative'
          >
            {/* {displayLabel && <>{description}</>} */}
            {hasWrapper ? (
              <Box key={1} border="1px" borderColor="dark.300" p="2" rounded="lg">
                {children}
              </Box>
            ) : (
              <>{children}</>
            )}

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

interface IFieldRef {
  onChange?: (data: any) => void;
  connectedEdge?: AppBuilderContext['edges'][number];
}

const defaultValue: FieldTemplateContext = {
  fieldRef: createRef<IFieldRef>() as any
};

const FieldTemplateContext = React.createContext(defaultValue);
export const useFieldTemplate = () => useContext(FieldTemplateContext);

export default FieldTemplate
