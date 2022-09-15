import type { NextApiRequest, NextApiResponse } from "next";

import { FlexBuilderTemplateProps } from "@/modules/flex-builder/types";

import { TEMPLATES } from "./constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FlexBuilderTemplateProps | undefined>,
) {
  const id = req.query.id as string;
  const template = await getTemplateFromId(id)
  if (!template) {
    return res.status(404);
  }
  res.status(200).json(template);
}


export const getTemplateFromId = async (id: string) => {
  const template = TEMPLATES.find((template) => template.id === id);

  if (!template || template.disabled) {
    return null;
  }

  if (template?.ados) {
    const schemaDefinitions: any = {};
    const schemaProperties: any = {};

    const uiSchema: any = {
      'ui:order': []
    };
    const formData: any = {};

    for (const ado of template.ados) {
      // schema
      const schemaADO = await import(`./schema/${ado.path}.json`).then(res => {
        // Returning Default import is important here otherwise it will be returned as module
        return res.default
      });

      schemaDefinitions[`${ado.id}`] = schemaADO["schema"];
      schemaDefinitions[`${ado.id}`]['properties'] = schemaDefinitions[`${ado.id}`]['properties'] ?? {};
      schemaDefinitions[`${ado.id}`]["properties"]["$type"] = {
        type: "string",
        default: schemaADO["schema"]["$id"],
      };
      schemaDefinitions[`${ado.id}`]["properties"]["$class"] = {
        type: "string",
        default: schemaADO["schema"]["class"],
      };
      schemaDefinitions[`${ado.id}`]["properties"]["$classifier"] = {
        type: "string",
        default: schemaADO["schema"]["classifier"],
      };
      schemaDefinitions[`${ado.id}`]["properties"]["$removable"] = {
        type: "boolean",
        default: !ado.required,
      };
      schemaDefinitions[`${ado.id}`]["properties"]["$enabled"] = {
        type: "boolean",
        default: !!ado.required,
      };

      schemaProperties[`${ado.id}`] = { $ref: `#/definitions/${ado.id}` };

      // ui-schema
      uiSchema[`${ado.id}`] = schemaADO["ui-schema"];
      uiSchema[`${ado.id}`]["$class"] = { "ui:widget": "hidden" };
      uiSchema[`${ado.id}`]["$classifier"] = { "ui:widget": "hidden" };
      uiSchema[`${ado.id}`]["$removable"] = { "ui:widget": "hidden" };
      uiSchema[`${ado.id}`]["$enabled"] = { "ui:widget": "hidden" };
      uiSchema[`${ado.id}`]["$type"] = { "ui:widget": "hidden" };
      uiSchema['ui:order'].push(ado.id)

      // form-data
      formData[`${ado.id}`] = schemaADO["form-data"];
    }

    template.schema = {
      definitions: schemaDefinitions,
      type: "object",
      properties: schemaProperties,
    };

    template.uiSchema = uiSchema;
    template.formData = formData;

    //Load lsited modules
    if (template?.modules) {
      const modules = template.modules;
      // Import module listed in constants
      // eslint-disable-next-line @next/next/no-assign-module-variable
      for (const module of modules) {
        const data = await import(`./schema/${module.path}.json`).then(res => res.default);
        module.schema = data;
      }

      template.modules = modules;
    }
  }

  return template;
}