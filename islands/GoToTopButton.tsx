import UpArrowIcon from "@/components/UpArrowIcon.tsx";
import Button from "@/components/Button.tsx";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

function GoToTopButton() {
  const hidden = useSignal(true);

  useEffect(() => {
    const listener = () => {
      hidden.value = window.scrollY < window.innerHeight;
    };
    document.addEventListener("scroll", listener);

    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <a href="#top">
      <Button
        className={`fixed bottom-4 right-4 p-4 ${hidden.value ? "hidden" : ""}`}
      >
        <UpArrowIcon className="w-5 h-5" />
      </Button>
    </a>
  );
}

export default GoToTopButton;
