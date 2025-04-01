import { useContext, useState } from "react";
import { resumeContext } from "./resume-context";

export const EditDescription = () => {
    const { updateResume, description } = useContext(resumeContext);
    const [localDescription, setLocalDescription] = useState(description);
    return (
        <input
            type={"text"}
            className={"text-right italic w-min ml-auto"}
            value={localDescription}
            onChange={(e) => setLocalDescription(e.target.value)}
            onBlur={() => updateResume({ description: localDescription })}
            placeholder={"Describe Your Resume"}
        />
    );
};
