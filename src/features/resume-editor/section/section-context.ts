import { createContext, useCallback, useContext } from "react";
import { useResume } from "../resume-context";
import { ResumeUpdater, SectionUpdater } from "../../../types";

export const SectionIndexContext = createContext(-1);

export const useUpdateSection = () => {
    const sectionIndex = useContext(SectionIndexContext);
    const { mutate } = useResume();
    return useCallback(
        (updater: SectionUpdater) =>
            mutate({
                type: ResumeUpdater.Type.UpdateSection,
                index: sectionIndex,
                updater,
            }),
        [sectionIndex, mutate],
    );
};
