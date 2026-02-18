import * as React from "react";
import { TextInput } from "@mantine/core";
import { useTextFieldValue } from "../common/TextField";
import { useResume } from "./resume-context";
import { ResumeUpdater } from "../../types";

export const ResumeTitleEditor = () => {
    const { mutate, resume } = useResume();

    const { inputProps } = useTextFieldValue(resume.resumeData.title.name, 1000, (newName) => {
        mutate({
            type: ResumeUpdater.Type.UpdateName,
            newName,
        });
    });

    return (
        <TextInput
            placeholder="Your Full Name"
            {...inputProps}
            variant={"unstyled"}
            // color={"red"}
            styles={{
                input: {
                    fontSize: "48px",
                    fontFamily: "var(--font-resume-heading)",
                    color: "var(--mantine-color-gray-9)",
                    textAlign: "center",
                    fontWeight: 900,
                    height: "auto",
                    // fontVariant: "italic",
                },
            }}
            fw={700}
        />
    );
};
