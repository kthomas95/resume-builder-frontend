import * as React from "react";
import { useContext } from "react";
import { ActionIcon, Button, Divider, Group, Menu, Stack, TextInput } from "@mantine/core";
import { MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { SectionItemEditor, SectionItemIndexContext } from "./SectionItemEditor";
import { TextContentEditor } from "../text-content/TextContentEditor";
import { ModifySections, ResumeText, ResumeUpdater, SectionUpdater } from "../../../types";
import { ResumeSectionFragment } from "../../../__generated__/graphql";
import { useResume } from "../resume-context";
import { DivideChildren } from "../../common/DivideChildren";
import { useTextFieldValue } from "../../common/TextField";
import { SectionIndexContext } from "./section-context";

export const GenericSection = (section: ResumeSectionFragment) => {
    const { title, contentItems } = section;
    const index = useContext(SectionIndexContext);
    const { mutate } = useResume();

    const modifySections = (updater: ModifySections) =>
        mutate({
            type: ResumeUpdater.Type.UpdateSections,
            updater,
        });

    const modifySection = (updater: SectionUpdater) =>
        modifySections({
            type: ModifySections.Type.UpdateSection,
            updater,
            index,
        });

    const { inputProps } = useTextFieldValue(title, 1000, (newTitle) => {
        modifySection({ type: SectionUpdater.Type.UpdateTitle, newTitle });
    });

    const addContent = (content: ResumeText) => {
        modifySection({
            type: SectionUpdater.Type.AddContent,
            content: {
                contentItems: [content],
                leftLabel: null,
                centerLabel: null,
                rightLabel: null,
            },
        });
    };

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
                            <Menu.Item
                                color="red"
                                leftSection={<Trash2 size={14} />}
                                onClick={() => {
                                    modifySections({ type: ModifySections.Type.RemoveSection, index });
                                }}
                            >
                                Remove Section
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Group>

            <Stack gap="lg">
                <DivideChildren divider={<Divider />}>
                    {contentItems.map((content, index) => {
                        return (
                            <SectionItemIndexContext value={index}>
                                <SectionItemEditor key={index} item={content} />
                            </SectionItemIndexContext>
                        );
                    })}
                </DivideChildren>
            </Stack>

            <Group justify="center">
                <Menu shadow="md" width={200} position="bottom-start">
                    <Menu.Target>
                        <Button variant="light" size="sm" leftSection={<Plus size={14} />}>
                            Add Block
                        </Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>Section Content</Menu.Label>
                        <Menu.Item
                            leftSection={<Plus size={14} />}
                            onClick={() =>
                                modifySection({
                                    type: SectionUpdater.Type.AddContent,
                                    content: {
                                        contentItems: [],
                                        leftLabel: "",
                                        centerLabel: "",
                                        rightLabel: "",
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
                            onClick={() => addContent({ type: ResumeText.Type.Paragraph, text: "" })}
                        >
                            Add Paragraph
                        </Menu.Item>

                        <Menu.Item
                            leftSection={<Plus size={14} />}
                            onClick={() =>
                                addContent({
                                    type: ResumeText.Type.BulletPoints,
                                    columns: 1,
                                    items: [],
                                })
                            }
                        >
                            Add Bullets
                        </Menu.Item>

                        <Menu.Item
                            leftSection={<Plus size={14} />}
                            onClick={() => addContent({ type: ResumeText.Type.Columns, items: [] })}
                        >
                            Add Columns
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Stack>
    );
};
