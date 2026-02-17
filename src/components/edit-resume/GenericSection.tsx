import * as React from "react";
import { Stack, Title, Group, ActionIcon, Button, Menu, Paper } from "@mantine/core";
import { Trash2, Plus, GripVertical, MoreHorizontal } from "lucide-react";
import { SectionItemEditor } from "./SectionItemEditor";
import { TextContentEditor } from "./TextContentEditor";
import {ResumeContent, ResumeText, SectionUpdater} from "../../types";
import {
    ResumeContent_SectionItem_Fragment, ResumeContent_TextContent_Fragment,
    ResumeTextFragment,
    SectionItemsFragment
} from "../../__generated__/graphql";

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
                                <Menu.Item 
                                    color="red" 
                                    leftSection={<Trash2 size={14} />}
                                    onClick={onRemove}
                                >
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
                                    onUpdate={(updater) => onUpdate({
                                        type: SectionUpdater.Type.UpdateContent,
                                        index,
                                        updater: {
                                            type: "me.kthomas.resume.ContentUpdater.UpdateSectionItem",
                                            updater
                                        }
                                    })}
                                    onRemove={() => onUpdate({
                                        type: SectionUpdater.Type.RemoveContent,
                                        index
                                    })}
                                />
                            );
                        }
                        if (content.type === ResumeText.Type.Paragraph) {
                            return (
                                <TextContentEditor
                                    key={index}
                                    text={content.text}
                                    onUpdate={(updater) => onUpdate({
                                        type: SectionUpdater.Type.UpdateContent,
                                        index,
                                        updater
                                    })}
                                />
                            );
                        }

                        // if (content.type === "") {
                        // }
                        return content.__typename ?? "KK"
                        return null;
                    })}
                </Stack>

                <Group justify="center">
                    <Button 
                        variant="light" 
                        size="sm" 
                        leftSection={<Plus size={14} />}
                        onClick={() => onUpdate({
                            type: SectionUpdater.Type.AddContent,
                            content: {
                                type: ResumeContent.Type.SectionItem,
                                item: {
                                    leftLabel: "New Item",
                                    centerLabel: "",
                                    rightLabel: "",
                                    contentItems: [{
                                        text: {
                                            type: ResumeText.Type.BulletPoints,
                                            items: [""],
                                            columns: 1
                                        }
                                    }]
                                }
                            }
                        })}
                    >
                        Add Item
                    </Button>
                </Group>
            </Stack>
        </Paper>
    );
};
