import React from "react";
import { NextPage } from "next";

import { LandingPage } from "@/modules/landing";
import LandingLayout from "@/modules/landing/components/LandingLayout";

const Index: NextPage = () => (
  <LandingLayout>
    <LandingPage />
  </LandingLayout>
);

export default Index;
