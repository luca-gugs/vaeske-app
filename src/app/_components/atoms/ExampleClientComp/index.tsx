"use client";

import { useOrganizationList } from "@clerk/nextjs";
import React from "react";

export const ClientComponent = () => {
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  console.log("IS LOADED: ", isLoaded);
  console.log("Set Active: ", setActive);
  console.log("User Memberships: ", userMemberships);

  return <div className="text-4xl">Test Client Component</div>;
};
