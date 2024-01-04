import { compress, CompressionProgress } from "@/lib/compress.ts";
import { useEffect } from "preact/hooks";
import ProgressBar from "@/components/ProgressBar.tsx";
import formatBytes from "@/lib/format_bytes.ts";
import { useComputed, useSignal } from "@preact/signals";
import { getCompressionOptions, stopCompressing } from "@/signals/home.ts";
import { WorkerPool } from "@/lib/worker_pool.ts";
import GoToTopButton from "@/islands/GoToTopButton.tsx";
import { addImages, clearImages, getSelectedImages } from "@/signals/images.ts";
import { trigger } from "@/lib/signals.ts";
import AlertList from "@/components/AlertList.tsx";
import InformationCircleIcon from "@/components/InformationCircleIcon.tsx";
import OutlinedButton from "@/components/OutlinedButton.tsx";
import Button from "@/components/Button.tsx";

function StatsSection({ total }: { total: Omit<CompressionProgress, "file"> }) {
  return (
    <section>
      <h2 className="text-lg font-bold mx-auto max-w-5xl mt-8 mb-1 pl-2">
        Stats
      </h2>
      <dl class="mx-auto grid grid-cols-1 gap-px bg-slate-900/5 dark:bg-slate-800 sm:grid-cols-3 lg:rounded-md max-w-5xl">
        <div class="px-4 py-4 sm:py-10 sm:px-6 xl:px-8 text-center">
          <dt class="text-md sm:text-lg font-medium">
            Initial size
          </dt>
          <dd class="text-lg sm:text-xl font-medium text-rose-600">
            {formatBytes(total.initialSize)}
          </dd>
        </div>
        <div class="px-4 py-4 sm:py-10 sm:px-6 xl:px-8 text-center">
          <dt class="text-md sm:text-xl font-medium">
            Compressed&nbsp;size
          </dt>
          <dd class="text-lg sm:text-xl font-medium text-green-700">
            {formatBytes(total.compressedSize)}
          </dd>
        </div>
        <div class="px-4 py-4 sm:py-10 sm:px-6 xl:px-8 text-center">
          <dt class="text-md sm:text-xl font-medium">
            Compression&nbsp;rate
          </dt>
          <dd class="text-lg sm:text-xl font-medium text-green-600">
            {total.initialSize === 0 ? "0" : Math.round(
              (1 - (total.compressedSize / total.initialSize)) * 100,
            )}%
          </dd>
        </div>
      </dl>
    </section>
  );
}

