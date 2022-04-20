import type { NextApiRequest, NextApiResponse } from "next";

import { FlexBuilderTemplateProps } from "@/modules/flex-builder/types";

import { TEMPLATES } from "./constants";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FlexBuilderTemplateProps | undefined>,
) {
  const { id } = req.query;
  const template = TEMPLATES.find((template) => template.id === id);

  if (!template || template.disabled) {
    res.status(404);
  }

  res.status(200).json(template);
}
