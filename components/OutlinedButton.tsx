import { ComponentProps } from "preact";

function OutlinedButton(props: ComponentProps<"button">) {
  props.className =
    "select-none flex nowrap items-center rounded-lg border border-current text-center align-middle font-sans text-xs font-bold uppercase transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none " +
    (props.className ?? "");

  return <button {...props} />;
}

export default OutlinedButton;
