import { createContext } from "react";
import {
    BuildResumeRequest,
    Resume,
    ResumePropsFragment,
    UpdateResumeInfoInput,
    useGetResumeSubscription,
    useManageResumeInfoMutation,
} from "../../__generated__/graphql";

interface ResumeContext extends ResumePropsFragment {
    updateResume: (request: UpdateResumeInfoInput) => void;
    description: string;
    id: string;
}

export const resumeContext = createContext<ResumeContext>(null as never);

export const useGetResume = (id: string): ResumeContext | null => {
    const resume = useGetResumeSubscription({ variables: { id } })[0].data?.resume;

    const editResume = useManageResumeInfoMutation()[1];

    if (!resume || !editResume) return null;

    return {
        ...resume.currentResume,
        id,
        description: resume.description,
        updateResume: (request: UpdateResumeInfoInput): void => {
            editResume({ request, id });
        },
    };
};
