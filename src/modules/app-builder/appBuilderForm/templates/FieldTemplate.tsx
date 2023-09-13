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
  FormLabel,
} from "@chakra-ui/react";
import { useUpdateNodeInternals } from "reactflow";
import { WrapIfIdentifier } from "../connections/WrapIfIdentifier";
import { isIdentifier } from "@/modules/flex-builder/components/FlexBuilderForm/utils/identifier";
import { ALERT_TYPE_MAP } from "@/modules/flex-builder/components/FlexBuilderForm/alerts/utils";

const FieldTemplate = (props: FieldTemplateProps) => {
  const {
    id,
    children,
    classNames,
    disabled,
    hidden,
    label,
    onDropPropertyClick,
    onKeyChange,
    readonly,
    required,
    rawErrors = [],
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
  const alerts: Array<any> = !showAlert ? [] : uiOptions.alerts as Array<any>;

  const TitleFieldTemplate = getTemplate<"TitleFieldTemplate">(
    "TitleFieldTemplate",
    registry,
    uiOptions,
  );

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
            variant={`theme-${ALERT_TYPE_MAP[alert.type]}`}
            fontSize="xs"
            my='2'
            mx='auto'
            py='1.5'
          >
            <AlertIcon />
            <AlertDescription
              listStylePos="inside"
              dangerouslySetInnerHTML={{
                __html: `${alert.text}`,
              }}
              textStyle='main-xs-regular'
              lineHeight={1.4}
            />
          </Alert>
        ))}
        {hasWrapper && <Divider mt='2' mx='auto' w='95%' />}
        <Box position='relative' py={hasWrapper ? '4' : '0'}
          bg={hasWrapper ? '#ffffff04' : 'transparent'}
        >
          <FormControl
            isRequired={hasWrapper ? false : required}
            isInvalid={rawErrors && rawErrors.length > 0}
            position='relative'
          >
            {hasWrapper && props.displayLabel && label ? (
              <TitleFieldTemplate
                id={`${id}-title`}
                schema={schema}
                uiSchema={uiSchema}
                registry={registry}
                title={label}
              />
            ) : null}
            {/* {displayLabel && <>{description}</>} */}

            {children}
            {isIdentifier(schema as any) && (
              <WrapIfIdentifier id={id} formData={formData} />
            )}
            {/* {props.help} */}
            {!hideError && (<Box px='4'>{props.errors}</Box>)}
          </FormControl>
        </Box>
        {hasWrapper && <Divider mb='2' mx='auto' w='95%' />}
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
