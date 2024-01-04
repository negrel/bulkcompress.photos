import { useSignal } from "@preact/signals";
import {
  getImages,
  getSelectedImages,
  isImageSelected,
  setSelectedImage,
} from "@/signals/images.ts";
import { trigger } from "@/lib/signals.ts";
import Spinner from "@/components/Spinner.tsx";

function ImagesGallery() {
  const loadedImages = useSignal<{ src: string; imageFile: File }[]>([]);

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const images = getImages();

      // Load up to 8 more images.
      const imagesToLoadCount = Math.min(
        loadedImages.value.length + 8,
        images.length,
      );

      // Load images async.
      for (let i = loadedImages.value.length; i < imagesToLoadCount; i++) {
        const imageFile = images[i];
        // Use placeholder while image is loading.
        loadedImages.value[i] = {
          src: "/image-placeholder.jpg",
          imageFile,
        };
        imageFile.arrayBuffer().then((arrayBuffer) => {
          const blob = new Blob([arrayBuffer]);
          loadedImages.value[i].src = URL.createObjectURL(blob);
          // Trigger rendering when image loaded.
          trigger(loadedImages);
        });
      }

      // Trigger rendering of placeholders.
      trigger(loadedImages);
    });
  };

  // Infinite scrolling using intersection observer.
  // We don't load all images at first as user can add thousands of it.
  const intersectionObserverReady = useSignal(false);
  const setupIntersectionObserver = (
    spinnerRef: HTMLDivElement | undefined,
  ) => {
    if (!spinnerRef) return;
    if (intersectionObserverReady.value) return;
    intersectionObserverReady.value = true;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(observerCallback, options);

    // Connect spinner.
    observer.observe(spinnerRef);
  };

  if (getImages().length === 0) return <></>;

  const hideSpinner = loadedImages.value.length >= getImages().length;

  return (
    <>
      <details className="text-center my-6">
        <summary className="cursor-pointer mb-4 select-none">
          {getSelectedImages().length} image(s) selected.
        </summary>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 px-4">
          {loadedImages.value.map(({ src, imageFile }, index) => (
            <div
              key={index}
              className="text-center overflow-hidden cursor-pointer"
              onClick={() =>
                setSelectedImage(
                  index,
                  !isImageSelected(index),
                )}
            >
              <img
                src={src}
                alt={imageFile.name}
                sizes="(max-width: 800px)"
                className="h-96 min-w-full object-center object-cover rounded-md"
              />
              <div className="flex flex-nowrap gap-4 justify-center">
                <input
                  type="checkbox"
                  id={index.toString()}
                  name={imageFile.name}
                  checked={isImageSelected(index)}
                />
                <label
                  for={index.toString()}
                  className="select-none block text-ellipsis overflow-hidden"
                >
                  {imageFile.name}
                </label>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`flex justify-center ${hideSpinner && "hidden"}`}
          ref={setupIntersectionObserver}
        >
          <Spinner />
        </div>
      </details>
    </>
  );
}

export default ImagesGallery;
