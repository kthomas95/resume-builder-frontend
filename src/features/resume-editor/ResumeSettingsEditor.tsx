import * as React from "react";
import { NumberInput, Paper, Stack, Title } from "@mantine/core";
import { ResumeUpdater, SettingsUpdater } from "../../types";
import { useResume } from "./resume-context";
import { number } from "valibot";
import { parseToEither } from "../common/parse-to-either";

export const ResumeSettingsEditor = () => {
    const { mutate, resume } = useResume();

    const settings = resume.resumeData.settings;

    return (
        <Paper p="md" withBorder radius="md">
            <Stack gap="sm">
                <Title order={4}>Resume Settings</Title>
                <NumberInput
                    label="Base Font Size"
                    value={settings.baseFontSize}
                    onChange={(newFontSizeString) => {
                        parseToEither(number(), newFontSizeString).ifRight((size) => {
                            mutate({
                                type: ResumeUpdater.Type.UpdateSettings,
                                updater: {
                                    type: SettingsUpdater.Type.UpdateBaseFontSize,
                                    size,
                                },
                            });
                        });
                    }}
                    min={8}
                    max={16}
                />
            </Stack>
        </Paper>
    );
};
