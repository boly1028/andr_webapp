import type { NextApiRequest, NextApiResponse } from "next";

import { FlexBuilderTemplateProps } from "@/types";

import { TEMPLATES } from "./constants";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<FlexBuilderTemplateProps>>,
) {
  res.status(200).json(TEMPLATES);
}
