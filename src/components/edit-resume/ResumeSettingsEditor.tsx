import * as React from "react";
import { NumberInput, Paper, Stack, Title } from "@mantine/core";
import { ResumeUpdater, SettingsUpdater } from "../../types";

interface ResumeSettingsEditorProps {
    settings: { baseFontSize: number };
    onUpdate: (size: number) => void;
}

export const ResumeSettingsEditor = ({ settings, onUpdate }: ResumeSettingsEditorProps) => {
    return (
        <Paper p="md" withBorder radius="md">
            <Stack gap="sm">
                <Title order={4}>Resume Settings</Title>
                <NumberInput
                    label="Base Font Size"
                    value={settings.baseFontSize}
                    onChange={(val) => onUpdate(Number(val))}
                    min={8}
                    max={16}
                />
            </Stack>
        </Paper>
    );
};
