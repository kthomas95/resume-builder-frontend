import { createContext, useContext } from "react";
import { useGetResumeSubscription } from "../../__generated__/graphql";
import { useModifyResume } from "../resume/use-modify-resume";
import { ResumeUpdater } from "../../types";

type ResumeData = NonNullable<ReturnType<typeof useGetResumeSubscription>[0]['data']>['subscribeToResume'];

interface ResumeContextValue {
    resume: ResumeData;
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
