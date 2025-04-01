import { createContext } from "react";
import {
    BuildResumeRequest,
    Resume,
    UpdateResumeInfoInput,
    useGetResumeSubscription,
    useManageResumeInfoMutation,
} from "../../__generated__/graphql";

interface ResumeContext extends BuildResumeRequest {
    description: string;
    updateResume: (request: UpdateResumeInfoInput) => void;
}

export const resumeContext = createContext<ResumeContext>(null as never);

export const useGetResume = (id: string): ResumeContext | null => {
    const resume = useGetResumeSubscription({ variables: { id } })[0].data?.resume as Resume | null;

    const editResume = useManageResumeInfoMutation()[1];

    if (!resume || !editResume) return null;

    return {
        ...resume.currentResume,
        description: resume.description,
        updateResume: (request: UpdateResumeInfoInput): void => {
            editResume({ request, id });
        },
    };
};
