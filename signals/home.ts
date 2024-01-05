import { signal } from "@preact/signals";
import { CompressionOptions } from "@/lib/compress.ts";
import { getSelectedImages } from "@/signals/images.ts";

const isCompressing = signal(false);

export function isIdle() {
  return !isCompressing.value;
}

export function startCompressing() {
  isCompressing.value = true;
}

export function stopCompressing() {
  isCompressing.value = false;
}

const defaultCompressionOptions: CompressionOptions = {
  quality: 75,
  maxWidth: 4096,
  maxHeight: 4096,
  zipFile: true,
  hardwareConcurrency: (navigator.hardwareConcurrency ?? 8) / 4,
  convert: "none",
};

const compressionOptions = signal<CompressionOptions>({
  ...defaultCompressionOptions,
});

export function resetCompressionOptions() {
  compressionOptions.value = { ...defaultCompressionOptions };
}

export function getCompressionOptions() {
  const zipFile = getSelectedImages().length >= 2 &&
    compressionOptions.value.zipFile;
  return { ...compressionOptions.value, zipFile };
}

export function updateCompressionOptions(
  updateCmd: Partial<CompressionOptions>,
) {
  compressionOptions.value = { ...compressionOptions.value, ...updateCmd };
}
