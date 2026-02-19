import * as React from "react";
import { Button, Divider, Group, Menu, Paper, Stack } from "@mantine/core";
import { Plus } from "lucide-react";
import { TextContentEditor } from "../text-content/TextContentEditor";
import { ResumeText, SectionItemUpdater, SectionUpdater } from "../../../types";
import { SectionIndexContext, useUpdateSection } from "./section-context";
import { useResume } from "../resume-context";
import { ResumeSectionItemFragment } from "../../../__generated__/graphql";
import { ModifyLabelsComponent } from "./ModifyLabelsComponent";
import { createContext, useCallback, useContext } from "react";
import { DivideChildren } from "../../common/DivideChildren";

interface SectionItemEditorProps {
    item: ResumeSectionItemFragment;
}

export const useUpdateSectionItem = () => {
    const updateSection = useUpdateSection();
    const sectionItemIndex = useContext(SectionItemIndexContext);

    return useCallback(
        (updater: SectionItemUpdater) => {
            updateSection({
                type: SectionUpdater.Type.UpdateContent,
                index: sectionItemIndex,
                updater,
            });
        },
        [updateSection, sectionItemIndex],
    );
};

export const SectionItemIndexContext = createContext(0);

export const SectionItemEditor = ({ item }: SectionItemEditorProps) => {
    const updateSection = useUpdateSection();
    const resumeSectionIndex = useContext(SectionIndexContext);
    const resumeSectionItemIndex = useContext(SectionItemIndexContext);
    const { mutate } = useResume();
    const updateSectionItem = useUpdateSectionItem();

    const addItem = (item: ResumeText) => {
        updateSectionItem({
            type: SectionItemUpdater.Type.AddContent,
            content: item,
        });
    };

    return (
        <Stack gap="sm">
            <ModifyLabelsComponent item={item} />

            <Stack gap="md">
                <DivideChildren divider={<Divider />}>
                    {item.contentItems?.map((content, index: number) => (
                        <TextContentEditor text={content} index={index} />
                    ))}
                </DivideChildren>
            </Stack>

            <Group justify="center" mt="xs">
                <Menu shadow="md" width={200} position="bottom-start">
                    <Menu.Target>
                        <Button variant="subtle" size="xs" leftSection={<Plus size={14} />}>
                            Add Content
                        </Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item
                            leftSection={<Plus size={14} />}
                            onClick={() =>
                                addItem({
                                    type: ResumeText.Type.Paragraph,
                                    text: "",
                                })
                            }
                        >
                            Add Paragraph
                        </Menu.Item>

                        <Menu.Item
                            leftSection={<Plus size={14} />}
                            onClick={() =>
                                addItem({
                                    type: ResumeText.Type.BulletPoints,
                                    items: [""],
                                    columns: 1,
                                })
                            }
                        >
                            Add Bullets
                        </Menu.Item>

                        <Menu.Item
                            leftSection={<Plus size={14} />}
                            onClick={() =>
                                addItem({
                                    type: ResumeText.Type.Columns,
                                    items: [],
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
