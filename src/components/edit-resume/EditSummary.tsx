import { useContext, useEffect, useState } from "react";
import { TextField } from "../common/TextField";
import { resumeContext } from "./resume-context";
import { textFieldStyles } from "../../styles/textfield";
import { BuildResumeRequest, useGetSummariesSubscription, useImportSummaryMutation } from "../../__generated__/graphql";
import { DropdownMenu } from "radix-ui";

export interface EditSummaryProps extends Pick<BuildResumeRequest, "summary"> {
    id: string;
}

const ImportSummary = () => {
    const summaries = useGetSummariesSubscription()[0]?.data?.getSummaries ?? [];
    const resumeId = useContext(resumeContext).id;
    const [importResponse, importSummary] = useImportSummaryMutation();
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className={"text-sm italic"}>Import</DropdownMenu.Trigger>
            <DropdownMenu.Content className={"p-3 bg-white rounded-md shadow-md flex flex-col gap-3"}>
                {summaries.map((summary) => (
                    <DropdownMenu.DropdownMenuItem asChild>
                        <button
                            onClick={() => {
                                importSummary({ resumeId, summaryId: summary.id });
                            }}
                        >
                            {summary.description}
                        </button>
                    </DropdownMenu.DropdownMenuItem>
                ))}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export const EditSummary = () => {
    const { summary, updateResume } = useContext(resumeContext);

    return (
        <div className={"flex flex-col container mx-auto"}>
            <div className={"p-3 flex justify-between"}>
                <h4 className={"font-semibold"}>Summary</h4>
                <ImportSummary />
            </div>
            <TextField
                initialValue={summary}
                commitChange={(value) => updateResume({ summary: value })}
                className={textFieldStyles.input({ class: "h-24" })}
                asTextArea={true}
            />
        </div>
    );
};
