import { useContext } from "react";
import { resumeContext } from "./resume-context";
import { TextField } from "../common/TextField";
import { EmploymentRecord, UpdateEmploymentRecordInput } from "../../graphql/graphql-types";
import { textFieldStyles } from "../../styles/textfield";
import { BriefcaseIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { buttonStyles } from "../../styles/button";
import { Dialog } from "radix-ui";
import { dialogStyles } from "../../styles/dialog";

interface EditWorkExperienceProps extends EmploymentRecord {
    update: (props: Omit<UpdateEmploymentRecordInput, "index">) => void;
    remove: () => void;
}

const EditWorkExperienceRecord = ({
    update,
    summary,
    yearsEmployed,
    employer,
    title,
    remove,
}: EditWorkExperienceProps) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger className={"text-left flex items-center gap-3 font-medium border-l-2 pl-4"}>
                <PencilIcon className={"size-4"} />
                {employer !== "" ? employer : <span className={"opacity-50"}>Employer</span>}
            </Dialog.Trigger>
            <Dialog.Content className={dialogStyles.content({ class: "flex flex-col gap-3" })}>
                <fieldset className={textFieldStyles.fieldset()}>
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
                <button className={buttonStyles({ colors: "red" })} onClick={remove}>
                    Remove Employment Record
                </button>
            </Dialog.Content>
        </Dialog.Root>
    );
};

const AddWorkExperienceButton = () => {
    const { updateResume } = useContext(resumeContext);
    return (
        <button
            className={buttonStyles({ colors: "green", size: "icon", class: "ml-auto" })}
            onClick={() => updateResume({ addEmploymentRecord: true })}
        >
            <PlusIcon className={"size-5"} />
        </button>
    );
};

export const EditWorkExperience = () => {
    const { employmentRecords, updateResume } = useContext(resumeContext);
    return (
        <div className={"flex flex-col gap-3 container mx-auto"}>
            <div className={"all-small-caps flex items-center gap-3 font-extrabold text-xl"}>
                <BriefcaseIcon className={"size-8"} />
                <h3>Work Experience</h3>
                <AddWorkExperienceButton />
            </div>
            {employmentRecords.map((record, index) => (
                <EditWorkExperienceRecord
                    key={index}
                    remove={() =>
                        updateResume({
                            deleteEmploymentRecord: index,
                        })
                    }
                    update={(props) =>
                        updateResume({
                            updateEmploymentRecord: { index, ...props },
                        })
                    }
                    {...record}
                />
            ))}
        </div>
    );
};
