import { useContext } from "react";
import { useResume } from "./resume-context";
import { Button, Group, Menu, Stack, Textarea, Title } from "@mantine/core";
import { Download, FileText } from "lucide-react";
import { TextField, useTextFieldValue } from "../common/TextField";
import { ResumeUpdater } from "../../types";
import Type = ResumeUpdater.Type;

const ImportSummary = () => {
    const resumeId = useResume().resumeId;
    // const [, importSummary] = useImportSummaryMutation();

    return (
        <Menu shadow="md" width={250} position="bottom-end">
            <Menu.Target>
                <Button variant="subtle" size="xs" leftSection={<Download size={14} />}>
                    Import from Library
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Summary Library</Menu.Label>
                {/*{summaries.map((summary) => (*/}
                {/*    <Menu.Item*/}
                {/*        key={summary.id}*/}
                {/*        onClick={() => {*/}
                {/*            importSummary({ resumeId, summaryId: summary.id });*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {summary.description}*/}
                {/*    </Menu.Item>*/}
                {/*))}*/}
                {/*{summaries.length === 0 && <Menu.Item disabled>No saved summaries found</Menu.Item>}*/}
            </Menu.Dropdown>
        </Menu>
    );
};

export const EditSummary = () => {
    const { mutate, resume } = useResume();

    const { inputProps, isUpdated } = useTextFieldValue(resume.resumeData.summary.text, 1000, (value) =>
        mutate({
            type: Type.UpdateSummary,
            newSummary: value,
        }),
    );

    return (
        <Stack gap="xs">
            <Group justify="space-between" align="center">
                <Group gap="xs">
                    <FileText size={20} color="var(--mantine-color-blue-6)" />
                    <Title order={4}>Professional Summary</Title>
                </Group>
                <ImportSummary />
            </Group>

            <Textarea
                minRows={4}
                autosize={true}
                placeholder="Briefly describe your professional background and key strengths..."
                {...inputProps}
            />
        </Stack>
    );
};
