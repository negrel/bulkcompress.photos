import HomeIsland from "@/islands/Home.tsx";
import PhotoIcon from "@/components/PhotoIcon.tsx";

export default function Home() {
  return (
    <>
      <header
        className="text-center mt-8"
        id="#top"
      >
        <PhotoIcon className="w-16 h-16 mx-auto" />
        <h1 className="text-xl md:text-2xl uppercase font-bold">
          Bulk photos compressor
        </h1>
      </header>
      <HomeIsland />
    </>
  );
}
