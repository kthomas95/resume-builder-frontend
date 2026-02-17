import * as React from "react";
import { Stack, Group, Divider, Paper, ActionIcon } from "@mantine/core";
import { Trash2 } from "lucide-react";
import { TextContentEditor } from "./TextContentEditor";
import { TextField } from "../common/TextField";
import {SectionItemUpdater} from "../../types";
import {ResumeContent_SectionItem_Fragment} from "../../__generated__/graphql";

interface SectionItemEditorProps {
    item: ResumeContent_SectionItem_Fragment["item"];
    onUpdate: (updater: SectionItemUpdater) => void;
    onRemove?: () => void;
}

export const SectionItemEditor = ({ item, onUpdate, onRemove,  }: SectionItemEditorProps) => {
    return (
        <Paper withBorder p="md" radius="md">
            <Stack gap="sm">
                <Group grow>
                    <TextField
                        label="Left Label"
                        placeholder="e.g., University Name"
                        initialValue={item.leftLabel || ""}
                        commitChange={(val) => onUpdate({
                            type: SectionItemUpdater.Type.UpdateLabels,
                            leftLabel: val
                        })}
                    />
                    <TextField
                        label="Center Label"
                        placeholder="e.g., Location"
                        initialValue={item.centerLabel || ""}
                        commitChange={(val) => onUpdate({
                            type: SectionItemUpdater.Type.UpdateLabels,
                            centerLabel: val
                        })}
                    />
                    <Group align="flex-end">
                        <TextField
                            label="Right Label"
                            placeholder="e.g., Dates"
                            initialValue={item.rightLabel || ""}
                            commitChange={(val) => onUpdate({
                                type: SectionItemUpdater.Type.UpdateLabels,
                                rightLabel: val
                            })}
                            style={{ flex: 1 }}
                        />
                        {onRemove && (
                            <ActionIcon color="red" variant="subtle" size="lg" onClick={onRemove}>
                                <Trash2 size={20} />
                            </ActionIcon>
                        )}
                    </Group>
                </Group>

                <Divider variant="dashed" />

                <Stack gap="md">
                    {item.contentItems?.map((content, index: number) => (
                        <TextContentEditor
                            key={index}
                            text={content.text}
                            onUpdate={(updater) => onUpdate({
                                type: SectionItemUpdater.Type.UpdateContent,
                                index,
                                updater
                            })}
                        />
                    ))}
                </Stack>
            </Stack>
        </Paper>
    );
};
