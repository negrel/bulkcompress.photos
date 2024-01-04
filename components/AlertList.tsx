import { ComponentChildren } from "preact";

function AlertList(
  { icon, title, list, className, children }: {
    icon?: ComponentChildren;
    title: string;
    list: string[];
    className?: string;
    children?: ComponentChildren;
  },
) {
  return (
    <div
      role="alert"
      class={`relative flex w-full px-4 py-4 text-base rounded-lg font-regular bg-gradient-to-tr from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-500 dark:text-slate-950 text-slate-50 ${
        className ? className : ""
      }`}
      style="opacity: 1;"
    >
      <div class="shrink-0">
        {icon}
      </div>
      <div className="w-full">
        <div class="ml-3 mr-12">
          <p class="block font-sans text-base antialiased font-medium leading-relaxed text-inherit">
            {title}
          </p>
          <ul class="mt-2 ml-2 list-disc list-inside">
            {list.map((el) => <li>{el}</li>)}
          </ul>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AlertList;
