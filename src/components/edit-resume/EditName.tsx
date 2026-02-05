import { useContext } from "react";
import { resumeContext } from "./resume-context";
import { TextField } from "../common/TextField";
import { Box, Center } from "@mantine/core";

export const EditName = () => {
    const { updateResume, name } = useContext(resumeContext);

    return (
        <Center my="xl">
            <Box maw={500} w="100%">
                <TextField
                    placeholder="Your Full Name"
                    initialValue={name}
                    commitChange={(value) => updateResume({ name: value })}
                    id="resume-name"
                />
            </Box>
        </Center>
    );
};