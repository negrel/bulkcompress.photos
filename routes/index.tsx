import HomeIsland from "@/islands/Home.tsx";
import PhotoIcon from "@/components/PhotoIcon.tsx";
import BuyMeACoffee from "@/components/BuyMeACoffee.tsx";

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
      <footer className="absolute bottom-0 w-full p-4 dark:bg-slate-800 bg-slate-200">
        <nav className="flex flex-col sm:flex-row flex-wrap justify-end items-center gap-2 sm:gap-4 text-sm">
          <BuyMeACoffee />
          <a
            href="https://github.com/negrel/bulkcompress.photos"
            className="underline"
            target="_blank"
          >
            Source code
          </a>
          <a
            href="https://www.negrel.dev/feedback/?project=bulkcompress.photos"
            className="underline"
          >
            Feedback
          </a>
          <a
            href="https://www.negrel.dev"
            className="underline"
            target="_blank"
            rel="author"
          >
            Made with <span className="text-red-500">❤️</span>{" "}
            by Alexandre Negrel
          </a>
        </nav>
      </footer>
    </>
  );
}
