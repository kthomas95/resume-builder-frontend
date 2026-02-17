import * as React from "react";
import { Stack, ActionIcon, Group, Button, NumberInput } from "@mantine/core";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { TextField } from "../../common/TextField";
import {
    BulletPointsFragment,
    ColumnsFragment,
    ParagraphFragment,
    ResumeTextFragment,
} from "../../../__generated__/graphql";
import { ContentUpdater } from "../../../types";

interface TextContentEditorProps {
    text: ResumeTextFragment; // Using any for now to simplify with GraphQL fragments
    onUpdate: (updater: ContentUpdater) => void;
}

export const TextContentEditor = ({ text, onUpdate }: TextContentEditorProps) => {
    if (text.__typename === "Paragraph") {
        return (
            <TextField
                label="Paragraph"
                initialValue={text.text}
                commitChange={(val) =>
                    onUpdate({
                        type: ContentUpdater.Type.UpdateParagraph,
                        text: val,
                    })
                }
                asTextArea={true}
            />
        );
    }

    if (text.__typename === "BulletPoints") {
        const bulletItems = text.bulletItems || [];
        return (
            <Stack gap="xs">
                <Group justify="space-between">
                    <NumberInput
                        label="Columns"
                        value={text.columns}
                        onChange={(val) =>
                            onUpdate({
                                type: ContentUpdater.Type.UpdateBulletPoints,
                                columns: Number(val),
                            })
                        }
                        min={1}
                        max={3}
                        style={{ width: 80 }}
                    />
                </Group>
                {bulletItems.map((item: string, index: number) => (
                    <Group key={index} align="flex-start" gap="xs">
                        <ActionIcon variant="subtle" color="gray">
                            <GripVertical size={14} />
                        </ActionIcon>
                        <TextField
                            style={{ flex: 1 }}
                            initialValue={item}
                            commitChange={(val) => {
                                const newItems = [...bulletItems];
                                newItems[index] = val;
                                onUpdate({
                                    type: ContentUpdater.Type.UpdateBulletPoints,
                                    items: newItems,
                                });
                            }}
                        />
                        <ActionIcon
                            color="red"
                            variant="subtle"
                            onClick={() =>
                                onUpdate({
                                    type: ContentUpdater.Type.RemoveBulletPoint,
                                    index,
                                })
                            }
                        >
                            <Trash2 size={14} />
                        </ActionIcon>
                    </Group>
                ))}
                <Button
                    variant="subtle"
                    size="xs"
                    leftSection={<Plus size={14} />}
                    onClick={() =>
                        onUpdate({
                            type: ContentUpdater.Type.AddBulletPoint,
                            item: "",
                        })
                    }
                >
                    Add Bullet Point
                </Button>
            </Stack>
        );
    }

    if (text.__typename === "Columns") {
        const columnItems = text.columnItems || [];
        return (
            <Group grow align="flex-start">
                {columnItems.map((col: any, colIndex: number) => (
                    <Stack key={colIndex} gap="xs">
                        <TextField
                            label="Column Label"
                            initialValue={col.label}
                            commitChange={(val) => {
                                const newColumns = [...columnItems];
                                newColumns[colIndex] = { ...col, label: val };
                                onUpdate({
                                    type: ContentUpdater.Type.UpdateColumns,
                                    items: newColumns,
                                });
                            }}
                        />
                        {col.items?.map((item: string, itemIndex: number) => (
                            <TextField
                                key={itemIndex}
                                initialValue={item}
                                commitChange={(val) => {
                                    const newItems = [...col.items];
                                    newItems[itemIndex] = val;
                                    const newColumns = [...columnItems];
                                    newColumns[colIndex] = { ...col, items: newItems };
                                    onUpdate({
                                        type: ContentUpdater.Type.UpdateColumns,
                                        items: newColumns,
                                    });
                                }}
                            />
                        ))}
                    </Stack>
                ))}
            </Group>
        );
    }

    return null;
};
