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
      <div className="max-w-3xl mx-auto px-4 pb-8 mt-8">
        <dd>
          <dt className="text-lg font-bold mb-2">
            Bulk photos / images compressor
          </dt>
          <dd>
            Fast batch images compressor.
          </dd>
          <dd>
            <ol className="list-decimal pl-8">
              <li>Drag n Drop images</li>
              <li>Compress!</li>
            </ol>
          </dd>
        </dd>
        <dd>
          <dt className="text-lg font-bold my-2">
            No upload. No sign up.
          </dt>
        </dd>
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-2">
            Fast and Efficient Image Compression
          </h2>
          <p>
            Compress an unlimited amount of images online <b>in minutes</b>.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-2">What is Image Compression?</h2>
          <p>
            Image compression is a process that reduces the file size of an
            image without significantly affecting its visual quality. Our tool
            focuses on lossy compression, meaning it shrinks the file size while
            preserving the image's appearance to the human eye. You shouldn't
            see any difference if the "quality" option is greater than 70.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-2">Why Compress Images?</h2>
          <p>Users often compress images for various reasons, such as:</p>
          <ul className="list-decimal pl-8">
            <li>Meeting email attachment limits</li>
            <li>Optimizing website performance</li>
            <li>Reducing storage space</li>
          </ul>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-2">Why Use Our Service?</h2>
          <p>
            Our image compression service is free and simple to use. We leverage
            your browser's capabilities to compress images locally, ensuring a
            hassle-free experience. No need to upload files or worry about
            privacy – your data stays on your device.
          </p>
        </section>
      </div>
    </main>
  );
}

export default SetupPage;
