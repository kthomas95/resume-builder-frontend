import {
    useDeleteEmploymentComponentMutation,
    useGetEmploymentComponentsSubscription,
    useNewEmploymentComponentMutation,
    useUpdateEmploymentComponentMutation,
    WorkHistoryComponentFragment,
} from "../../__generated__/graphql";
import { useState } from "react";
import { EditWorkExperienceRecord } from "./EditWorkExperienceRecord";
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
import { Plus, Briefcase, Save } from "lucide-react";

export const NewEmploymentComponent = () => {
    const [, sendMutation] = useNewEmploymentComponentMutation();
    const [description, setDescription] = useState("");

    const handleCreate = async () => {
        if (!description.trim()) return;
        await sendMutation({ description });
        setDescription("");
    };

    return (
        <Group align="flex-end" maw={400} mx="auto" mb="xl">
            <TextInput
                label="New Work History Snippet"
                placeholder="e.g. Senior Dev at Google"
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

const WorkHistory = ({ id, record }: WorkHistoryComponentFragment) => {
    const [, updateComponent] = useUpdateEmploymentComponentMutation();
    const [, deleteComponent] = useDeleteEmploymentComponentMutation();
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <UnstyledButton onClick={open} style={{ width: '100%' }}>
                <Card shadow="xs" padding="md" radius="md" withBorder>
                    <Group gap="md">
                        <Briefcase size={20} color="var(--mantine-color-blue-6)" />
                        <Text fw={500}>{record.employer} - {record.title}</Text>
                    </Group>
                </Card>
            </UnstyledButton>

            <Modal 
                opened={opened} 
                onClose={close} 
                title="Edit Work History Snippet" 
                size="lg"
                centered
            >
                <Stack>
                    <EditWorkExperienceRecord
                        update={(props) => {
                            updateComponent({ id, record: { index: 0, ...props } });
                        }}
                        remove={() => {
                            if (window.confirm("Are you sure you want to delete this library item?")) {
                                deleteComponent({ id });
                                close();
                            }
                        }}
                        {...record}
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

export const ViewEmploymentComponents = () => {
    const [{ data }] = useGetEmploymentComponentsSubscription();

    const employeeRecords = data?.getEmploymentRecords;
    
    return (
        <Stack gap="lg" maw={800} mx="auto" py="xl">
            <Title order={2}>Work History Library</Title>
            <Text c="dimmed" size="sm">
                These are reusable work history snippets you can import into any resume.
            </Text>
            
            <NewEmploymentComponent />
            
            <Stack gap="sm">
                {employeeRecords?.map((record) => (
                    <WorkHistory key={record.id} {...record} />
                ))}
                {employeeRecords?.length === 0 && (
                    <Text ta="center" py="xl" c="dimmed" style={{ border: `${rem(1)} dashed var(--mantine-color-gray-4)`, borderRadius: rem(8) }}>
                        Your work history library is empty.
                    </Text>
                )}
            </Stack>
        </Stack>
    );
};