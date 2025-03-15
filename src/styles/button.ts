import { cva, VariantProps } from "cva";

export const buttonStyles = cva({
    base: "flex items-center align-center justify-center shadow-md font-bold focus:ring-4 focus:outline-none text-sm",
    variants: {
        colors: {
            primary: "bg-sky-500 hover:bg-sky-600 text-white ring-sky-200",
            red: "bg-rose-600 hover:bg-rose-700 ring-rose-200 text-white",
            outline: "border border-slate-400 hover:bg-slate-300/20 ring-slate-200",
            green: "bg-emerald-600 hover:bg-emerald-700 ring-emerald-500/30 text-white",
            none: "",
        },
        size: {
            base: "py-1 px-2 rounded-md",
            icon: "size-7 rounded-full",
        },
    },
    defaultVariants: {
        size: "base",
        colors: "primary",
    },
});

export type ButtonProps = VariantProps<typeof buttonStyles>;
