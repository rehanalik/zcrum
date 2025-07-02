"use client";

import { useOrganization } from "@clerk/nextjs";
import React from "react";

const OrganizationPage = () => {
  const { organization } = useOrganization();

  if (!organization) return <div>Loading...</div>;

  return <div>{`${organization.name}'s Projects`}</div>;
};

export default OrganizationPage;
