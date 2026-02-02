import { createFileRoute } from "@tanstack/react-router";
import {
    GetSummariesSubscription,
    useDeleteSummaryMutation,
    useGetSummariesSubscription,
    useNewSummaryMutation,
    useUpdateSummaryMutation,
} from "../__generated__/graphql";
import { useState } from "react";
import { textFieldStyles } from "../styles/textfield";

export const Route = createFileRoute("/summaries")({
    component: RouteComponent,
});

export const CreateNewSummaryButton = () => {
    const [response, createSummary] = useNewSummaryMutation();
    const [value, setValue] = useState("");

    return (
        <div className={"flex"}>
            <input
                className={textFieldStyles.input({ class: "rounded-r-none" })}
                type={"text"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button
                onClick={() => {
                    createSummary({ description: value }).then(() => {
                        setValue("");
                    });
                }}
                className={"rounded-l-none btn btn-primary"}
            >
                Create Summary
            </button>
        </div>
    );
};

export const StoredSummary = ({ id, summaryText, description }: GetSummariesSubscription["getSummaries"][number]) => {
    const [localSummary, setLocalSummary] = useState(summaryText);
    const [localDescription, setLocalDescription] = useState(description);
    const [response, updateSummary] = useUpdateSummaryMutation();
    const [deletedResponse, deleteSummary] = useDeleteSummaryMutation();
    return (
        <div className={"flex flex-col gap-2"}>
            <div className={"flex items-center"}>
                <input
                    type={"text"}
                    value={localDescription}
                    onBlur={(e) => {
                        updateSummary({ id, summaryText: localSummary, description: localDescription });
                    }}
                    onChange={(event) => setLocalDescription(event.target.value)}
                    className={"font-semibold text-sm italic"}
                />
                <button onClick={() => deleteSummary({ id })} className={"btn btn-error size-6"}>
                    -
                </button>
            </div>
            {localSummary !== summaryText && <div>Not Saved</div>}
            <textarea
                className={textFieldStyles.input()}
                onBlur={() => {
                    updateSummary({ id, summaryText: localSummary, description: null });
                }}
                rows={5}
                onChange={(e) => setLocalSummary(e.target.value)}
                value={localSummary}
                placeholder={"Summary"}
            />
        </div>
    );
};

export const DisplaySummaries = () => {
    const summaries = useGetSummariesSubscription()[0]?.data?.getSummaries;

    return (
        <div className={"flex flex-col gap-4"}>
            {summaries?.map((summary) => <StoredSummary key={summary.id} {...summary} />)}
        </div>
    );
};

function RouteComponent() {
    return (
        <div>
            <div className="p-3">
                <CreateNewSummaryButton />
                <hr className={"my-4"} />
                <DisplaySummaries />
            </div>
        </div>
    );
}
