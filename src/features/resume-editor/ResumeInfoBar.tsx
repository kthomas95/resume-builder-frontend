import { useResume } from "./resume-context";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { Download } from "lucide-react";
import * as React from "react";
import { ResumeSettingsEditor } from "./ResumeSettingsEditor";

export const ResumeInfoBar = () => {
    const { resume } = useResume();
    return (
        <Group justify="space-between" align="flex-start">
            <Stack gap={0}>
                <Title order={3} size={"h4"}>
                    {resume.title}
                </Title>
                <Text c="dimmed">{resume.description !== "" ? resume.description : "No Description"}</Text>
            </Stack>
            <Group>
                <ResumeSettingsEditor />
                <Button
                    component="a"
                    href={`${import.meta.env.VITE_BUILD_RESUME_URL}${resume.id}`}
                    target="_blank"
                    variant="filled"
                    leftSection={<Download size={20} />}
                >
                    Preview PDF
                </Button>
            </Group>
        </Group>
    );
};
