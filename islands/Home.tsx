import * as home from "@/signals/home.ts";
import CompressingPage from "@/islands/home/CompressingPage.tsx";
import SetupPage from "@/islands/home/SetupPage.tsx";

function Home() {
  return home.isIdle() ? <SetupPage /> : <CompressingPage />;
}

export default Home;
