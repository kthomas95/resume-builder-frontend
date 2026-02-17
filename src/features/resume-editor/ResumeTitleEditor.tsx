import * as React from "react";
import { Paper, Title, Stack } from "@mantine/core";
import { TextField } from "../common/TextField";
import { useResume } from "./resume-context";
import { ResumeUpdater } from "../../types";

export const ResumeTitleEditor = () => {
    const { mutate, resume } = useResume();

    return (
        <TextField
            placeholder="Your Full Name"
            initialValue={resume.resumeData.title.name}
            commitChange={(newName) => {
                mutate({
                    type: ResumeUpdater.Type.UpdateName,
                    newName,
                });
            }}
            variant={"unstyled"}
            size="xl"
            fw={700}
        />
    );
};
