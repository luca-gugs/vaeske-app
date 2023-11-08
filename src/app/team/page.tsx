import { ButtonLink } from "../_components/atoms/ButtonLink";
import { Header } from "../_components/organisms/Header";
import Image from "next/image";
export default function Team() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <Header />
      <div className="flex h-[calc(100vh)] w-full flex-col items-center">
        <div className="mt-[64px] flex w-full animate-fade-in-down flex-col space-y-6 p-16">
          <h1 className="text-4xl transition-opacity">The Team</h1>
          <p className="text-lg">Meet the folks building væske.</p>

          <div className="flex flex-wrap">
            {[
              {
                name: "John Smith",
                photo: "/rick.jpg",
                role: "Chief Executive Officer",
                blurb:
                  "Meet John Smit, our real estate maestro. With seasoned leadership, he charts our course through the ever-evolving real estate landscape, guiding the team to new heights of innovation and success.",
              },
              {
                name: "John Doe",
                photo: "/john.jpg",
                role: "Chief Technical Officer",
                blurb:
                  "Say hello to John, our tech virtuoso at the heart of innovation. As the CTO, he spearheads our technological endeavors, navigating us through the digital frontier with expertise and vision. Under John's guidance, we're not just keeping up with technology; we're setting the pace for it.",
              },
              {
                name: "Mitch Dalton",
                photo: "/mitch.jpg",
                role: "Chief Operating Officer",
                blurb:
                  "Meet Mitch, our operational maestro as the COO. With precision and strategy, he orchestrates the seamless functioning of our business. Under Mitch's adept leadership, we're not just managing operations; we're optimizing them for unparalleled efficiency and success.",
              },
              {
                name: "Will Craig",
                photo: "/will.jpg",
                role: "Chief Product Officer",
                blurb:
                  "Introducing Will, our product visionary as the Chief Product Officer. With an eye for innovation, he leads the charge in shaping cutting-edge products that redefine industry standards. Under Will's guidance, we're not just creating products; we're crafting experiences that resonate and revolutionize.",
              },
            ].map((person) => {
              return (
                <div className="flex w-full flex-col items-center p-4 md:w-1/2 md:p-10 lg:w-1/3">
                  <Image
                    src={person.photo}
                    height={100}
                    width={100}
                    alt="rick"
                    className="mb-[20px] h-[200px]  w-[200px] max-w-full rounded-full border-[2px] object-contain"
                  />
                  <span className="mb-[8px] border-[1px] border-black px-1 text-sm">
                    {person.role}
                  </span>
                  <span className="mb-[8px] text-3xl font-bold">
                    {person.name}
                  </span>
                  <p className="text-center text-sm">{person.blurb}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