function CompressionDetails({ progress }: { progress: CompressionProgress[] }) {
  const detailsOpen = useSignal(false);

  return (
    <details
      className="cursor-pointer select-none max-w-3xl mx-auto flex mt-8 sm:mt-16"
      onToggle={(ev) =>
        detailsOpen.value = (ev.target as HTMLDetailsElement).open}
      open={detailsOpen}
    >
      <summary className="w-max mx-auto">Compression details</summary>
      {detailsOpen &&
        (
          <div class="relative flex flex-col h-full shadow-md rounded-xl bg-clip-border mt-8 overflow-auto">
            <table class="w-full text-left table-auto min-w-max">
              <thead className="bg-slate-500 text-slate-50 dark:text-slate-950 bg-slate-950 dark:bg-slate-50">
                <tr>
                  <th class="p-4 border-b border-slate-100">
                    <p class="block font-sans text-sm antialiased font-normal leading-none">
                      File&nbsp;name
                    </p>
                  </th>
                  <th class="p-4 border-b border-slate-100">
                    <p class="block font-sans text-sm antialiased font-normal leading-none">
                      Initial&nbsp;size
                    </p>
                  </th>
                  <th class="p-4 border-b border-slate-100">
                    <p class="block font-sans text-sm antialiased font-normal leading-none">
                      Compressed&nbsp;size
                    </p>
                  </th>
                  <th class="p-4 border-b border-slate-100">
                    <p class="block font-sans text-sm antialiased font-normal leading-none">
                      Compression&nbsp;rate
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {progress.reverse().map((p, index) => (
                  <tr key={index.toString()} className="text-left">
                    <td class="p-4 border-b border-slate-50">
                      <p class="block font-sans text-sm antialiased font-normal leading-normal">
                        {p.file.name}
                      </p>
                    </td>
                    <td class="p-4 border-b border-slate-50">
                      <p class="block font-sans text-sm antialiased font-normal leading-normal">
                        {formatBytes(p.initialSize)}
                      </p>
                    </td>
                    <td class="p-4 border-b border-slate-50">
                      <p class="block font-sans text-sm antialiased font-normal leading-normal">
                        {formatBytes(p.compressedSize)}
                      </p>
                    </td>
                    <td class="p-4 border-b border-slate-50">
                      <p class="block font-sans text-sm antialiased font-medium leading-normal">
                        {Math.round(
                          (1 - (p.compressedSize / p.initialSize)) * 100,
                        )}%
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </details>
  );
}

function ProgressSection({ percentage }: { percentage: number }) {
  return (
    <section className="px-4 text-center overflow-visible mt-8 sm:mt-16">
      <div className="max-w-xl mx-auto mb-8 sm:mb-12">
        <ProgressBar
          title={`Compressing${".".repeat(percentage % 3)}`}
          percentage={percentage}
        />
      </div>
      <Button
        className="px-4 py-2 my-8 mx-auto"
        onClick={stopCompressing}
      >
        Cancel
      </Button>
    </section>
  );
}

declare global {
  let Confetti: new (_: string) => void;
}

function Confettis() {
  return (
    <div
      id="confetti"
      ref={(element) => {
        if (element !== null) {
          new Confetti(element.id);
          const bounds = element.getBoundingClientRect();
          const count = 5;
          const steps = bounds.width / count;
          for (let i = 1; i < count; i++) {
            setTimeout(() => {
              const event: Event & { clientX: number; clientY: number } =
                new Event(
                  "click",
                ) as PointerEvent;
              event.clientX = i * steps;
              event.clientY = bounds.y;
              element.dispatchEvent(event);
            }, 100 * i);
          }
        }
      }}
    />
  );
}

function CompressingPage() {
  const compressionProgress = useSignal<CompressionProgress[]>([]);
  const compressionProgressPercentage = useSignal(0);
  const totalCompressionProgress = useSignal<Omit<CompressionProgress, "file">>(
    {
      initialSize: 0,
      compressedSize: 0, // Prevent division by 0.
    },
  );
  const compressionFileErrors = useSignal<File[]>([]);
  const alertList = useComputed(() =>
    compressionFileErrors.value.map((file) => file.name)
  );

  const effectCount = useSignal(0);
  useEffect(() => {
    const files = getSelectedImages();
    const compressionOptions = getCompressionOptions();

    const pool = new WorkerPool({
      workerScript: new URL("/worker_script.js", window.location.origin),
      maxTasksPerWorker: 8,
      minWorker: 1,
      maxWorker: compressionOptions.hardwareConcurrency,
    });

    (async () => {
      let compressedImageCount = 0;

      const result = await compress(
        pool,
        compressionOptions,
        files,
        (progress: CompressionProgress) => {
          totalCompressionProgress.value.initialSize += progress.initialSize;
          totalCompressionProgress.value.compressedSize +=
            progress.compressedSize;

          compressionProgress.value.push(progress);
          compressionProgressPercentage.value = Math.ceil(
            ((1 + compressedImageCount) / files.length) * 100,
          );
          compressedImageCount++;

          trigger(compressionProgress, totalCompressionProgress);
        },
      );

      // Handle failed compression
      result.forEach((promise, index) => {
        if (promise.status === "rejected") {
          const f = files[index];
          compressionFileErrors.value.push(f);
        }
      });
      trigger(compressionFileErrors);
    })();

    return () => pool.terminate();
  }, [effectCount.value]);

  return (
    <>
      <script src="/confetti.min.js" async />
      <main className="overflow-x-hidden pb-8">
        <GoToTopButton />
        {alertList.value.length > 0 && (
          <AlertList
            className="max-w-xl mt-8 mx-auto"
            icon={<InformationCircleIcon />}
            title="An error ocurred while compressing the following file(s):"
            list={alertList.value}
          >
            <div className="flex gap-4 justify-end mt-2 w-full">
              <OutlinedButton
                className="px-4 py-2"
                onClick={() => compressionFileErrors.value = []}
              >
                Ignore
              </OutlinedButton>
              <OutlinedButton
                className="px-4 py-2"
                onClick={() => {
                  clearImages();
                  addImages(...compressionFileErrors.value);
                  compressionFileErrors.value = [];
                  effectCount.value += 1;
                }}
              >
                Retry
              </OutlinedButton>
            </div>
          </AlertList>
        )}
        <div className="mx-auto mt-12 mb-6">
          <StatsSection total={totalCompressionProgress.value} />
          {compressionProgressPercentage.value >= 100
            ? (
              <>
                <Confettis />
                <Button
                  className="px-4 py-2 my-8 mx-auto"
                  onClick={() => {
                    clearImages();
                    stopCompressing();
                  }}
                >
                  Compress more images!
                </Button>
              </>
            )
            : (
              <ProgressSection
                percentage={compressionProgressPercentage.value}
              />
            )}
          <CompressionDetails progress={compressionProgress.value} />
        </div>
      </main>
    </>
  );
}

export default CompressingPage;
