import React from "react";

import { Layout } from "@/modules/common";
import { AppBuilderPage } from "@/modules/app-builder";
import PagePlaceholder from "@/modules/common/components/PagePlaceholder";
import { ILinkItemKey } from "@/modules/common/components/Sidebar";

export default function AppBuilderCreate() {
  return (
    <Layout activeLink={ILinkItemKey.APP_BUILDER}>
      {/* <AppBuilderPage /> */}
      <a
        href="https://andromeda-webapp-git-feature-app-builder-flow-andromedaprotocol.vercel.app/test/app-builder"
        target="_blank"
        rel="noreferrer"
      >
        <PagePlaceholder
          imageUrl="/placeholders/app-builder-preview-0223.png"
          description=""
        />
      </a>
    </Layout>
  );
}
