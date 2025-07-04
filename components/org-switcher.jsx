"use client";

import {
  OrganizationSwitcher,
  SignedIn,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React from "react";

const OrgSwitcher = () => {
  const { isLoaded } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const pathname = usePathname();

  if (!isLoaded || !isUserLoaded) {
    return null;
  }
  return (
    <div>
      <SignedIn>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:slug"
          afterSelectOrganizationUrl="/organization/:slug"
          createOrganizationMode={
            pathname === "/onboarding" ? "navigation" : "modal"
          }
          appearance={{
            elements: {
              organizationSwitcherTrigger: {
                border: "1px solid #D1D5DB", // Tailwind's gray-300
                borderRadius: "6px", // rounded-md → 6px
                paddingRight: "20px",
                paddingLeft: "20px",
                paddingTop: "8px", // py-2 → 8px
                paddingBottom: "8px",
              },
              organizationSwitcherTriggerIcon: "text-white",
            },
          }}
        />
      </SignedIn>
    </div>
  );
};

export default OrgSwitcher;
