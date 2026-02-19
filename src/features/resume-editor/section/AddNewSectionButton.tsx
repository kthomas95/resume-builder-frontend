import { useResume } from "../resume-context";
import { Button } from "@mantine/core";
import { Plus } from "lucide-react";
import { ModifySections, ResumeUpdater } from "../../../types";
import * as React from "react";

export const AddNewSectionButton = () => {
    const { mutate } = useResume();

    return (
        <Button
            size="md"
            variant="outline"
            leftSection={<Plus size={20} />}
            onClick={() =>
                mutate({
                    type: ResumeUpdater.Type.UpdateSections,
                    updater: {
                        type: ModifySections.Type.AddSection,
                        section: {
                            title: "New Section",
                            contentItems: [],
                        },
                    },
                })
            }
        >
            Add New Section
        </Button>
    );
};
