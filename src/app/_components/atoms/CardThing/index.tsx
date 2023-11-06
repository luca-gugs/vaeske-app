"use client";
import Link from "next/link";
import "./styles.css";
import { motion, Variants } from "framer-motion";

interface Props {
  emoji: string;
  hueA: number;
  hueB: number;
  header: string;
  body: string;
  link: string;
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -2,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

export const Card = ({ emoji, hueA, hueB, header, body, link }: Props) => {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <>
      <motion.div
        className="card-container"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <div className="splash" style={{ background }} />
        <motion.div className="card p-4" variants={cardVariants}>
          <p className="!text-[16px] font-medium">{header}</p>
          {/* <p className="!text-[16px] font-medium">{header}</p>
          <p className="font-regular !text-[12px]">{body}</p> */}
          <Link href={link}>{emoji}</Link>
        </motion.div>
      </motion.div>
    </>
  );
};
