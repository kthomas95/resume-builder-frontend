import { ParagraphFragment } from "../../../__generated__/graphql";
import * as React from "react";
import { TextField, useTextFieldValue } from "../../common/TextField";
import { ResumeTextUpdater } from "../../../types";

import { useUpdateTextContent } from "./text-content-context";
import { ActionIcon, Box, Button, Menu, Textarea } from "@mantine/core";
import { ChevronDown } from "lucide-react";

export const EditParagraph = (props: ParagraphFragment) => {
    const onUpdate = useUpdateTextContent();
    const { inputProps } = useTextFieldValue(props.text, 1000, (val) =>
        onUpdate({
            type: ResumeTextUpdater.Type.UpdateParagraph,
            text: val,
        }),
    );

    return (
        <Textarea
            placeholder={"..."}
            {...inputProps}
            variant={"unstyled"}
            p={"md"}
            minRows={4}
            rightSection={
                <Menu>
                    <Menu.Target>
                        <ActionIcon variant={"subtle"}>
                            <ChevronDown />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>Delete</Menu.Dropdown>
                </Menu>
            }
        />
    );
};
