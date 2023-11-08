import { Header } from "../_components/organisms/Header";
export default function Homeowners() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <Header />
      <div className="flex h-[calc(100vh)] w-full flex-col items-center">
        <div className="mt-[64px] flex w-full animate-fade-in-down flex-col space-y-6 p-16">
          <h1 className="text-4xl transition-opacity">væske for homeowners</h1>
          <p className="text-lg">
            Page about explaining the way the platform works for homeowners and
            directing them to our web app
          </p>
        </div>
      </div>
    </main>
  );
}
