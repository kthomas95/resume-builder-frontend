import { ParagraphFragment } from "../../../__generated__/graphql";
import * as React from "react";
import { useContext } from "react";
import { TextField } from "../../common/TextField";
import { ContentUpdater, ResumeUpdater, SectionUpdater } from "../../../types";
import { Button, Stack } from "@mantine/core";
import { useResume } from "../resume-context";
import Type = ResumeUpdater.Type;

import { useUpdateTextContent } from "./text-content-context";

export const EditParagraph = (props: ParagraphFragment) => {
    const onUpdate = useUpdateTextContent();
    const { mutate } = useResume();

    return (
        <Stack>
            <Button
                onClick={() =>
                    mutate({
                        type: Type.UpdateSection,
                        index: 0,
                        updater: { type: SectionUpdater.Type.RemoveContent, index: 1 },
                    })
                }
            >
                Remove
            </Button>
            <TextField
                initialValue={props.text}
                commitChange={(val) =>
                    onUpdate({
                        type: ContentUpdater.Type.UpdateParagraph,
                        text: val,
                    })
                }
                placeholder={"..."}
                asTextArea={true}
            />
        </Stack>
    );
};
