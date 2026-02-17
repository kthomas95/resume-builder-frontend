import * as React from "react";
import { ActionIcon, Button, Group, Menu, Paper, Stack, Title } from "@mantine/core";
import { MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { SectionItemEditor } from "./SectionItemEditor";
import { TextContentEditor } from "../text-content/TextContentEditor";
import { ContentUpdater, ResumeContent, ResumeText, SectionUpdater } from "../../../types";
import { ResumeContent_SectionItem_Fragment, ResumeContent_TextContent_Fragment } from "../../../__generated__/graphql";
import Type = ContentUpdater.Type;

interface GenericSectionProps {
    title: string;
    contentItems: (ResumeContent_SectionItem_Fragment | ResumeContent_TextContent_Fragment)[];
    onUpdate: (updater: SectionUpdater) => void;
    onRemove: () => void;
}

export const GenericSection = ({ title, contentItems, onUpdate, onRemove }: GenericSectionProps) => {
    return (
        <Paper p="md" withBorder radius="md">
            <Stack gap="md">
                <Group justify="space-between">
                    <Title order={3}>{title}</Title>
                    <Group>
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <ActionIcon variant="subtle">
                                    <MoreHorizontal size={20} />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item color="red" leftSection={<Trash2 size={14} />} onClick={onRemove}>
                                    Remove Section
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>

                <Stack gap="xl">
                    {contentItems.map((content, index) => {
                        if (content.__typename === "SectionItem") {
                            return (
                                <SectionItemEditor
                                    key={index}
                                    item={content.item}
                                    onUpdate={(updater) =>
                                        onUpdate({
                                            type: SectionUpdater.Type.UpdateContent,
                                            index,
                                            updater: {
                                                type: Type.UpdateSectionItem,
                                                updater,
                                            },
                                        })
                                    }
                                    onRemove={() =>
                                        onUpdate({
                                            type: SectionUpdater.Type.RemoveContent,
                                            index,
                                        })
                                    }
                                />
                            );
                        }
                        if (content.__typename === "TextContent") {
                            return (
                                <TextContentEditor
                                    key={index}
                                    text={content.text}
                                    onUpdate={(updater) =>
                                        onUpdate({
                                            type: SectionUpdater.Type.UpdateContent,
                                            index,
                                            updater,
                                        })
                                    }
                                />
                            );
                        }

                        return null;
                    })}
                </Stack>

                <Group justify="center">
                    <Menu shadow="md" width={200} position="bottom-start">
                        <Menu.Target>
                            <Button variant="light" size="sm" leftSection={<Plus size={14} />}>
                                Add Item
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>Section Content</Menu.Label>
                            <Menu.Item
                                leftSection={<Plus size={14} />}
                                onClick={() =>
                                    onUpdate({
                                        type: SectionUpdater.Type.AddContent,
                                        content: {
                                            type: ResumeContent.Type.SectionItem,
                                            item: {
                                                leftLabel: "New Item",
                                                centerLabel: "",
                                                rightLabel: "",
                                                contentItems: [
                                                    {
                                                        text: {
                                                            type: ResumeText.Type.BulletPoints,
                                                            items: [""],
                                                            columns: 1,
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    })
                                }
                            >
                                Add List Item
                            </Menu.Item>

                            <Menu.Divider />
                            <Menu.Label>Text Content</Menu.Label>

                            <Menu.Item
                                leftSection={<Plus size={14} />}
                                onClick={() =>
                                    onUpdate({
                                        type: SectionUpdater.Type.AddContent,
                                        content: {
                                            type: ResumeContent.Type.TextContent,
                                            text: {
                                                type: ResumeText.Type.Paragraph,
                                                text: "",
                                            },
                                        },
                                    })
                                }
                            >
                                Add Paragraph
                            </Menu.Item>

                            <Menu.Item
                                leftSection={<Plus size={14} />}
                                onClick={() =>
                                    onUpdate({
                                        type: SectionUpdater.Type.AddContent,
                                        content: {
                                            type: ResumeContent.Type.TextContent,
                                            text: {
                                                type: ResumeText.Type.BulletPoints,
                                                items: [""],
                                                columns: 1,
                                            },
                                        },
                                    })
                                }
                            >
                                Add Bullets
                            </Menu.Item>

                            <Menu.Item
                                leftSection={<Plus size={14} />}
                                onClick={() =>
                                    onUpdate({
                                        type: SectionUpdater.Type.AddContent,
                                        content: {
                                            type: ResumeContent.Type.TextContent,
                                            text: {
                                                type: ResumeText.Type.Columns,
                                                items: [
                                                    { label: "Column 1", items: [""] },
                                                    { label: "Column 2", items: [""] },
                                                ],
                                            },
                                        },
                                    })
                                }
                            >
                                Add Columns
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Stack>
        </Paper>
    );
};
