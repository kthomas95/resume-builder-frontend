import { useContext, useState } from "react";
import { resumeContext } from "./resume-context";
import { TextField } from "../common/TextField";
import { textFieldStyles } from "../../styles/textfield";
import { BriefcaseIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { buttonStyles } from "../../styles/button";
import { Dialog } from "radix-ui";
import { dialogStyles } from "../../styles/dialog";
import { EmploymentRecord, UpdateEmploymentRecordInput } from "../../__generated__/graphql";

interface EditWorkExperienceProps extends EmploymentRecord {
    update: (props: Omit<UpdateEmploymentRecordInput, "index">) => void;
    remove: () => void;
}

export const AreYouSureButton = ({ finalizeDelete, label }: { finalizeDelete: () => void; label?: string }) => {
    const [areYouSureDelete, setAreYouSureDelete] = useState<boolean>(false);
    const handleDelete = () => {};
    return (
        <div className={"flex gap-2 justify-end"}>
            <button
                className={buttonStyles({ colors: "red" })}
                onClick={() => {
                    if (!areYouSureDelete) {
                        setAreYouSureDelete(true);
                    } else {
                        finalizeDelete();
                    }
                }}
            >
                {areYouSureDelete ? "Confirm Deletion" : (label ?? "Remove")}
            </button>
            {areYouSureDelete && (
                <button onClick={() => setAreYouSureDelete(false)} className={buttonStyles({ colors: "outline" })}>
                    Don't Delete
                </button>
            )}
        </div>
    );
};

const EditWorkExperienceRecord = ({
    update,
    summary,
    yearsEmployed,
    employer,
    title,
    remove,
}: EditWorkExperienceProps) => {
    const [areYouSureDelete, setAreYouSureDelete] = useState(false);
    return (
        // <Dialog.Root>
        //     <Dialog.Trigger className={"text-left flex items-center gap-3 font-medium border-l-2 pl-4"}>
        //         <PencilIcon className={"size-4"} />
        //         {employer !== "" ? employer : <span className={"opacity-50"}>Employer</span>}
        //     </Dialog.Trigger>
        <div className={"flex flex-col gap-3 bg-white/50 p-5 rounded-md shadow-md"}>
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
        <div className={"flex flex-col container gap-3 mx-auto"}>
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
