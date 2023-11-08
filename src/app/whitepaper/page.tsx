import { ButtonLink } from "../_components/atoms/ButtonLink";
import { Header } from "../_components/organisms/Header";
import Image from "next/image";
export default function Team() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <Header />
      <div className="flex h-[calc(100vh)] w-full flex-col items-center">
        <div className="mt-[64px] flex w-full animate-fade-in-down flex-col items-center space-y-6 p-16">
          <div className="flex flex-col lg:flex-row">
            <h1 className="text-center text-6xl font-medium transition-opacity">
              væske.
            </h1>
            <span className="mt-auto text-center lg:mx-4">or</span>
            <p className="mt-auto text-center text-xl font-medium">
              How I Learned to Stop Worrying and Love Proptech
            </p>
          </div>
          <hr />
          <div className="flex max-w-[600px] flex-col items-center">
            <p>chat gpt generated for show purposes only</p>
            <br />
            <p>
              In the rapidly evolving landscape of real estate, our PropTech
              company stands at the forefront, poised to redefine the industry's
              future. Harnessing the power of cutting-edge technology, we
              introduce a paradigm shift that seamlessly integrates the physical
              and digital realms of property management. Our innovative
              solutions streamline processes, from property acquisition to
              tenant experience, fostering unparalleled efficiency and
              transparency.
              <br />
              <br />
              At the core of our PropTech revolution is a comprehensive suite of
              tools designed to empower property owners, managers, and tenants
              alike. Utilizing advanced data analytics, our platform provides
              insightful market trends, enabling informed decision-making for
              property investments. Through intuitive interfaces and smart
              automation, property managers experience a frictionless workflow,
              optimizing resource allocation and reducing operational costs.
              Meanwhile, tenants benefit from a personalized, tech-enabled
              living experience, enhancing their connection to the property and
              fostering a sense of community. Embrace the future of real estate
              with our PropTech solutions, where innovation meets seamless
              functionality to transform the way we interact with and manage
              properties.
            </p>
            <Image src="/rabbit.svg" height={80} width={80} alt="logo" />
          </div>
        </div>
      </div>
    </main>
  );
}
