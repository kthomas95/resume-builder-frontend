import { BuildResumeRequest } from "../../graphql/graphql-types";
import { useManageResumeInfoMutation } from "../../__generated__/manage-resume-info.generated";
import { useContext, useEffect, useState } from "react";
import { TextField } from "../common/TextField";
import { resumeContext } from "./resume-context";
import { textFieldStyles } from "../../styles/textfield";

export interface EditSummaryProps extends Pick<BuildResumeRequest, "summary"> {
    id: string;
}

export const EditSummary = () => {
    const { summary, updateResume } = useContext(resumeContext);

    return (
        <div className={"flex flex-col container mx-auto"}>
            <div className={"font-semibold p-3"}>Summary</div>
            <TextField
                initialValue={summary}
                commitChange={(value) => updateResume({ summary: value })}
                className={textFieldStyles.input({ class: "h-24" })}
                asTextArea={true}
            />
        </div>
    );
};
