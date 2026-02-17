import { useContext } from "react";
import { resumeContext } from "./resume-context";
import { TextField } from "../common/TextField";

export const EditDescription = () => {
    const { updateResume, description } = useContext(resumeContext);
    return (
        <TextField
            variant="unstyled"
            placeholder="Describe Your Resume"
            initialValue={description}
            commitChange={(val) => updateResume({ description: val })}
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