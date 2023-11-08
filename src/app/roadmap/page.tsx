import { ButtonLink } from "../_components/atoms/ButtonLink";
import { Header } from "../_components/organisms/Header";
import Image from "next/image";
export default function Team() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <Header />
      <div className="flex h-[calc(100vh)] w-full flex-col items-center">
        <div className="mt-[64px] flex w-full animate-fade-in-down flex-col items-center space-y-6 p-16">
          <h1 className="text-center text-6xl font-medium transition-opacity">
            The Roadmap.
          </h1>
          <hr />
          <div className="flex max-w-[600px] flex-col items-center">
            <p>chat gpt generated for show purposes only</p>
            <br />
            <p>
              <b>Phase 1:</b> Foundation (Months 1-3) Build Core Team: Assemble
              a cross-functional team with expertise in real estate, technology,
              and data analytics. Market Research: Conduct in-depth market
              analysis to identify key pain points and opportunities in the real
              estate industry. Technology Infrastructure: Develop a robust,
              scalable platform architecture to support future innovations.
              <br />
              <br />
              <b>Phase 2:</b> MVP Development (Months 4-6) Minimum Viable
              Product (MVP): Create a stripped-down version of the platform with
              essential features to validate the concept and gather user
              feedback. Beta Testing: Engage a select group of property managers
              and owners to test the MVP, collecting valuable insights for
              refinement. Regulatory Compliance: Ensure the platform complies
              with relevant real estate regulations and data protection laws.
              <br />
              <br />
              <b>Phase 3:</b>Iterative Enhancement (Months 7-12) Continuous
              Feedback Loop: Implement iterative updates based on user feedback,
              enhancing user experience and addressing identified pain points.
              Expand Feature Set: Introduce additional functionalities such as
              predictive analytics, automated leasing processes, and integration
              with IoT devices for smart property management.
              <br />
              <br />
              <b>Phase 4:</b> Market Expansion (Months 13-18) Scalability:
              Optimize the platform for scalability to accommodate a growing
              user base. Marketing and Branding: Launch a targeted marketing
              campaign to increase brand visibility and attract a broader
              audience. Partnerships: Explore strategic partnerships with real
              estate agencies, property developers, and technology providers to
              expand market reach.
              <br />
              <br />
              <b>Phase 5:</b> Global Presence (Months 19-24)
              Internationalization: Adapt the platform for global markets,
              considering diverse regulatory environments and property
              management practices. Localization: Implement language and
              region-specific features to enhance user experience in different
              geographical areas. Market Penetration: Launch targeted expansion
              efforts in key international markets, establishing a global
              presence.
              <br />
              <br />
              This roadmap outlines a strategic progression from establishing
              the company's foundation to achieving a global footprint, ensuring
              a comprehensive approach to product development, user engagement,
              and market expansion.
            </p>
            <Image src="/rabbit.svg" height={80} width={80} alt="logo" />
          </div>
        </div>
      </div>
    </main>
  );
}
