import { signal } from "@preact/signals";
import { trigger } from "@/lib/signals.ts";

const images = signal<File[]>([]);

export function addImages(...files: File[]) {
  images.value.push(...files);
  trigger(images);
}

export function clearImages() {
  images.value = images.value.slice(0, 0);
  unselectedImages.value = {};
  trigger(images, unselectedImages);
}

export function getImages() {
  return images.value;
}

const unselectedImages = signal<Record<number, boolean>>({});

export function getSelectedImages() {
  return images.value.filter((_, index) => isImageSelected(index));
}

export function setSelectedImage(index: number, selected: boolean) {
  unselectedImages.value[index] = !selected;
  trigger(unselectedImages);
}

export function isImageSelected(index: number) {
  return unselectedImages.value[index] !== true;
}
