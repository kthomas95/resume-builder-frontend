import { createContext, useCallback, useContext } from "react";
import { useResume } from "../resume-context";
import { ModifySections, ResumeUpdater, SectionUpdater } from "../../../types";

export const SectionIndexContext = createContext(-1);

export const useUpdateSection = () => {
    const sectionIndex = useContext(SectionIndexContext);
    const { mutate } = useResume();
    return useCallback(
        (updater: SectionUpdater) =>
            mutate({
                type: ResumeUpdater.Type.UpdateSections,
                updater: {
                    index: sectionIndex,
                    type: ModifySections.Type.UpdateSection,
                    updater,
                },
            }),
        [sectionIndex, mutate],
    );
};
