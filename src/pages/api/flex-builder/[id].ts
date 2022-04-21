import type { NextApiRequest, NextApiResponse } from "next";

import { FlexBuilderTemplateProps } from "@/modules/flex-builder/types";

import { TEMPLATES } from "./constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FlexBuilderTemplateProps | undefined>,
) {
  const { id } = req.query;
  const template = TEMPLATES.find((template) => template.id === id);

  if (!template || template.disabled) {
    res.status(404);
  }

  if (template?.ados) {
    const schemaDefinitions: any = {};
    const schemaProperties: any = {};

    const uiSchema: any = {};
    const formData: any = {};

    for (const ado of template.ados) {
      // schema
      const schemaADO = await import(`./schema/${ado.path}.json`);
      schemaDefinitions[`${ado.id}`] = schemaADO["schema"];
      schemaProperties[`${ado.id}`] = { $ref: `#/definitions/${ado.id}` };

      // ui-schema
      uiSchema[`${ado.id}`] = schemaADO["ui-schema"];

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
  }

  res.status(200).json(template);
}
