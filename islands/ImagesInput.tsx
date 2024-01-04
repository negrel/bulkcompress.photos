import { batch, useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";
import { addImages, clearImages } from "@/signals/images.ts";
import AlertList from "@/components/AlertList.tsx";
import InformationCircleIcon from "@/components/InformationCircleIcon.tsx";
import Button from "@/components/Button.tsx";
import OutlinedButton from "@/components/OutlinedButton.tsx";

function ImagesDrop({ acceptedFileType }: { acceptedFileType: string[] }) {
  const alertList = useSignal<string[]>([]);
  const dragOver = useSignal(false);

  const filterNonAcceptedFiles = (...files: File[]) =>
    batch(() => {
      const filtered = [];
      for (const f of files) {
        if (acceptedFileType.includes(f.type)) {
          filtered.push(f);
        } else {
          alertList.value.push(
            `${f.name} (${f.type === "" ? "unknown file type" : f.type})`,
          );
        }
      }

      return filtered;
    });

  const handleDrop = (
    ev: Event & { dataTransfer: DataTransfer },
  ) => {
    ev.stopPropagation();
    ev.preventDefault();

    // Drag over done.
    dragOver.value = false;

    let files: File[] = [];
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      files = [...ev.dataTransfer.items].reduce<File[]>(
        (acc, item) => {
          if (item.kind !== "file") return acc;
          acc.push(item.getAsFile() as File);
          return acc;
        },
        [],
      );
    } else {
      files = [...ev.dataTransfer.files];
    }

    addImages(...filterNonAcceptedFiles(...files));
  };

  return (
    <>
      <div className="px-4">
        <div
          className={`mx-auto max-w-xl px-4 py-12 rounded-lg border-2 border-dashed border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            dragOver.value ? "border-gray-400" : ""
          }`}
          onDragOver={(ev) => ev.preventDefault()}
          onDragEnter={() => dragOver.value = true}
          onDragLeave={() => dragOver.value = false}
          // deno-lint-ignore no-explicit-any
          onDrop={handleDrop as unknown as any}
        >
          <div className="pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1"
              className="w-12 h-12 stroke-slate-500 mx-auto"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>
            <span className="text-lg">
              Drag your images here
            </span>
          </div>
        </div>
      </div>
      {alertList.value.length > 0 && (
        <AlertList
          className="max-w-xl mt-8 mx-auto"
          icon={<InformationCircleIcon />}
          title="Some files are unsupported and won't be compressed:"
          list={alertList.value}
        />
      )}
    </>
  );
}

function InputImages({ accept }: { accept: string[] }) {
  const inputRef = useRef<HTMLElement>();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (ev: Event) => {
    const target = ev.target as HTMLInputElement;

    if (target.files) addImages(...target.files);
  };

  return (
    <Button onClick={handleClick} className="px-4 py-2">
      Select files
      <input
        type="file"
        id="input-photos"
        multiple={true}
        onChange={handleChange}
        className="hidden"
        accept={accept.join(", ")}
        /* @ts-ignore */
        ref={inputRef}
      />
    </Button>
  );
}

function ImagesInput() {
  const acceptedFileType = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/bmp",
    "image/tiff",
    "image/vnd.microsoft.icon",
  ];

  return (
    <>
      <div className="flex justify-center gap-4 mb-8">
        <InputImages accept={acceptedFileType} />
        <OutlinedButton className="px-4 py-2" onClick={clearImages}>
          Clear files
        </OutlinedButton>
      </div>
      <ImagesDrop acceptedFileType={acceptedFileType} />
    </>
  );
}

export default ImagesInput;
