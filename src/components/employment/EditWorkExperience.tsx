import { useContext } from "react";
import { resumeContext } from "../edit-resume/resume-context";
import { BriefcaseIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
    EmploymentSectionFragment,
    useGetEmploymentComponentsSubscription,
    useInsertEmploymentComponentIntoResumeMutation,
} from "../../__generated__/graphql";
import { EditWorkExperienceRecord } from "./EditWorkExperienceRecord";
import { DropdownMenu } from "radix-ui";

const AddWorkExperienceButton = () => {
    const { updateResume, id } = useContext(resumeContext);
    const [{ data }] = useGetEmploymentComponentsSubscription();
    const [response, insertToResume] = useInsertEmploymentComponentIntoResumeMutation();

    const workComponents = data?.getEmploymentRecords ?? [];

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className={"btn btn-primary ml-auto"}>
                <PlusIcon className={"size-5"} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className={"p-3 bg-white rounded-md shadow-md flex flex-col gap-3 z-50"}>
                <button
                    onClick={() => updateResume({ updateSections: { addEmploymentRecord: true } })}
                    className={"btn btn-success"}
                >
                    New Blank Record
                </button>
                {workComponents.map((record, index) => (
                    <button
                        className={"btn btn-primary"}
                        onClick={() => {
                            insertToResume({ componentId: record.id, resumeId: id });
                        }}
                    >
                        {record.description}
                    </button>
                ))}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export const EditWorkExperience = ({ title, records }: EmploymentSectionFragment) => {
    const { updateResume } = useContext(resumeContext);
    return (
        <div className={"flex flex-col container gap-3 mx-auto"}>
            <div className={"all-small-caps flex items-center gap-3 font-extrabold text-xl"}>
                <BriefcaseIcon className={"size-8"} />
                <h3>{title}</h3>
                <AddWorkExperienceButton />
            </div>
            {records.map((record, index) => (
                <EditWorkExperienceRecord
                    key={index}
                    remove={() =>
                        updateResume({
                            updateSections: {
                                deleteEmploymentRecord: index,
                            },
                        })
                    }
                    update={(props) =>
                        updateResume({
                            updateSections: {
                                updateEmploymentRecord: { index, ...props },
                            },
                        })
                    }
                    {...record}
                />
            ))}
        </div>
    );
};
