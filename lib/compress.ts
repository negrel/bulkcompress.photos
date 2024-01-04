import { BlobWriter, Uint8ArrayReader, ZipWriter } from "@zip.js/zip.js";
import { WorkerPool } from "@/lib/worker_pool.ts";

export interface CompressionOptions {
  quality: number;
  maxWidth: number;
  maxHeight: number;
  zipFile: boolean;
  hardwareConcurrency: number;
}

interface WorkerCompressOptions {
  quality: number;
  maxWidth: number;
  maxHeight: number;
}

export interface CompressionProgress {
  initialSize: number;
  compressedSize: number;
  file: File;
}

export async function compress(
  pool: WorkerPool,
  options: CompressionOptions,
  imageFiles: File[],
  progressCallback: (progress: CompressionProgress) => void,
): Promise<PromiseSettledResult<void>[]> {
  const promises: Promise<void>[] = [];

  const zipFileWriter = new BlobWriter();
  const zipWriter = new ZipWriter(zipFileWriter);

  for (const file of imageFiles) {
    const p = (async () => {
      const initialSize = file.size;

      const compressedImg = await pool.remoteProcedureCall<
        [File, WorkerCompressOptions],
        ArrayBuffer
      >({
        name: "compress",
        args: [file, options],
      }, { timeout: 30_000 });

      // Report progress.
      progressCallback({
        initialSize,
        compressedSize: compressedImg.byteLength,
        file,
      });

      // Add compressed image to zip.
      if (options.zipFile) {
        const reader = new Uint8ArrayReader(new Uint8Array(compressedImg));
        return zipWriter.add(file.name, reader) as unknown as Promise<void>;
      } else {
        // Download images directly.
        const blob = new Blob([compressedImg], { type: file.type });
        downloadBlob(blob, file.name);
      }
    })();

    promises.push(p);
  }

  const results = await Promise.allSettled(promises);
  if (options.zipFile) {
    const blob = await zipWriter.close();
    downloadBlob(blob, "bulkcompressphotos.zip");
  }

  pool.terminate();

  return results;
}

function downloadBlob(blob: Blob, filename: string) {
  // const anchor = document.createElement("a");
  // anchor.href = window.URL.createObjectURL(blob);
  // anchor.download = filename;
  // anchor.click();
}
