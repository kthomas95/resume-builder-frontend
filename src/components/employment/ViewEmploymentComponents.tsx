import {
    useDeleteEmploymentComponentMutation,
    useGetEmploymentComponentsSubscription,
    useNewEmploymentComponentMutation,
    useUpdateEmploymentComponentMutation,
    WorkHistoryComponentFragment,
} from "../../__generated__/graphql";
import { useState } from "react";
import { Dialog } from "radix-ui";
import { EditWorkExperience } from "./EditWorkExperience";
import { EditWorkExperienceRecord } from "./EditWorkExperienceRecord";

export const NewEmploymentComponent = () => {
    const [response, sendMutation] = useNewEmploymentComponentMutation();
    const [description, setDescription] = useState("");

    return (
        <div className={"flex w-min mx-auto rounded-md shadow-md"}>
            <input
                type={"text"}
                className={"rounded-l-md p-2"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button
                className={"p-2 bg-sky-600 rounded-r-md"}
                onClick={async () => {
                    const response = await sendMutation({ description });
                    setDescription("");
                }}
            >
                Create
            </button>
        </div>
    );
};

const WorkHistory = ({ description, id, record }: WorkHistoryComponentFragment) => {
    const [updateResponse, updateComponent] = useUpdateEmploymentComponentMutation();
    const [deleteResponse, deleteComponent] = useDeleteEmploymentComponentMutation();
    return (
        <div>
            <Dialog.Root>
                <Dialog.Trigger className={"shadow-md rounded-md p-2"}>
                    {record.employer} - {record.title}
                </Dialog.Trigger>
                <Dialog.Content className={"dialog-content bg-white rounded-lg shadow-md"}>
                    <EditWorkExperienceRecord
                        update={(props) => {
                            updateComponent({ id, record: { index: 0, ...props } });
                        }}
                        remove={() => deleteComponent({ id })}
                        {...record}
                    />
                    <Dialog.Trigger className={"btn btn-primary mx-5 mb-5 ml-auto"}>Save</Dialog.Trigger>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    );
};

export const ViewEmploymentComponents = () => {
    const [{ data }] = useGetEmploymentComponentsSubscription();

    const employeeRecords = data?.getEmploymentRecords;
    if (employeeRecords)
        return (
            <div className={"container p-3"}>
                <h3 className="text-lg font-bold mb-5">Work Experience</h3>
                <NewEmploymentComponent />
                <div className="flex flex-col p-3 gap-3 container mx-auto">
                    {employeeRecords.map((record) => (
                        <WorkHistory key={record.id} {...record} />
                    ))}
                </div>
            </div>
        );
};
