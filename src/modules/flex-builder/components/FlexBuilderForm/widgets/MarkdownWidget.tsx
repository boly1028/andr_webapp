import React from "react";
import ReactDOMServer from "react-dom/server";
import { FormControl, FormLabel } from "@chakra-ui/react";
import rehypeRaw from "rehype-raw";
import { WidgetProps, getDisplayLabel } from "@rjsf/full/node_modules/@rjsf/utils";
// import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// import { getChakra } from "../utils";

import { MarkdownEditor } from "../../MarkdownEditor";
import validator from "../validator";

const remarkPlugins = [remarkGfm];

export const MarkdownWidget = (props: WidgetProps) => {
  const {
    id,
    type,
    value,
    label,
    schema,
    uiSchema,
    onChange,
    onBlur,
    onFocus,
    options,
    required,
    readonly,
    rawErrors,
    autofocus,
    placeholder,
    disabled,
    formContext,
  } = props;
  // const chakraProps = getChakra({ uiSchema });

  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
    onBlur(id, value);
  const _onFocus = ({
    target: { value },
  }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value);

  const displayLabel =
    getDisplayLabel(validator, schema, uiSchema) && (!!label || !!schema.title);

  return (
    <FormControl
      // {...chakraProps}
      isDisabled={disabled || readonly}
      isRequired={required}
      isReadOnly={readonly}
      isInvalid={rawErrors && rawErrors.length > 0}
    >
      {displayLabel ? (
        <FormLabel htmlFor={id} id={`${id}-label`}>
          {label || schema.title}
        </FormLabel>
      ) : null}
      <MarkdownEditor
        id={id}
        value={value || value === 0 ? value : ""}
        onBlur={_onBlur}
        onFocus={_onFocus}
        options={{
          sideBySideFullscreen: false,
          spellChecker: false,
          previewRender: (text) => {
            const MD = (
              <div className="markdown">
                <ReactMarkdown
                  skipHtml
                  components={{}}
                  // components={ChakraUIRenderer({
                  //   h1: ({ children }) => (
                  //     <h1 className="text-3xl font-bold my-6">{children}</h1>
                  //   ),
                  //   h2: ({ children }) => (
                  //     <h2 className="text-2xl font-bold my-5">{children}</h2>
                  //   ),
                  //   h3: ({ children }) => (
                  //     <h3 className="text-xl font-bold my-5">{children}</h3>
                  //   ),
                  //   h4: ({ children }) => (
                  //     <h4 className="text-lg font-bold my-5">{children}</h4>
                  //   ),
                  //   h5: ({ children }) => (
                  //     <h5 className="text-base font-bold my-5">{children}</h5>
                  //   ),
                  //   h6: ({ children }) => (
                  //     <h5 className="text-sm font-bold my-5">{children}</h5>
                  //   ),
                  //   table: ({ children }) => (
                  //     <Table variant="striped" my={5}>
                  //       {children}
                  //     </Table>
                  //   ),
                  //   p: ({ children }) => (
                  //     <Text my={5} fontSize="lg">
                  //       {children}
                  //     </Text>
                  //   ),
                  //   a: ({ children, href }) => (
                  //     <Link my={5} href={href} className="font-medium">
                  //       {children}
                  //     </Link>
                  //   ),
                  //   img: ({ src, alt }) => (
                  //     <img src={src} alt={alt} className="my-5" />
                  //   ),
                  // })}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {text}
                </ReactMarkdown>
              </div>
            );

            return ReactDOMServer.renderToString(MD);
          },
        }}
      />
      {schema.examples ? (
        <datalist id={`examples_${id}`}>
          {(schema.examples as string[])
            .concat(schema.default ? ([schema.default] as string[]) : [])
            .map((example: any) => {
              return <option key={example} value={example} />;
            })}
        </datalist>
      ) : null}
    </FormControl>
  );
};
