import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";

// import { FlexBuilderTemplateProps } from "@/modules/flex-builder/types";
import { FlexecuteTemplateProps } from "@/modules/flexecute/types";
import { AdosList } from "@/modules/assets";
// import { TEMPLATES } from "./constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FlexecuteTemplateProps | undefined>,
) {
  const { id } = req.query;

  /////////////////////////////// Dynamic Path Loader ///////////////////////////////////
  // Parse id into seek path
  let tmpPath = id.toString();
  tmpPath = tmpPath.replace("@", "/");
  const path = tmpPath.replace("_", "/");

  // Parse id into action title
  let tmpTitle = id.toString();
  tmpTitle = tmpTitle.replace("@", " ");
  const title = tmpTitle.replace("_", " ").toUpperCase();
  // Generate Template
  const TEMPLATES: Array<FlexecuteTemplateProps> = [
    {
      id: `${id}`,
      ados: [
        { path: "proxy-message", id: "proxy-message", required: true },
        { path: `${path}`, id: `${title}`, required: true },
      ],
    },
  ];
  console.log("Template", TEMPLATES);

  // pass to template
  const template = TEMPLATES.find((template) => template.id === id);
  console.log("Template", template);
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
      const schemaADO = await import(
        `@/pages/api/flex-builder/schema/${ado.path}.json`
      );

      // Reassign id refs due to new data structs in path passing
      // Using let for reassignment if panel name includes spacing (heirarchy definement conflict to nest declarations in if)
      // if (ado.id.includes(" ")) {
      //   ado.id = ado.id.toString().split(" ").slice(-1);
      // }
      // console.log("$id for schema:", ado.id);
      if (ado.id !== "proxy-message") {
        ado.id = uuid();
      }

      schemaDefinitions[`${ado.id}`] = schemaADO["schema"];
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
      for (const single_module of modules) {
        const data = await import(
          `@/pages/api/flex-builder/schema/${single_module.path}.json`
        );
        single_module.schema = data;
      }

      template.modules = modules;
    }
  }

  res.status(200).json(template);
}
