import { ButtonLink } from "../_components/atoms/ButtonLink";
import { Header } from "../_components/organisms/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <Header />
      <div className="flex h-[calc(100vh)] w-full flex-col items-center justify-center">
        <div className="flex w-full animate-fade-in-down flex-col space-y-6 px-8 md:w-[800px]">
          <h1 className="text-4xl transition-opacity">Welcome to væske.</h1>
          <p className="text-lg">
            væske is a new kind of real estate marketplace where we bring
            together homeowners & real estate investors to create a win-win
          </p>
          <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
            <ButtonLink
              href="homeowners"
              className="w-full text-xl transition-all hover:scale-105 md:w-1/2"
            >
              I am a home owner 🏡
            </ButtonLink>
            <ButtonLink
              secondary
              href="proptechs"
              className="w-full text-xl transition-all hover:scale-105 md:w-1/2"
            >
              I am a PropTech 👨‍💻
            </ButtonLink>
          </div>
        </div>
      </div>
    </main>
  );
}
