import GoToTopButton from "@/islands/GoToTopButton.tsx";
import ImagesInput from "@/islands/ImagesInput.tsx";
import ImagesCompressor from "@/islands/ImagesCompressor.tsx";
import RedditIcon from "@/components/RedditIcon.tsx";
import TwitterIcon from "@/components/TwitterIcon.tsx";
import FacebookIcon from "@/components/FacebookIcon.tsx";

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
          <p>
            If you still don't trust us, you can self-host{" "}
            <b>bulkcompress.photos</b>{" "}
            as it is free and open-source. Source code is available{" "}
            <a
              href="https://github.com/negrel/bulkcompress.photos"
              className="underline"
              target="_blank"
            >
              here
            </a>
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-bold text-center">Like it? Share it!</h2>
          <ul class="flex flex-nowrap gap-6 justify-center mt-6">
            <li>
              <a
                data-share=""
                rel="noopener"
                target="_blank"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.bulkcompress.photos%2F"
                title="Please share this page via Facebook"
              >
                <FacebookIcon className="text-blue-500 w-8 h-8 hover:scale-125 transition-all" />
              </a>
            </li>
            <li class="share__item">
              <a
                data-share=""
                rel="noopener"
                target="_blank"
                href="https://twitter.com/share?text=Online%20Image%20%D0%A1ompressor&amp;url=https%3A%2F%2Fwww.bulkcompress.photos%2F"
                title="Please share this page via Twitter"
              >
                <TwitterIcon className="w-8 h-8 hover:scale-125 transition-all" />
              </a>
            </li>
            <li class="share__item">
              <a
                data-share=""
                rel="noopener"
                target="_blank"
                href="https://www.reddit.com/submit?url=https%3A%2F%2Fwww.bulkcompress.photos%2F&amp;title=Online%20Image%20%D0%A1ompressor"
                title="Please share this page via Reddit"
              >
                <RedditIcon className="text-red-500 w-10 h-10 hover:scale-125 transition-all pb-1" />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

export default SetupPage;
