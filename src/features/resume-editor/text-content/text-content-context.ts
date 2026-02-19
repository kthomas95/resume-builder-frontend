import { createContext, useCallback, useContext } from "react";
import { ResumeTextUpdater, SectionItemUpdater } from "../../../types";
import { SectionItemIndexContext, useUpdateSectionItem } from "../section/SectionItemEditor";

export const TextContentIndexContext = createContext<number>(-1);

export const useUpdateTextContent = () => {
    const updateSectionItem = useUpdateSectionItem();
    const resumeTextIndex = useContext(TextContentIndexContext);

    return useCallback((updater: ResumeTextUpdater) => {
        updateSectionItem({
            type: SectionItemUpdater.Type.UpdateText,
            updater,
            index: resumeTextIndex,
        });
    }, []);
};
