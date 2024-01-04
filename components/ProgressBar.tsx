import { SignalLike } from "$fresh/src/types.ts";

function ProgressBar(
  { title, percentage }: {
    title: string;
    percentage: number | SignalLike<number>;
  },
) {
  return (
    <div class="w-full">
      <div class="flex items-center justify-between gap-4 mb-2">
        <h6 class="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
          {title}
        </h6>
        <h6 class="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
          {percentage}%
        </h6>
      </div>
      <div class="flex-start flex h-2.5 w-full overflow-hidden rounded-full dark:bg-slate-800 bg-slate-200 font-sans text-xs font-medium">
        <div
          class="flex items-center justify-center h-full overflow-hidden dark:bg-slate-50 bg-slate-950 break-all rounded-full tansition ease-linear duration-100"
          style={{
            width: `${percentage}%`,
          }}
        >
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
