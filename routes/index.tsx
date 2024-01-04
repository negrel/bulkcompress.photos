import HomeIsland from "@/islands/Home.tsx";

export default function Home() {
  return (
    <section className="text-slate-950 dark:text-slate-50">
      <header className="text-center mt-8" id="#top">
        <h1 className="text-xl md:text-2xl inline uppercase font-bold">
          Bulk photos compressor
        </h1>
      </header>
      <HomeIsland />
    </section>
  );
}
