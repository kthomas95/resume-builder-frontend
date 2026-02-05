import {
    useDeleteEducationRecordMutation,
    useGetEducationComponentsSubscription,
    useNewEducationComponentMutation,
    useUpdateEducationComponentMutation,
    EducationComponentFragment
} from "../../__generated__/graphql";
import { useState } from "react";
import { EditEducationRecord } from "./EditEducation";
import { 
    Button, 
    Modal, 
    TextInput, 
    Group, 
    Stack, 
    Title, 
    Card, 
    Text,
    UnstyledButton,
    rem
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Plus, GraduationCap, Save } from "lucide-react";

export const CreateNewEducationComponent = () => {
    const [, sendMutation] = useNewEducationComponentMutation();
    const [description, setDescription] = useState("");

    const handleCreate = async () => {
        if (!description.trim()) return;
        await sendMutation({ description });
        setDescription("");
    };

    return (
        <Group align="flex-end" maw={400} mx="auto" mb="xl">
            <TextInput
                label="New Education Snippet"
                placeholder="e.g. BS in Computer Science"
                style={{ flex: 1 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            <Button 
                onClick={handleCreate}
                leftSection={<Plus size={16} />}
            >
                Create
            </Button>
        </Group>
    );
};

const EducationHistory = ({ id, record }: EducationComponentFragment) => {
    const [, update] = useUpdateEducationComponentMutation();
    const [, deleteComponent] = useDeleteEducationRecordMutation();
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <UnstyledButton onClick={open} style={{ width: '100%' }}>
                <Card shadow="xs" padding="md" radius="md" withBorder>
                    <Group gap="md">
                        <GraduationCap size={20} color="var(--mantine-color-blue-6)" />
                        <Text fw={500}>{record.universityName} - {record.major}</Text>
                    </Group>
                </Card>
            </UnstyledButton>

            <Modal 
                opened={opened} 
                onClose={close} 
                title="Edit Education Snippet" 
                size="lg"
                centered
            >
                <Stack>
                    <EditEducationRecord
                        {...record}
                        updateRecord={(props) => {
                            update({ record: { ...props, index: 0 }, id });
                        }}
                        deleteRecord={() => {
                            if (window.confirm("Are you sure you want to delete this library item?")) {
                                deleteComponent({ id });
                                close();
                            }
                        }}
                    />
                    <Group justify="flex-end" mt="md">
                        <Button variant="outline" color="gray" onClick={close}>Cancel</Button>
                        <Button onClick={close} leftSection={<Save size={16} />}>Save Snippet</Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
};

export const ManageEducationComponents = () => {
    const [{ data }] = useGetEducationComponentsSubscription();
    const records = data?.getEducationRecords ?? [];

    return (
        <Stack gap="lg" maw={800} mx="auto" py="xl">
            <Title order={2}>Education Library</Title>
            <Text c="dimmed" size="sm">
                These are reusable education history snippets you can import into any resume.
            </Text>
            
            <CreateNewEducationComponent />
            
            <Stack gap="sm">
                {records.map((x) => (
                    <EducationHistory key={x.id} {...x} />
                ))}
                {records.length === 0 && (
                    <Text ta="center" py="xl" c="dimmed" style={{ border: `${rem(1)} dashed var(--mantine-color-gray-4)`, borderRadius: rem(8) }}>
                        Your education library is empty.
                    </Text>
                )}
            </Stack>
        </Stack>
    );
};