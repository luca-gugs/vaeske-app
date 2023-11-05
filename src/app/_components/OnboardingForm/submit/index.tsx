"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export const Submit = () => {
  const [progress, setProgress] = useState(0);
  const [header, setHeader] = useState("Creating Your Profile");
  const [emoji, setEmoji] = useState("🤵");
  const router = useRouter();

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      console.log("BEfore");
      router.refresh();
      console.log("after");
      //   setName("");
    },
  });

  return (
    <div>
      <div className="flex items-center">
        <h2 className="mr-4 text-4xl md:text-5xl">{header}</h2>
        <span className="text-6xl md:text-8xl">{emoji}</span>
      </div>
    </div>
  );
};
