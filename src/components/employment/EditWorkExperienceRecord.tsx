import { EmploymentPropsFragment, UpdateEmploymentRecordInput } from "../../__generated__/graphql";
import { useState } from "react";
import { textFieldStyles } from "../../styles/textfield";
import { TextField } from "../common/TextField";
import { AreYouSureButton } from "../edit-resume/AreYouSureButton";

interface EditWorkExperienceProps extends EmploymentPropsFragment {
    update: (props: Omit<UpdateEmploymentRecordInput, "index">) => void;
    remove: () => void;
}

export const EditWorkExperienceRecord = ({
    update,
    summary,
    yearsEmployed,
    employer,
    title,
    remove,
}: EditWorkExperienceProps) => {
    return (
        <div className={"flex flex-col gap-3 p-5"}>
            <fieldset className={textFieldStyles.fieldset({ class: "flex-wrap" })}>
                <label className={textFieldStyles.label({ class: "w-28 text-center" })}>Employer</label>
                <TextField
                    className={textFieldStyles.input({ style: "ghost", class: "grow" })}
                    placeholder={"Employer"}
                    commitChange={(value) =>
                        update({
                            newEmployer: value,
                        })
                    }
                    initialValue={employer}
                />
            </fieldset>
            <fieldset className={textFieldStyles.fieldset()}>
                <label className={textFieldStyles.label({ class: "w-28 text-center" })}>Title</label>
                <TextField
                    className={textFieldStyles.input({ style: "ghost", class: "grow" })}
                    placeholder={"Title"}
                    commitChange={(value) =>
                        update({
                            newTitle: value,
                        })
                    }
                    initialValue={title}
                />
            </fieldset>
            <fieldset className={textFieldStyles.fieldset()}>
                <label className={textFieldStyles.label({ class: "w-28 text-center" })}>Years Employed</label>
                <TextField
                    className={textFieldStyles.input({ style: "ghost", class: "grow" })}
                    placeholder={"Years Employed"}
                    commitChange={(value) =>
                        update({
                            newYearsWorked: value,
                        })
                    }
                    initialValue={yearsEmployed}
                />
            </fieldset>
            <TextField
                commitChange={(value) =>
                    update({
                        newSummary: value,
                    })
                }
                placeholder={"Enter your employment summary here.\n- Use dashes to render bullet points."}
                asTextArea={true}
                className={textFieldStyles.input({ style: "default", class: "h-32" })}
                initialValue={summary}
            />
            <AreYouSureButton finalizeDelete={remove} label={`Remove ${employer}`} />
        </div>
    );
};
