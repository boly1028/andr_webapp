import React, { createRef, useContext, useEffect, useMemo, useRef } from "react";
import {
  FieldTemplateProps,
  getTemplate,
  getUiOptions,
} from "@andromedarjsf/utils";

import {
  FormControl,
  Box,
  Alert,
  AlertIcon,
  AlertDescription,
  Divider,
} from "@chakra-ui/react";
import { useUpdateNodeInternals } from "reactflow";
import { WrapIfIdentifier } from "../connections/WrapIfIdentifier";
import { WrapIfModule } from "../connections/WrapIfIModule";

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

  const updateNodeInternals = useUpdateNodeInternals();

  const fieldContextRef = useRef<IFieldRef>({})

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
          <WrapIfIdentifier id={id} formData={formData} />
          <WrapIfModule schema={schema} formData={formData} />
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
