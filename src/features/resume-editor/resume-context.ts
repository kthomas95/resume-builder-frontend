import { createContext, useContext } from "react";
import { ResumeFragment } from "../../__generated__/graphql";
import { ResumeUpdater } from "../../types";

interface ResumeContextValue {
    resume: ResumeFragment;
    mutate: (request: ResumeUpdater) => void;
    resumeId: string;
}

export const ResumeContext = createContext<ResumeContextValue | null>(null);

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error("useResume must be used within a ResumeProvider");
    }
    return context;
};
