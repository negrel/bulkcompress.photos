import { ComponentProps } from "preact";

function Button(props: ComponentProps<"button">) {
  props.className =
    "select-none flex nowrap items-center gap-2 cursor-pointer rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-500 text-center align-middle font-sans text-xs font-bold uppercase text-slate-50 dark:text-slate-950 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none " +
    (props.className ?? "");

  return <button {...props} />;
}

export default Button;
