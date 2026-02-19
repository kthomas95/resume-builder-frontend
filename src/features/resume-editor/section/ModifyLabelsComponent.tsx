import { ResumeSectionItemFragment } from "../../../__generated__/graphql";
import { ActionIcon, Divider, Group } from "@mantine/core";
import { TextField } from "../../common/TextField";
import * as React from "react";
import { allPass, isNullish } from "remeda";
import { everyItem } from "valibot";
import { SectionItemIndexContext, useUpdateSectionItem } from "./SectionItemEditor";
import { SectionItemUpdater, SectionUpdater } from "../../../types";
import { Trash2 } from "lucide-react";
import { useUpdateSection } from "./section-context";
import { useContext } from "react";

export const ModifyLabelsComponent = ({ item }: { item: ResumeSectionItemFragment }) => {
    const updateSection = useUpdateSection();
    const updateSectionItem = useUpdateSectionItem();
    const shouldHide = [item.leftLabel, item.centerLabel, item.rightLabel].every(isNullish);
    const sectionItemIndex = useContext(SectionItemIndexContext);

    if (shouldHide) {
        // return null;
    }
    return (
        <>
            <Group grow style={{ opacity: shouldHide ? 0.3 : 1 }}>
                <TextField
                    placeholder="e.g., University Name"
                    initialValue={item.leftLabel || ""}
                    commitChange={(val) =>
                        updateSectionItem({
                            type: SectionItemUpdater.Type.UpdateLabels,
                            leftLabel: val,
                        })
                    }
                />
                <TextField
                    placeholder="e.g., Location"
                    initialValue={item.centerLabel || ""}
                    commitChange={(val) =>
                        updateSectionItem({
                            type: SectionItemUpdater.Type.UpdateLabels,
                            centerLabel: val,
                        })
                    }
                />
                <Group align="flex-end">
                    <TextField
                        placeholder="e.g., Dates"
                        initialValue={item.rightLabel || ""}
                        commitChange={(val) =>
                            updateSectionItem({
                                type: SectionItemUpdater.Type.UpdateLabels,
                                rightLabel: val,
                            })
                        }
                        style={{ flex: 1 }}
                    />
                    <ActionIcon
                        color="red"
                        variant="subtle"
                        size="lg"
                        onClick={() =>
                            updateSection({
                                type: SectionUpdater.Type.RemoveContent,
                                index: sectionItemIndex,
                            })
                        }
                    >
                        <Trash2 size={20} />
                    </ActionIcon>
                </Group>
            </Group>
            <Divider variant="dashed" />
        </>
    );
};
