import React from "react";

import { Layout } from "@/modules/common";
import { AppBuilderPage } from "@/modules/app-builder";
import PagePlaceholder from "@/modules/common/components/PagePlaceholder";

export default function AppBuilderCreate() {
  return (
    <Layout>
      {/* <AppBuilderPage /> */}
      <PagePlaceholder
        imageUrl="/placeholders/app-builder.png"
        description={`Rapidly compose complex solutions with drag-and-drop capability. Publish directly to a production ready chain or a test network. Export your app’s code to the CLI. Easily configure cross-chain applications and connect your app to the best projects across the Cosmos ecosystem.
        
        This functionality is mostly completed.  It is last to be released to reduce break-fix requirements. This is a power user’s playground.`}
      />
    </Layout>
  );
}
