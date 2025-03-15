import { cva } from "cva";

export const textFieldStyles = {
    input: cva({
        base: "focus:outline-none text-sm",
        variants: {
            variant: {
                standalone: "px-3 py-1 focus:ring-sky-500",
                withIcon: "focus-within:ring-sky-500 relative",
            },
            style: {
                default: "ring rounded-md shadow-md ring-slate-300",
                ghost: "border-b border-slate-300 focus:border-sky-600",
            },
        },
        defaultVariants: {
            variant: "standalone",
            style: "default",
        },
    }),
    inputWithIcon: cva({ base: "px-3 py-1 focus:outline-none pl-8 text-slate-800 text-sm" }),
    label: cva({ base: "font-semibold all-small-caps text-sm text-slate-800" }),
    fieldset: cva({ base: "flex items-center gap-5" }),
    icon: cva({ base: "size-4 absolute inset-y-0 my-auto left-2 select-none text-slate-600" }),
};
