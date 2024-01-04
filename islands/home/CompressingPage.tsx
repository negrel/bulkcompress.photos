import { compress, CompressionProgress } from "@/lib/compress.ts";
import { useEffect } from "preact/hooks";
import ProgressBar from "@/components/ProgressBar.tsx";
import formatBytes from "@/lib/format_bytes.ts";
import { batch, useComputed, useSignal } from "@preact/signals";
import { getCompressionOptions } from "@/signals/home.ts";
import { WorkerPool } from "@/lib/worker_pool.ts";
import GoToTopButton from "@/islands/GoToTopButton.tsx";
import { addImages, clearImages, getSelectedImages } from "@/signals/images.ts";
import { trigger } from "@/lib/signals.ts";
import AlertList from "@/components/AlertList.tsx";
import InformationCircleIcon from "@/components/InformationCircleIcon.tsx";
import OutlinedButton from "@/components/OutlinedButton.tsx";

function ProgressSection(
  { percentage, progress, total }: {
    percentage: number;
    progress: CompressionProgress[];
    total: Omit<CompressionProgress, "file">;
  },
) {
  const detailsOpen = useSignal(false);

  return (
    <section className="px-4 text-center overflow-visible">
      <div className="max-w-xl mx-auto">
        <ProgressBar
          title={percentage === 100
            ? "Compression done!"
            : `Compressing${".".repeat(percentage % 3)}`}
          percentage={percentage}
        />
      </div>
      <dl class="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-3 my-8 rounded-md max-w-5xl">
        <div class="bg-white px-4 py-10 sm:px-6 xl:px-8 text-center">
          <dt class="text-lg font-medium">
            Initial size
          </dt>
          <dd class="text-xl font-medium text-rose-600">
            {formatBytes(total.initialSize)}
          </dd>
        </div>
        <div class="bg-white px-4 py-10 sm:px-6 xl:px-8 text-center">
          <dt class="text-lg font-medium">
            Compressed&nbsp;size
          </dt>
          <dd class="text-xl font-medium text-green-700">
            {formatBytes(total.compressedSize)}
          </dd>
        </div>
        <div class="bg-white px-4 py-10 sm:px-6 xl:px-8 text-center">
          <dt class="text-lg font-medium">
            Compression&nbsp;rate
          </dt>
          <dd class="text-xl font-medium text-green-600">
            {Math.round(
              (1 - (total.compressedSize / total.initialSize)) * 100,
            )}%
          </dd>
        </div>
      </dl>
      <details
        className="cursor-pointer px-4 select-none mx-auto max-w-3xl"
        onToggle={(ev) =>
          detailsOpen.value = (ev.target as HTMLDetailsElement).open}
        open={detailsOpen}
      >
        <summary>Progress report</summary>
        {detailsOpen &&
          (
            <div class="relative flex flex-col h-full shadow-md rounded-xl bg-clip-border mt-8">
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
    </section>
  );
}

function CompressingPage() {
  const compressionProgress = useSignal<CompressionProgress[]>([]);
  const compressionProgressPercentage = useSignal(0);
  const totalCompressionProgress = useSignal<Omit<CompressionProgress, "file">>(
    {
      initialSize: 1,
      compressedSize: 1, // Prevent division by 0.
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
            (compressedImageCount++ / (files.length - 1)) * 100,
          );

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
    <main className="overflow-x-hidden h-full">
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
                effectCount.value += 1;
              }}
            >
              Retry
            </OutlinedButton>
          </div>
        </AlertList>
      )}
      <div className="mx-auto mt-12 mb-6">
        <ProgressSection
          percentage={compressionProgressPercentage.value}
          progress={compressionProgress.value}
          total={totalCompressionProgress.value}
        />
      </div>
    </main>
  );
}

export default CompressingPage;
