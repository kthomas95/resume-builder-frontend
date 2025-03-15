import { useContext, useState } from "react";
import { useManageResumeInfoMutation } from "../../__generated__/manage-resume-info.generated";
import { resumeContext } from "./resume-context";
import { TextField } from "../common/TextField";

export interface EditNameProps {
    name: string;
    id: string;
}

export const EditName = () => {
    const { updateResume, name } = useContext(resumeContext);

    return (
        <TextField
            className={"text-3xl font-bold text-center italic my-6 focus:outline-none"}
            commitChange={(value) => updateResume({ name: value })}
            placeholder={"Your Name"}
            initialValue={name}
        />
    );
};
