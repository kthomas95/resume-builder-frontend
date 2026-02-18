import { BulletPointsFragment } from "../../../__generated__/graphql";
import { ActionIcon, Button, Group, NumberInput, Stack } from "@mantine/core";
import { ContentUpdater, ResumeUpdater, SectionUpdater } from "../../../types";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { TextField } from "../../common/TextField";
import * as React from "react";
import { useContext } from "react";
import { useResume } from "../resume-context";
import { SectionIndexContext, useUpdateSection } from "../section/section-context";
import { TextContentIndexContext, useUpdateTextContent } from "./text-content-context";

export const EditBulletPoints = (text: BulletPointsFragment) => {
    const textContentIndex = useContext(TextContentIndexContext);
    const sectionIndex = useContext(SectionIndexContext);
    const { mutate } = useResume();

    const updateSection = useUpdateSection();
    const updateTextContent = useUpdateTextContent();

    const bulletItems = text.bulletItems || [];
    return (
        <Stack gap="xs">
            <Group justify="space-between">
                <NumberInput
                    label="Columns"
                    value={text.columns}
                    onChange={(val) =>
                        updateSection({
                            type: SectionUpdater.Type.UpdateContent,
                            index: textContentIndex,
                            updater: {
                                type: ContentUpdater.Type.UpdateBulletPoints,
                                columns: Number(val),
                            },
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
                            updateTextContent({
                                type: ContentUpdater.Type.UpdateBulletPoints,
                                items: newItems,
                            });
                        }}
                    />
                    <ActionIcon
                        color="red"
                        variant="subtle"
                        onClick={() =>
                            updateTextContent({
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
                    updateTextContent({
                        type: ContentUpdater.Type.AddBulletPoint,
                        item: "",
                    })
                }
            >
                Add Bullet Point
            </Button>
        </Stack>
    );
};
