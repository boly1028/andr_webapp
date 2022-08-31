import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
// import { FlexBuilderTemplateProps } from "@/modules/flex-builder/types";
import { FlexecuteTemplateProps } from "@/modules/flexecute/types";

import Cors from 'cors'
import { suid } from "@/lib/schema/utils";

const cors = Cors({
  methods: ['GET'],
})

/**
 * Middleware to enable cors for the get request
 * @param req 
 * @param res 
 * @param fn 
 * @returns 
 */

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}


/**
 * Api enpoint for fetching schema based on path
 * @requires Query<string>(path) : `addresslist/0.1.0/addresslist`
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FlexecuteTemplateProps | undefined>,
) {
  await runMiddleware(req, res, cors);

  const path = req.query.path as string;

  const template = await getFlexecuteTemplateFromPath(path);
  if (!template) {
    return res.status(404);
  }

  res.status(200).json(template);
}


// This type of transformation is done in flex builder also. We can create a type system
// and a single function for all transformations for better consistency

export const getFlexecuteTemplateFromPath = async (path: string) => {
  // Parse path into title
  const adoName = path.split('/').pop() ?? suid();
  const id = path.replaceAll('/', ' ');
  const title = id.toUpperCase();
  // Generate Template
  const TEMPLATES: Array<FlexecuteTemplateProps> = [
    {
      id: `${id}`,
      name: '',
      description: '',
      icon: "",
      opts: [
        "Select your Base ADO functionality",
        "Add on your prefered modules",
        "Save as a template",
        "Publish and use!",
      ],
      ados: [
        { path: "proxy-message", id: "proxy-message", required: true },
        { path: `${path}`, id: `${title}`, required: true },
      ],
    },
  ];

  // pass to template
  const template = TEMPLATES.find((template) => template.id === id);

  if (!template || template.disabled) {
    return null;
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
      ).then(res => res.default);

      // Reassign id refs due to new data structs in path passing
      // Using let for reassignment if panel name includes spacing (heirarchy definement conflict to nest declarations in if)
      // if (ado.id.includes(" ")) {
      //   ado.id = ado.id.toString().split(" ").slice(-1);
      // }
      // console.log("$id for schema:", ado.id);

      if (ado.id !== "proxy-message") {
        ado.id = schemaADO["schema"]["$id"] ?? adoName;
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
        ).then(res => res.default);

        single_module.schema = data;
      }

      template.modules = modules;
    }

    return template
  }
}