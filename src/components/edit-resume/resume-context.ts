import { useGetResumeSubscription } from "../../__generated__/get-resume.generated";
import { BuildResumeRequest, UpdateResumeInfoInput } from "../../graphql/graphql-types";
import { useManageResumeInfoMutation } from "../../__generated__/manage-resume-info.generated";
import { createContext } from "react";

interface ResumeContext extends BuildResumeRequest {
    updateResume: (request: UpdateResumeInfoInput) => void;
}

export const resumeContext = createContext<ResumeContext>(null as never);

export const useGetResume = (id: string): ResumeContext | null => {
    const resume = useGetResumeSubscription({ variables: { id } })[0].data?.resume as BuildResumeRequest | null;

    const editResume = useManageResumeInfoMutation()[1];

    if (!resume || !editResume) return null;

    return {
        ...resume,
        updateResume: (request: UpdateResumeInfoInput): void => {
            editResume({ request, id });
        },
    };
};
