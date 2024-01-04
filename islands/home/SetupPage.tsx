import GoToTopButton from "@/islands/GoToTopButton.tsx";
import ImagesInput from "@/islands/ImagesInput.tsx";
import ImagesCompressor from "@/islands/ImagesCompressor.tsx";

function SetupPage() {
  return (
    <main className="overflow-x-hidden h-full">
      <GoToTopButton />
      <div className="mx-auto mt-12 mb-6">
        <ImagesInput />
      </div>
      <ImagesCompressor />
    </main>
  );
}

export default SetupPage;
