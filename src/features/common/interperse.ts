import { purry } from "remeda";

// 1. Define the implementation
function intersperseImplementation<T>(array: T[], separator: T): T[] {
    return array.flatMap((item, index) => (index === array.length - 1 ? [item] : [item, separator]));
}

// 2. Wrap it with `purry` to make it data-last and pipable
export function intersperse<T>(array: T[], separator: T): T[];
export function intersperse<T>(separator: T): (array: T[]) => T[];

export function intersperse(...args: readonly unknown[]) {
    return purry(intersperseImplementation, args);
}
