import { useEffect, useState } from "react";
import { Header } from "../_components/Header";
import Image from "next/image";
import { Card } from "../_components/atoms/CardThing";
import Link from "next/link";
import { ButtonLink } from "../_components/atoms/ButtonLink";
export default function Home() {
  //   const food: [string, number, number, string, string, string][] = [
  //     [
  //       "🏠",
  //       340,
  //       10,
  //       "For Home Owners",
  //       "Rather than seeking out investment in your equity vaeske brings together investors to bid on you! Maximizing the value of your hard earned equity.",
  //       "/for-owners",
  //     ],
  //     [
  //       "💹",
  //       100,
  //       140,
  //       "Real Estate Fin Techs & Investors",
  //       "Vaeske allows Fin Techs and other lenders to set their own buybox and receive leads that match there bespoke criteria",
  //       "/for-investors",
  //     ],
  //     [" ⁉️", 290, 320, "More Coming Soon!", "", "#"],
  //   ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <Header />
      <div className="flex h-[calc(100vh)] w-full flex-col items-center justify-center">
        <div className="animate-fade-in-down flex w-[800px] flex-col space-y-6 px-8">
          <h1 className="text-4xl transition-opacity">Welcome to væske.</h1>
          <p className="text-lg">
            væske is a new kind of real estate marketplace where we bring
            together homeowners & real estate investors to create a win-win
          </p>
          <div className="flex space-x-3">
            <ButtonLink
              href="#"
              className="w-1/2 text-xl transition-all hover:scale-105"
            >
              I am a home owner 🏡
            </ButtonLink>
            <ButtonLink
              secondary
              href="#"
              className="w-1/2 text-xl transition-all hover:scale-105"
            >
              I am a PropTech 👨‍💻
            </ButtonLink>
          </div>
          {/* <div className="!mt-[80px] flex w-full flex-col items-center justify-center space-y-1 text-center">
            <p className="text-sm">Scroll to learn more</p>
            <Image
              height={20}
              width={20}
              className="animate-bounce"
              src="/arrow-down.svg"
              alt="arrow"
            />
          </div> */}
        </div>
      </div>
      {/* <div className="hidden pb-[300px] md:block">
        {food.map(([emoji, hueA, hueB, header, body, link]) => (
          <Card
            emoji={emoji}
            hueA={hueA}
            hueB={hueB}
            key={emoji}
            header={header}
            body={body}
            link={link}
          />
        ))}
      </div> */}
    </main>
  );
}
