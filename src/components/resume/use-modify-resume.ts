import {useModifyResumeMutation} from "../../__generated__/graphql";
import {useCallback} from "react";
import {ResumeUpdater} from "../../types";

/**
 * Use this to modify the resume.
 * @param resumeId
 */
export const useModifyResume = (resumeId: string) => {
    const [{data, error, fetching}, sendMutation] = useModifyResumeMutation();

    return useCallback((request: ResumeUpdater) => sendMutation({
        id: resumeId,
        requestString: JSON.stringify(request)
    }), [sendMutation])
}