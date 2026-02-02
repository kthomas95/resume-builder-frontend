import { Link } from "@tanstack/react-router";
import { format, fromUnixTime } from "date-fns";
import * as React from "react";
import { DropdownMenu } from "radix-ui";
import { description } from "valibot";
import { buttonStyles } from "../../styles/button";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { AvailableResume, useDeleteResumeMutation, useGetAvailableResumesQuery } from "../../__generated__/graphql";

const AvailableResumeComponent = ({ description, resumeId, lastModified }: AvailableResume) => {
    const [deleteResponse, deleteResume] = useDeleteResumeMutation();
    const resumeName = description !== "" ? description : "Untitled Resume";
    return (
        <div key={resumeId} className={"flex gap-5 items-center"}>
            <Link to={"/$resumeId/edit"} params={{ resumeId }} className={"flex gap-5 items-baseline mr-auto"}>
                <div>{resumeName}</div>
                <div className={"text-sm italic"}>
                    Last Modified: {format(fromUnixTime(lastModified), "yyyy-MM-dd p")}
                </div>
            </Link>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger className={"px-4 text-right focus:outline-none"}>
                    <ChevronDownIcon className={"size-5"} />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align={"end"} className={"m-3 bg-slate-100 shadow-md rounded-md"}>
                    <DropdownMenu.DropdownMenuItem asChild>
                        <button onClick={() => deleteResume({ resumeId })} className={"btn btn-primary"}>
                            Delete {resumeName}
                        </button>
                    </DropdownMenu.DropdownMenuItem>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    );
};

export const YourAvailableResumes = () => {
    const [response] = useGetAvailableResumesQuery();
    const resumes = response?.data?.getAvailableResumes?.toSorted((x) => x.lastModified) ?? [];

    return (
        <div className={"flex flex-col gap-7"}>
            {resumes.map((resume) => (
                <AvailableResumeComponent key={resume.resumeId} {...resume} />
            ))}
        </div>
    );
};
