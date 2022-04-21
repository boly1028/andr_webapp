import dynamic from "next/dynamic";
import type { SimpleMDEReactProps } from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";

export const MarkdownEditor = dynamic<SimpleMDEReactProps>(
  async (): Promise<any> => import("react-simplemde-editor"),
  {
    ssr: false,
  },
);
