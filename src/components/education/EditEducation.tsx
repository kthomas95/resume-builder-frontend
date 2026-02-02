import { useContext } from "react";
import { resumeContext } from "../edit-resume/resume-context";
import { TextField } from "../common/TextField";
import { textFieldStyles } from "../../styles/textfield";
import { AcademicCapIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Dialog, DropdownMenu } from "radix-ui";
import {
    EducationPropsFragment,
    EducationSectionFragment,
    UpdateSectionsInput,
    UpdateUniversityRecordInput,
    useGetEducationComponentsSubscription,
    useInsertEducationComponentIntoResumeMutation,
} from "../../__generated__/graphql";
import { AreYouSureButton } from "../edit-resume/AreYouSureButton";

const AddUniversityRecord = () => {
    const { updateResume, id } = useContext(resumeContext);
    const [{ data }] = useGetEducationComponentsSubscription();
    const [addResponse, add] = useInsertEducationComponentIntoResumeMutation();
    const universityComponents = data?.getEducationRecords ?? [];

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className={"btn btn-primary ml-auto"}>
                <PlusIcon className={"size-5"} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className={"p-3 bg-white rounded-md shadow-md flex flex-col gap-3"}>
                <button
                    onClick={() => updateResume({ updateSections: { addUniversityRecord: true } })}
                    className={"btn btn-success"}
                >
                    New Blank Record
                </button>
                {universityComponents.map((record, index) => (
                    <button
                        className={"btn btn-primary"}
                        onClick={() => {
                            add({ resumeId: id, componentId: record.id });
                        }}
                    >
                        {record.record.universityName}
                    </button>
                ))}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export interface EditEducationProps extends EducationPropsFragment {
    updateRecord: (props: Omit<UpdateUniversityRecordInput, "index">) => void;
    deleteRecord: () => void;
}

export const EditEducationRecord = ({
    degreeType,
    label,
    major,
    minors,
    universityName,
    updateRecord,
    deleteRecord,
}: EditEducationProps) => {
    return (
        <div className="flex flex-col gap-3 p-4 relative shadow-md rounded-md">
            <fieldset className={textFieldStyles.fieldset({ class: "flex-wrap" })}>
                <label className={textFieldStyles.label({ class: "w-28 text-center" })}>University</label>

                <TextField
                    className={textFieldStyles.input({ style: "ghost", class: "grow" })}
                    initialValue={universityName}
                    commitChange={(value) => updateRecord({ newUniversityName: value })}
                    placeholder={"University"}
                />
            </fieldset>
            <fieldset className={textFieldStyles.fieldset()}>
                <label className={textFieldStyles.label({ class: "w-28 text-center" })}>Years Attended</label>
                <TextField
                    commitChange={(value) =>
                        updateRecord({
                            newLabel: value,
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
                    commitChange={(value) => updateRecord({ newDegreeType: value })}
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
                        updateRecord({
                            newMajor: value,
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
                            updateRecord({
                                newMinors: [...minors, ""],
                            })
                        }
                        className={"ml-auto gap-3 btn btn-primary"}
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
                                updateRecord({
                                    newMinors: minors.map((newMinor, newMinorIndex) =>
                                        minorIndex === newMinorIndex ? value : newMinor,
                                    ),
                                })
                            }
                            initialValue={minor}
                        />
                        <AreYouSureButton
                            finalizeDelete={() =>
                                updateRecord({
                                    newMinors: minors.filter((_, i) => i !== minorIndex),
                                })
                            }
                        />
                    </div>
                ))}
            </div>
            <AreYouSureButton label={`Remove ${universityName}`} finalizeDelete={deleteRecord} />
        </div>
    );
};

export const EditEducation = ({ title, records }: EducationSectionFragment) => {
    const { updateResume } = useContext(resumeContext);
    const updateSections = (request: UpdateSectionsInput) => updateResume({ updateSections: request });
    return (
        <div className={"flex flex-col gap-3 container mx-auto md:p-3"}>
            <div className={"flex items-center gap-3"}>
                <AcademicCapIcon className={"size-8"} />
                <h3 className={"font-extrabold text-xl all-small-caps"}>{title}</h3>
                <AddUniversityRecord />
            </div>

            {records.map((props, index) => (
                <Dialog.Root>
                    <Dialog.Trigger className={""}>{props.universityName}</Dialog.Trigger>
                    <Dialog.Content className={"dialog-content bg-white rounded-lg shadow-md"}>
                        <EditEducationRecord
                            {...props}
                            updateRecord={(props) => {
                                updateSections({ updateEducationRecord: { ...props, index } });
                            }}
                            deleteRecord={() => {
                                updateSections({ deleteUniversityRecord: index });
                            }}
                            key={index}
                        />
                    </Dialog.Content>
                </Dialog.Root>
            ))}
        </div>
    );
};
