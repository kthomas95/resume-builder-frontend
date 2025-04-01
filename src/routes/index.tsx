import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { YourAvailableResumes } from "../components/resume/AvailableResumes";
import { CreateNewResume } from "../components/resume/CreateNewResume";
import { useAtomValue } from "jotai/react";
import { UserAtom } from "../atoms/UserAtom";

export const Route = createFileRoute("/")({
    component: HomeComponent,
});

function HomeComponent() {
    const user = useAtomValue(UserAtom);
    return (
        <div className="p-3 md:p-4 container mx-auto flex flex-col gap-4">
            {user && <h3 className={"font-bold text-lg mb-2"}>Your Resumes</h3>}
            <YourAvailableResumes />
            <hr className={"opacity-0 my-5"} />
            <CreateNewResume />
        </div>
    );
}
