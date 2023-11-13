"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

export const Cards = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const items = [
    { id: "1", title: "Item 1", subtitle: "Subtitle 1" },
    { id: "2", title: "Item 2", subtitle: "Subtitle 2" },
    { id: "3", title: "Item 3", subtitle: "Subtitle 3" },
  ];

  return (
    <div>
      {items.map((item) => (
        <motion.div layoutId={item.id} onClick={() => setSelectedId(item.id)}>
          <motion.h5>{item.subtitle}</motion.h5>
          <motion.h2>{item.title}</motion.h2>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div layoutId={selectedId}>
            {/* <motion.h5>{item.subtitle}</motion.h5>
            <motion.h2>{item.title}</motion.h2> */}
            <motion.button onClick={() => setSelectedId(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
