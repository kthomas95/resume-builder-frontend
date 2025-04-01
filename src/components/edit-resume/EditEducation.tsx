import { useContext } from "react";
import { resumeContext } from "./resume-context";
import { TextField } from "../common/TextField";
import { buttonStyles } from "../../styles/button";
import { textFieldStyles } from "../../styles/textfield";
import { AcademicCapIcon, PencilIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "radix-ui";
import { dialogStyles } from "../../styles/dialog";
import { AreYouSureButton } from "./EditWorkExperience";

const AddUniversityRecord = () => {
    const { updateResume } = useContext(resumeContext);
    return (
        <button
            onClick={() => updateResume({ addUniversityRecord: true })}
            className={buttonStyles({ colors: "green", class: "ml-auto", size: "icon" })}
        >
            <PlusIcon className={"size-5"} />
        </button>
    );
};

export const EditEducation = () => {
    const { universityRecord, updateResume } = useContext(resumeContext);
    return (
        <div className={"flex flex-col gap-3 container mx-auto md:p-3"}>
            <div className={"flex items-center gap-3"}>
                <AcademicCapIcon className={"size-8"} />
                <h3 className={"font-extrabold text-xl all-small-caps"}>Education</h3>
                <AddUniversityRecord />
            </div>

            {universityRecord.map(({ universityName, degreeType, label, major, minors }, index) => (
                <div className="flex flex-col gap-3 p-4 relative shadow-md rounded-md" key={universityName + index}>
                    <fieldset className={textFieldStyles.fieldset({ class: "flex-wrap" })}>
                        <label className={textFieldStyles.label({ class: "w-28 text-center" })}>University</label>

                        <TextField
                            className={textFieldStyles.input({ style: "ghost", class: "grow" })}
                            initialValue={universityName}
                            commitChange={(value) =>
                                updateResume({ updateEducationRecord: { index, newUniversityName: value } })
                            }
                            placeholder={"University"}
                        />
                    </fieldset>
                    <fieldset className={textFieldStyles.fieldset()}>
                        <label className={textFieldStyles.label({ class: "w-28 text-center" })}>Years Attended</label>
                        <TextField
                            commitChange={(value) =>
                                updateResume({
                                    updateEducationRecord: { index, newLabel: value },
                                })
                            }
                            className={textFieldStyles.input({ style: "ghost", class: "grow" })}
                            initialValue={label}
                            placeholder={"Label"}
                        />
                    </fieldset>
                    <fieldset className={textFieldStyles.fieldset()}>
                        <label className={textFieldStyles.label({ class: "w-28 text-center" })}>Degree Type</label>
                        <TextField
                            className={textFieldStyles.input({ style: "ghost", class: "grow" })}
                            commitChange={(value) =>
                                updateResume({
                                    updateEducationRecord: { index, newDegreeType: value },
                                })
                            }
                            initialValue={degreeType}
                            placeholder={"Degree Type"}
                        />
                    </fieldset>
                    <fieldset className={textFieldStyles.fieldset()}>
                        <label className={textFieldStyles.label({ class: "w-28 text-center" })}>Major</label>
                        <TextField
                            className={textFieldStyles.input({
                                style: "ghost",
                                class: "grow",
                            })}
                            commitChange={(value) =>
                                updateResume({
                                    updateEducationRecord: { index, newMajor: value },
                                })
                            }
                            initialValue={major}
                            placeholder={"Major"}
                        />
                    </fieldset>
                    <div className={"flex flex-col gap-3"}>
                        <div className="flex items-center">
                            <div className={textFieldStyles.label({ class: "w-28 text-center" })}>Minors</div>
                            <button
                                onClick={() =>
                                    updateResume({
                                        updateEducationRecord: {
                                            index,
                                            newMinors: [...minors, ""],
                                        },
                                    })
                                }
                                className={buttonStyles({ colors: "green", class: "ml-auto gap-3" })}
                            >
                                <PlusIcon className={"size-5"} />
                                Add Minor
                            </button>
                        </div>
                        {minors.map((minor, minorIndex) => (
                            <div key={minorIndex} className="flex gap-6">
                                <TextField
                                    placeholder={"Minor"}
                                    className={textFieldStyles.input({ style: "ghost" })}
                                    commitChange={(value) =>
                                        updateResume({
                                            updateEducationRecord: {
                                                index,
                                                newMinors: minors.map((newMinor, newMinorIndex) =>
                                                    minorIndex === newMinorIndex ? value : newMinor,
                                                ),
                                            },
                                        })
                                    }
                                    initialValue={minor}
                                />
                                <AreYouSureButton
                                    finalizeDelete={() =>
                                        updateResume({
                                            updateEducationRecord: {
                                                index,
                                                newMinors: minors.filter((_, i) => i !== minorIndex),
                                            },
                                        })
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    <AreYouSureButton
                        label={`Remove ${universityName}`}
                        finalizeDelete={() => updateResume({ deleteUniversityRecord: index })}
                    />
                </div>
            ))}
        </div>
    );
};
