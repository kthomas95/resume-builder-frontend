import { useContext } from "react";
import { resumeContext } from "./resume-context";
import { useGetSummariesSubscription, useImportSummaryMutation } from "../../__generated__/graphql";
import { 
    Textarea, 
    Stack, 
    Group, 
    Title, 
    Button, 
    Menu, 
    Text,
    rem
} from "@mantine/core";
import { Download, FileText } from "lucide-react";

const ImportSummary = () => {
    const summaries = useGetSummariesSubscription()[0]?.data?.getSummaries ?? [];
    const resumeId = useContext(resumeContext).id;
    const [, importSummary] = useImportSummaryMutation();
    
    return (
        <Menu shadow="md" width={250} position="bottom-end">
            <Menu.Target>
                <Button variant="subtle" size="xs" leftSection={<Download size={14} />}>
                    Import from Library
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Summary Library</Menu.Label>
                {summaries.map((summary) => (
                    <Menu.Item
                        key={summary.id}
                        onClick={() => {
                            importSummary({ resumeId, summaryId: summary.id });
                        }}
                    >
                        {summary.description}
                    </Menu.Item>
                ))}
                {summaries.length === 0 && (
                    <Menu.Item disabled>No saved summaries found</Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
    );
};

export const EditSummary = () => {
    const { summary, updateResume } = useContext(resumeContext);

    return (
        <Stack gap="xs" maw={1000} mx="auto" w="100%">
            <Group justify="space-between" align="center">
                <Group gap="xs">
                    <FileText size={20} color="var(--mantine-color-blue-6)" />
                    <Title order={4}>Professional Summary</Title>
                </Group>
                <ImportSummary />
            </Group>
            
            <Textarea
                placeholder="Briefly describe your professional background and key strengths..."
                minRows={4}
                maxRows={10}
                autosize
                value={summary}
                onChange={(e) => updateResume({ summary: e.currentTarget.value })}
                variant="filled"
                radius="md"
            />
        </Stack>
    );
};