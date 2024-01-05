import BuyMeACoffeeIcon from "@/components/BuyMeACoffeeIcon.tsx";
import Button from "@/components/Button.tsx";

function BuyMeACoffee() {
  return (
    <a
      href="https://buymeacoffee.com/negrel"
      target="_blank"
    >
      <Button className="px-4 py-2">
        <BuyMeACoffeeIcon className="w-8 h-8 inline" /> Buy me a coffee
      </Button>
    </a>
  );
}

export default BuyMeACoffee;
