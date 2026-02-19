import { ParagraphFragment } from "../../../__generated__/graphql";
import * as React from "react";
import { TextField } from "../../common/TextField";
import { ResumeTextUpdater } from "../../../types";

import { useUpdateTextContent } from "./text-content-context";

export const EditParagraph = (props: ParagraphFragment) => {
    const onUpdate = useUpdateTextContent();

    return (
        <TextField
            initialValue={props.text}
            commitChange={(val) =>
                onUpdate({
                    type: ResumeTextUpdater.Type.UpdateParagraph,
                    text: val,
                })
            }
            placeholder={"..."}
            asTextArea={true}
        />
    );
};
