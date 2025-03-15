import { cva } from "cva";

export const dialogStyles = {
    overlay: cva({ base: "fixed inset-0 bg-slate-200/20" }),
    content: cva({
        base: "fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-2xl focus:outline-none z-10",
        variants: {
            padding: {
                standard: "p-4",
                none: "",
            },
        },
        defaultVariants: {
            padding: "standard",
        },
    }),
};
