import * as React from "react";
import { ActionIcon, Button, Modal, NumberInput, Paper, Stack, Title } from "@mantine/core";
import { ResumeUpdater, SettingsUpdater } from "../../types";
import { useResume } from "./resume-context";
import { number } from "valibot";
import { parseToEither } from "../common/parse-to-either";
import { useDisclosure } from "@mantine/hooks";
import { SettingsIcon } from "lucide-react";

export const ResumeSettingsEditor = () => {
    const { mutate, resume } = useResume();

    const [isOpened, { close, open }] = useDisclosure();

    const settings = resume.resumeData.settings;

    return (
        <>
            <ActionIcon onClick={open} size={"lg"} variant={"light"}>
                <SettingsIcon />
            </ActionIcon>
            <Modal onClose={close} opened={isOpened} title={"Resume Settings"}>
                <Stack gap="sm">
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
            </Modal>
        </>
    );
};
