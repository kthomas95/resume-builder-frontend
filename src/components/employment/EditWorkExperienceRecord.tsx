import { EmploymentPropsFragment, UpdateEmploymentRecordInput } from "../../__generated__/graphql";
import { TextField } from "../common/TextField";
import { AreYouSureButton } from "../edit-resume/AreYouSureButton";
import { Stack, Group, Card, Text, Divider, Box } from "@mantine/core";

interface EditWorkExperienceProps extends EmploymentPropsFragment {
    update: (props: Omit<UpdateEmploymentRecordInput, "index">) => void;
    remove: () => void;
}

export const EditWorkExperienceRecord = ({
    update,
    summary,
    yearsEmployed,
    employer,
    title,
    remove,
}: EditWorkExperienceProps) => {
    return (
        <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Stack gap="md">
                <Group grow preventGrowOverflow={false}>
                    <Box style={{ flex: 1 }}>
                        <Text size="xs" fw={700} c="dimmed" mb={4}>EMPLOYER</Text>
                        <TextField
                            placeholder="Employer"
                            commitChange={(value) => update({ newEmployer: value })}
                            initialValue={employer}
                        />
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <Text size="xs" fw={700} c="dimmed" mb={4}>TITLE</Text>
                        <TextField
                            placeholder="Title"
                            commitChange={(value) => update({ newTitle: value })}
                            initialValue={title}
                        />
                    </Box>
                </Group>

                <Box>
                    <Text size="xs" fw={700} c="dimmed" mb={4}>YEARS EMPLOYED</Text>
                    <TextField
                        placeholder="Years Employed"
                        commitChange={(value) => update({ newYearsWorked: value })}
                        initialValue={yearsEmployed}
                    />
                </Box>

                <Box>
                    <Text size="xs" fw={700} c="dimmed" mb={4}>SUMMARY</Text>
                    <TextField
                        commitChange={(value) => update({ newSummary: value })}
                        placeholder="Enter your employment summary here. Use dashes for bullet points."
                        asTextArea={true}
                        initialValue={summary}
                    />
                </Box>

                <Divider my="sm" />

                <Group justify="flex-end">
                    <AreYouSureButton finalizeDelete={remove} label={`Remove ${employer || "Experience"}`} />
                </Group>
            </Stack>
        </Card>
    );
};