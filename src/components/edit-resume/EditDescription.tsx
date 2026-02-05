import { useContext, useState } from "react";
import { resumeContext } from "./resume-context";
import { TextInput } from "@mantine/core";

export const EditDescription = () => {
    const { updateResume, description } = useContext(resumeContext);
    const [localDescription, setLocalDescription] = useState(description);
    return (
        <TextInput
            variant="unstyled"
            placeholder="Describe Your Resume"
            value={localDescription}
            onChange={(e) => setLocalDescription(e.currentTarget.value)}
            onBlur={() => updateResume({ description: localDescription })}
            styles={{
                input: {
                    textAlign: 'right',
                    fontStyle: 'italic',
                    paddingRight: 'var(--mantine-spacing-md)',
                    color: 'var(--mantine-color-dimmed)',
                }
            }}
        />
    );
};