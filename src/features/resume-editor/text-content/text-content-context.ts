import { useResume } from "../resume-context";
import { createContext, useCallback, useContext } from "react";
import { SectionIndexContext } from "../section/section-context";
import { ContentUpdater, ResumeUpdater, SectionUpdater } from "../../../types";

export const TextContentIndexContext = createContext(-1);

export const useUpdateTextContent = () => {
    const { mutate } = useResume();
    const sectionIndex = useContext(SectionIndexContext);
    const textIndex = useContext(TextContentIndexContext);

    return useCallback(
        (updater: ContentUpdater) =>
            mutate({
                type: ResumeUpdater.Type.UpdateSection,
                index: sectionIndex,
                updater: {
                    type: SectionUpdater.Type.UpdateContent,
                    index: textIndex,
                    updater,
                },
            }),
        [mutate, sectionIndex, textIndex],
    );
};
