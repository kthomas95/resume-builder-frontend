export const joinStrings = (className: (string | undefined | null | false)[]): string =>
    className.filter((x) => x).join(" ");
