"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { motion } from "framer-motion";
import React from "react";

export const ClientComponent = () => {
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  const boxShadowVariants = {
    initial: {
      boxShadow:
        "0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11), 0 4px 4px rgba(0, 0, 0, 0.11), 0 6px 8px rgba(0, 0, 0, 0.11), 0 8px 16px rgba(0, 0, 0, 0.11);",
    },
    animate: {
      boxShadow:
        "0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07)",
    },
  };
  console.log("IS LOADED: ", isLoaded);
  console.log("Set Active: ", setActive);
  console.log("User Memberships: ", userMemberships);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={boxShadowVariants}
      transition={{ duration: 0.5, ease: "easeInOut" }} // Adjust the ease property
      className="rounded-md bg-gray-200 p-6"
    >
      {/* Your component content */}
      <p>Your content goes here</p>
    </motion.div>
  );
};
