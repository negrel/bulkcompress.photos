import { BlobWriter, Uint8ArrayReader, ZipWriter } from "@zip.js/zip.js";
import { WorkerPool } from "@/lib/worker_pool.ts";

export interface CompressionOptions {
  quality: number;
  maxWidth: number;
  maxHeight: number;
  zipFile: boolean;
  hardwareConcurrency: number;
  convertToJpeg: boolean;
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
    const filename = options.convertToJpeg
      ? replaceExtension(file.name, "jpg")
      : file.name;

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
        return zipWriter.add(filename, reader) as unknown as Promise<void>;
      } else {
        // Download images directly.
        const blob = new Blob([compressedImg], {
          type: options.convertToJpeg ? "image/jpeg" : file.type,
        });
        downloadBlob(blob, filename);
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
  const anchor = document.createElement("a");
  anchor.href = window.URL.createObjectURL(blob);
  anchor.download = filename;
  anchor.click();
}

function replaceExtension(filename: string, ext: string) {
  const splitted = filename.split(".");
  if (splitted.length === 1) {
    splitted.push(ext);
  } else if (splitted[splitted.length - 1].toLowerCase() !== "jpg") {
    splitted[splitted.length - 1] = ext;
  }

  return splitted.join(".");
}
