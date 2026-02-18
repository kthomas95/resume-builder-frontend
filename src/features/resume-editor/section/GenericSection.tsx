import * as React from "react";
import { useContext } from "react";
import { ActionIcon, Button, Divider, Group, Menu, Stack, TextInput } from "@mantine/core";
import { MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { SectionItemEditor } from "./SectionItemEditor";
import { TextContentEditor } from "../text-content/TextContentEditor";
import { ResumeContent, ResumeText, ResumeUpdater, SectionUpdater } from "../../../types";
import { ResumeSectionFragment } from "../../../__generated__/graphql";
import { useResume } from "../resume-context";
import { DivideChildren } from "../../common/DivideChildren";
import { useTextFieldValue } from "../../common/TextField";
import { SectionIndexContext } from "./section-context";

export const GenericSection = (section: ResumeSectionFragment) => {
    const { title, contentItems } = section;
    const index = useContext(SectionIndexContext);
    const { mutate } = useResume();

    const onUpdate = (updater: SectionUpdater) =>
        mutate({
            type: ResumeUpdater.Type.UpdateSection,
            index,
            updater,
        });

    const onRemove = () =>
        mutate({
            type: ResumeUpdater.Type.RemoveSection,
            index,
        });

    const { inputProps } = useTextFieldValue(title, 1000, (newTitle) => {
        onUpdate({ type: SectionUpdater.Type.UpdateTitle, newTitle });
    });

    return (
        <Stack gap="md">
            <Group justify="space-between">
                <TextInput
                    {...inputProps}
                    variant={"unstyled"}
                    styles={{
                        input: {
                            fontFamily: "var(--font-resume-heading)",
                            fontSize: "16pt",
                            fontWeight: 900,
                            height: "auto",
                        },
                    }}
                />
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

            <Stack gap="lg">
                <DivideChildren divider={<Divider />}>
                    {contentItems.map((content, index) => {
                        if (content.__typename === "SectionItem") {
                            return <SectionItemEditor key={index} item={content.item} />;
                        }
                        if (content.__typename === "TextContent") {
                            return <TextContentEditor index={index} key={index} text={content.text} />;
                        }

                        return null;
                    })}
                </DivideChildren>
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
    );
};
