import { cva } from "cva";

export const slider = {
    root: cva({ base: "h-5 relative flex w-full touch-none select-none items-center" }),
    track: cva({ base: "relative h-[3px] grow rounded-full bg-black" }),
    range: cva({ base: "absolute h-full rounded-full bg-slate-400" }),
    thumb: cva({ base: "block size-5 rounded-[10px] bg-slate-100 shadow-lg " }),
};
