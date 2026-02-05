import { useContext } from "react";
import { resumeContext } from "../edit-resume/resume-context";
import { Briefcase, Plus } from "lucide-react";
import {
    EmploymentSectionFragment,
    useGetEmploymentComponentsSubscription,
    useInsertEmploymentComponentIntoResumeMutation,
} from "../../__generated__/graphql";
import { EditWorkExperienceRecord } from "./EditWorkExperienceRecord";
import { Menu, Button, ActionIcon, Title, Group, Stack, Text } from "@mantine/core";

const AddWorkExperienceButton = () => {
    const { updateResume, id } = useContext(resumeContext);
    const [{ data }] = useGetEmploymentComponentsSubscription();
    const [, insertToResume] = useInsertEmploymentComponentIntoResumeMutation();

    const workComponents = data?.getEmploymentRecords ?? [];

    return (
        <Menu shadow="md" width={250} position="bottom-end">
            <Menu.Target>
                <ActionIcon variant="filled" color="blue" size="lg" radius="md">
                    <Plus size={20} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Actions</Menu.Label>
                <Menu.Item
                    leftSection={<Plus size={14} />}
                    onClick={() => updateResume({ updateSections: { addEmploymentRecord: true } })}
                >
                    New Blank Record
                </Menu.Item>
                
                {workComponents.length > 0 && (
                    <>
                        <Menu.Divider />
                        <Menu.Label>Import from Library</Menu.Label>
                        {workComponents.map((record) => (
                            <Menu.Item
                                key={record.id}
                                onClick={() => {
                                    insertToResume({ componentId: record.id, resumeId: id });
                                }}
                            >
                                {record.description}
                            </Menu.Item>
                        ))}
                    </>
                )}
            </Menu.Dropdown>
        </Menu>
    );
};

export const EditWorkExperience = ({ title, records }: EmploymentSectionFragment) => {
    const { updateResume } = useContext(resumeContext);
    return (
        <Stack gap="lg" maw={1000} mx="auto" w="100%">
            <Group justify="space-between" align="center" style={{ fontVariant: 'all-small-caps' }}>
                <Group gap="md">
                    <Briefcase size={28} />
                    <Title order={3}>{title}</Title>
                </Group>
                <AddWorkExperienceButton />
            </Group>
            
            <Stack gap="md">
                {records.map((record, index) => (
                    <EditWorkExperienceRecord
                        key={index}
                        remove={() =>
                            updateResume({
                                updateSections: {
                                    deleteEmploymentRecord: index,
                                },
                            })
                        }
                        update={(props) =>
                            updateResume({
                                updateSections: {
                                    updateEmploymentRecord: { index, ...props },
                                },
                            })
                        }
                        {...record}
                    />
                ))}
            </Stack>
        </Stack>
    );
};