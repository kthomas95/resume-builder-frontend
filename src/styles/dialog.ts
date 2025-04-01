import { cva } from "cva";

export const dialogStyles = {
    overlay: cva({ base: "fixed inset-0 bg-slate-200/20" }),
    content: cva({
        // base: "absolute m-auto left-1/2 top-1/2 max-h-[85dvh] w-[90dvw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-2xl focus:outline-none z-10",
        base: "absolute bg-white shadow-md top-22 inset-x-0 mx-auto max-w-max flex justify-center max-h-dvh",
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
