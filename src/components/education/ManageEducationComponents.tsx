import {
    useDeleteEducationRecordMutation,
    useGetEducationComponentsSubscription,
    useNewEducationComponentMutation,
    useUpdateEducationComponentMutation,
} from "../../__generated__/graphql";
import { useContext, useState } from "react";
import { EditEducation, EditEducationRecord } from "./EditEducation";
import { resumeContext } from "../edit-resume/resume-context";
import { Dialog } from "radix-ui";

export const CreateNewEducationComponent = () => {
    const [response, sendMutation] = useNewEducationComponentMutation();
    const [description, setDescription] = useState("");
    return (
        <div>
            <input type={"text"} value={description} onChange={(e) => setDescription(e.target.value)} />
            <button
                onClick={() => {
                    sendMutation({ description });
                    setDescription("");
                }}
            >
                Create
            </button>
        </div>
    );
};

export const ManageEducationComponents = () => {
    const [{ data }] = useGetEducationComponentsSubscription();
    const records = data?.getEducationRecords ?? [];

    const [response, update] = useUpdateEducationComponentMutation();
    const [deleteResponse, deleteComponent] = useDeleteEducationRecordMutation();

    return (
        <div>
            <CreateNewEducationComponent />
            {records.map((x) => (
                <Dialog.Root>
                    <Dialog.Trigger className={"shadow-md rounded-md p-2"}>{x.record.universityName}</Dialog.Trigger>
                    <Dialog.Content className={"dialog-content bg-white rounded-lg shadow-md"}>
                        <EditEducationRecord
                            {...x.record}
                            updateRecord={(props) => {
                                update({ record: { ...props, index: 0 }, id: x.id });
                            }}
                            deleteRecord={() => {
                                deleteComponent({ id: x.id });
                            }}
                        />
                    </Dialog.Content>
                </Dialog.Root>
            ))}
        </div>
    );
};
