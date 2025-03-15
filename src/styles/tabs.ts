import { cva } from "cva";

export const tabsStyles = {
    tabList: cva({ base: "flex" }),
    tab: cva({
        base: "text-sm border-b grow p-3 border-slate-200 data-[state=active]:border-sky-600 data-[state=active]:text-sky-600",
    }),
    content: cva({
        base: "",
        variants: { padding: { normal: "p-3", none: "" } },
        defaultVariants: { padding: "normal" },
    }),
};
