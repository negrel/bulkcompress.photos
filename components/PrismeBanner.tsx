import Button from "@/components/Button.tsx";

function PrismeBanner() {
  return (
    <div
      id="prisme-banner"
      className="fixed bottom-2 left-1/2 py-2 px-4 -translate-x-1/2 z-50 w-max max-w-full data-[closed=true]:hidden"
      data-closed="true"
    >
      <div className="bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50 p-4 space-y-2 rounded shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a href="https://www.prismeanalytics.com">
            <img
              loading="lazy"
              src="https://www.prismeanalytics.com/logo.jpg"
              className="w-16"
            />
          </a>
          <p>
            This website uses{" "}
            <a href="https://www.prismeanalytics.com" className="underline">
              Prisme Analytics
            </a>
            , a <span className="font-bold">privacy-friendly</span>{" "}
            analytics service, to analyze its traffic.
          </p>
          <Button className="prisme-banner-close-btn w-6 h-6 border-none hover:bg-transparent hover:text-foreground hidden md:block">
            X
          </Button>
        </div>
        <Button className="prisme-banner-close-btn p-2 justify-center border-none hover:bg-transparent hover:text-foreground md:hidden w-full">
          Ok
        </Button>
        <script src="/prisme-banner.js" defer></script>
      </div>
    </div>
  );
}

export default PrismeBanner;
