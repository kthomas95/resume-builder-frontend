import { cva } from "cva";

export const dialogStyles = {
    overlay: cva({ base: "fixed inset-0 bg-slate-200/20" }),
    content: cva({
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
