import Button from "@/components/Button.tsx";
import { getImages, getSelectedImages } from "@/signals/images.ts";
import OutlinedButton from "@/components/OutlinedButton.tsx";
import ImagesGallery from "@/islands/ImagesGallery.tsx";
import {
  getCompressionOptions,
  resetCompressionOptions,
  startCompressing,
  updateCompressionOptions,
} from "@/signals/home.ts";

function IdleSection() {
  const compressionOptions = getCompressionOptions();

  const settingsInputs = [{
    name: "quantity",
    label: "Quality (%)",
    inputRange: {
      min: 1,
      max: 100,
      value: compressionOptions.quality,
      onInput: (value: number) => updateCompressionOptions({ quality: value }),
    },
    inputNumber: {
      min: 1,
      max: 100,
      value: compressionOptions.quality,
      onChange: (value: number) => updateCompressionOptions({ quality: value }),
    },
  }, {
    name: "max-width",
    label: "Max width (px)",
    inputNumber: {
      min: 1,
      value: compressionOptions.maxWidth,
      onChange: (value: number) =>
        updateCompressionOptions({ maxWidth: value }),
    },
  }, {
    name: "max-height",
    label: "Max height (px)",
    inputNumber: {
      min: 1,
      value: compressionOptions.maxHeight,
      onChange: (value: number) =>
        updateCompressionOptions({ maxHeight: value }),
    },
  }, {
    name: "compressAsZip",
    label: "Zip file",
    inputCheckbox: {
      checked: getSelectedImages().length >= 2 && compressionOptions.zipFile,
      onChange: (value: boolean) =>
        updateCompressionOptions({ zipFile: value }),
      disabled: getSelectedImages().length <= 1,
    },
  }];

  return (
    <div className="mx-auto text-center max-w-xl overflow-visible">
      <details className="cursor-pointer my-6 px-4 select-none">
        <summary className="mb-4">Settings</summary>
        {settingsInputs.map(
          ({ name, label, inputRange, inputNumber, inputCheckbox }) => (
            <div className="flex flex-wrap align-center justify-center gap-4 my-4">
              <label for={name}>{label}</label>
              <div className="flex flex-nowrap align-center justify-center gap-4 text-slate-950">
                {inputRange &&
                  (
                    <input
                      type="range"
                      name={name}
                      {...inputRange}
                      onInput={(ev) =>
                        inputRange.onInput(Number.parseInt(
                          (ev.target as HTMLInputElement).value,
                        ))}
                      className="flex-1"
                    />
                  )}
                {inputNumber &&
                  (
                    <input
                      type="number"
                      id={name}
                      {...inputNumber}
                      onChange={(ev) =>
                        inputNumber.onChange(Number.parseInt(
                          (ev.target as HTMLInputElement).value,
                        ))}
                      className={`px-2 rounded-md mr-1 ${
                        inputRange ? "w-16" : ""
                      }`}
                    />
                  )}
                {inputCheckbox && (
                  <input
                    type="checkbox"
                    id={name}
                    {...inputCheckbox}
                    onChange={(ev) =>
                      inputCheckbox.onChange(
                        (ev.target as HTMLInputElement).checked,
                      )}
                  />
                )}
              </div>
            </div>
          ),
        )}
        <OutlinedButton
          className="px-4 py-2 mx-auto"
          onClick={resetCompressionOptions}
        >
          Reset
        </OutlinedButton>
      </details>
      <Button
        className="px-4 py-2 mx-auto mb-8"
        disabled={getImages().length === 0}
        onClick={startCompressing}
      >
        Start compression
      </Button>
    </div>
  );
}

function ImagesCompressor() {
  return (
    <>
      <IdleSection />
      <ImagesGallery />
    </>
  );
}

export default ImagesCompressor;
