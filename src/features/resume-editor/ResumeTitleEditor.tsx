import * as React from "react";
import { Paper, Title, Stack } from "@mantine/core";
import { TextField } from "../common/TextField";
import { useResume } from "./resume-context";
import { ResumeUpdater } from "../../types";

export const ResumeTitleEditor = () => {
    const { mutate, resume } = useResume();

    return (
        <Paper p="md" withBorder radius="md">
            <Stack gap="sm">
                <Title order={4}>Resume Title / Name</Title>
                <TextField
                    placeholder="Your Full Name"
                    initialValue={resume.resumeData.title.name}
                    commitChange={(newName) => {
                        mutate({
                            type: ResumeUpdater.Type.UpdateName,
                            newName,
                        });
                    }}
                    size="xl"
                    fw={700}
                />
            </Stack>
        </Paper>
    );
};
