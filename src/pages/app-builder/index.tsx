import React from "react";
import AppBuilderEditor from "@/modules/app-builder";
import { HotkeysProvider } from "react-hotkeys-hook";

export default function AppBuilderCreate() {
  return (
    <HotkeysProvider>
      <AppBuilderEditor />
    </HotkeysProvider>
  );
}
