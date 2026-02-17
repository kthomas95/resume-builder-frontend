import * as React from "react";
import { Paper, Title, Stack } from "@mantine/core";
import { ResumeUpdater } from "../../types";
import { TextField } from "../common/TextField";

interface ResumeTitleEditorProps {
    name: string;
    onUpdate: (name: string) => void;
}

export const ResumeTitleEditor = ({ name, onUpdate }: ResumeTitleEditorProps) => {
    return (
        <Paper p="md" withBorder radius="md">
            <Stack gap="sm">
                <Title order={4}>Resume Title / Name</Title>
                <TextField
                    placeholder="Your Full Name"
                    initialValue={name}
                    commitChange={(val) => onUpdate(val)}
                    size="xl"
                    fw={700}
                />
            </Stack>
        </Paper>
    );
};
