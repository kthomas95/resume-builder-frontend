import { useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { 
    Button, 
    Modal, 
    TextInput,
    Stack,
    Group
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Plus } from "lucide-react";
import { useNewResumeMutation } from "../../__generated__/graphql";

export const CreateNewResume = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [name, setName] = React.useState("");
    const [, createResume] = useNewResumeMutation();
    const navigate = useNavigate();

    const onSubmit = async () => {
        const result = await createResume({ description: name });
        if (result.data?.newResume) {
            navigate({
                to: "/$resumeId/edit",
                params: { resumeId: result.data.newResume },
            });
        }
        close();
    };

    return (
        <>
            <Button 
                onClick={open}
                leftSection={<Plus size={20} />}
                radius="md"
            >
                Create New Resume
            </Button>

            <Modal 
                opened={opened} 
                onClose={close} 
                title="Create New Resume" 
                centered
            >
                <Stack>
                    <TextInput
                        label="Resume Title"
                        placeholder="e.g., Senior Frontend Engineer"
                        description="Give your resume a name to help you identify it later."
                        value={name}
                        onChange={(event) => setName(event.currentTarget.value)}
                        autoFocus
                    />
                    
                    <Group justify="flex-end" mt="md">
                        <Button variant="subtle" color="gray" onClick={close}>
                            Cancel
                        </Button>
                        <Button onClick={onSubmit} disabled={!name.trim()}>
                            Create Resume
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
};