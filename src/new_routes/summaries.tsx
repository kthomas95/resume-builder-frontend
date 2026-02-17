import { createFileRoute } from "@tanstack/react-router";
import {
    GetSummariesSubscription,
    useDeleteSummaryMutation,
    useGetSummariesSubscription,
    useNewSummaryMutation,
    useUpdateSummaryMutation,
} from "../__generated__/graphql";
import { useState, useMemo } from "react";
import { TextField } from "../components/common/TextField";
import { 
    Stack, 
    Group, 
    Button, 
    Card, 
    Title, 
    Text, 
    ActionIcon, 
    Badge,
    rem
} from "@mantine/core";
import { Plus, Trash2, Save, FileText, AlertCircle } from "lucide-react";
import * as R from "remeda";

export const Route = createFileRoute("/summaries")({
    component: RouteComponent,
});

export const CreateNewSummaryButton = () => {
    const [, createSummary] = useNewSummaryMutation();
    const [value, setValue] = useState("");

    const handleCreate = async () => {
        if (!value.trim()) return;
        await createSummary({ description: value });
        setValue("");
    };

    return (
        <Group align="flex-end" maw={500}>
            <TextInput
                label="New Summary Snippet"
                placeholder="e.g. Senior Frontend Developer Summary"
                style={{ flex: 1 }}
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
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

export const StoredSummary = ({ id, summaryText, description }: GetSummariesSubscription["getSummaries"][number]) => {
    const [, updateSummary] = useUpdateSummaryMutation();
    const [, deleteSummary] = useDeleteSummaryMutation();
    
    const handleUpdate = (summary: string, desc: string) => {
        updateSummary({ id, summaryText: summary, description: desc });
    };

    return (
        <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Stack gap="md">
                <Group justify="space-between">
                    <TextField
                        variant="unstyled"
                        initialValue={description}
                        commitChange={(val) => handleUpdate(summaryText, val)}
                        placeholder="Snippet Name"
                        styles={{
                            input: { 
                                fontSize: rem(16), 
                                fontWeight: 700, 
                                fontStyle: 'italic',
                                height: 'auto',
                                minHeight: 0
                            }
                        }}
                    />
                    
                    <Group gap="xs">
                        <ActionIcon 
                            variant="light" 
                            color="red" 
                            onClick={() => {
                                if (window.confirm("Delete this summary snippet?")) {
                                    deleteSummary({ id });
                                }
                            }}
                        >
                            <Trash2 size={16} />
                        </ActionIcon>
                    </Group>
                </Group>

                <TextField
                    placeholder="Describe your professional background..."
                    initialValue={summaryText}
                    commitChange={(val) => handleUpdate(val, description)}
                    asTextArea={true}
                />
            </Stack>
        </Card>
    );
};

export const DisplaySummaries = () => {
    const summariesResponse = useGetSummariesSubscription()[0];
    const rawSummaries = summariesResponse.data?.getSummaries ?? [];
    
    const summaries = useMemo(() => {
        return R.sortBy(rawSummaries, [R.ascBy((x) => x.description)]);
    }, [rawSummaries]);

    if (summaries.length === 0 && !summariesResponse.fetching) {
        return (
            <Text ta="center" py="xl" c="dimmed" style={{ border: `${rem(1)} dashed var(--mantine-color-gray-4)`, borderRadius: rem(8) }}>
                Your summary library is empty.
            </Text>
        );
    }

    return (
        <Stack gap="md">
            {summaries.map((summary) => <StoredSummary key={summary.id} {...summary} />)}
        </Stack>
    );
};

function RouteComponent() {
    return (
        <Stack gap="lg" maw={800} mx="auto" py="xl">
            <Group gap="xs">
                <FileText size={28} color="var(--mantine-color-blue-6)" />
                <Title order={2}>Professional Summaries</Title>
            </Group>
            
            <Text c="dimmed" size="sm">
                Create and manage different versions of your professional summary to tailor for specific roles.
            </Text>
            
            <CreateNewSummaryButton />
            
            <DisplaySummaries />
        </Stack>
    );
}