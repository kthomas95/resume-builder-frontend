import { useContext } from "react";
import { resumeContext } from "../edit-resume/resume-context";
import { GraduationCap, Plus, Save, Trash2, X } from "lucide-react";
import {
    EducationPropsFragment,
    EducationSectionFragment,
    UpdateSectionsInput,
    UpdateUniversityRecordInput,
    useGetEducationComponentsSubscription,
    useInsertEducationComponentIntoResumeMutation,
} from "../../__generated__/graphql";
import { AreYouSureButton } from "../edit-resume/AreYouSureButton";
import { 
    Button, 
    Menu, 
    ActionIcon, 
    Title, 
    Group, 
    Stack, 
    Text, 
    Card, 
    TextInput, 
    Modal, 
    Divider,
    UnstyledButton,
    rem
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const AddUniversityRecord = () => {
    const { updateResume, id } = useContext(resumeContext);
    const [{ data }] = useGetEducationComponentsSubscription();
    const [, add] = useInsertEducationComponentIntoResumeMutation();
    const universityComponents = data?.getEducationRecords ?? [];

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
                    onClick={() => updateResume({ updateSections: { addUniversityRecord: true } })}
                >
                    New Blank Record
                </Menu.Item>
                
                {universityComponents.length > 0 && (
                    <>
                        <Menu.Divider />
                        <Menu.Label>Import from Library</Menu.Label>
                        {universityComponents.map((record) => (
                            <Menu.Item
                                key={record.id}
                                onClick={() => {
                                    add({ resumeId: id, componentId: record.id });
                                }}
                            >
                                {record.record.universityName}
                            </Menu.Item>
                        ))}
                    </>
                )}
            </Menu.Dropdown>
        </Menu>
    );
};

export interface EditEducationProps extends EducationPropsFragment {
    updateRecord: (props: Omit<UpdateUniversityRecordInput, "index">) => void;
    deleteRecord: () => void;
}

export const EditEducationRecord = ({
    degreeType,
    label,
    major,
    minors,
    universityName,
    updateRecord,
    deleteRecord,
}: EditEducationProps) => {
    return (
        <Stack gap="md">
            <TextInput
                label="University"
                placeholder="e.g. Stanford University"
                value={universityName}
                onChange={(e) => updateRecord({ newUniversityName: e.currentTarget.value })}
            />
            <TextInput
                label="Years Attended"
                placeholder="e.g. 2016 - 2020"
                value={label}
                onChange={(e) => updateRecord({ newLabel: e.currentTarget.value })}
            />
            <TextInput
                label="Degree Type"
                placeholder="e.g. Bachelor of Science"
                value={degreeType}
                onChange={(e) => updateRecord({ newDegreeType: e.currentTarget.value })}
            />
            <TextInput
                label="Major"
                placeholder="e.g. Computer Science"
                value={major}
                onChange={(e) => updateRecord({ newMajor: e.currentTarget.value })}
            />
            
            <Divider label="Minors" labelPosition="left" />
            
            <Stack gap="xs">
                {minors.map((minor, minorIndex) => (
                    <Group key={minorIndex} grow preventGrowOverflow={false}>
                        <TextInput
                            placeholder="Minor"
                            value={minor}
                            onChange={(e) => updateRecord({
                                newMinors: minors.map((m, i) => i === minorIndex ? e.currentTarget.value : m)
                            })}
                            style={{ flex: 1 }}
                        />
                        <ActionIcon 
                            color="red" 
                            variant="subtle"
                            onClick={() => updateRecord({
                                newMinors: minors.filter((_, i) => i !== minorIndex)
                            })}
                        >
                            <X size={16} />
                        </ActionIcon>
                    </Group>
                ))}
                <Button 
                    variant="light" 
                    size="xs" 
                    leftSection={<Plus size={14} />}
                    onClick={() => updateRecord({ newMinors: [...minors, ""] })}
                    maw={150}
                >
                    Add Minor
                </Button>
            </Stack>
            
            <Divider mt="md" />
            
            <Group justify="space-between">
                <Button 
                    variant="light" 
                    color="red" 
                    leftSection={<Trash2 size={16} />}
                    onClick={() => {
                        if (window.confirm("Delete this education record?")) deleteRecord();
                    }}
                >
                    Remove
                </Button>
            </Group>
        </Stack>
    );
};

export const EditEducation = ({ title, records }: EducationSectionFragment) => {
    const { updateResume } = useContext(resumeContext);
    const updateSections = (request: UpdateSectionsInput) => updateResume({ updateSections: request });
    
    return (
        <Stack gap="lg" maw={1000} mx="auto" w="100%">
            <Group justify="space-between" align="center" style={{ fontVariant: 'all-small-caps' }}>
                <Group gap="md">
                    <GraduationCap size={28} />
                    <Title order={3}>{title}</Title>
                </Group>
                <AddUniversityRecord />
            </Group>

            <Stack gap="md">
                {records.map((props, index) => (
                    <EducationRecordModal 
                        key={index}
                        props={props}
                        index={index}
                        updateSections={updateSections}
                    />
                ))}
            </Stack>
        </Stack>
    );
};

const EducationRecordModal = ({ props, index, updateSections }: { props: EducationPropsFragment, index: number, updateSections: (r: UpdateSectionsInput) => void }) => {
    const [opened, { open, close }] = useDisclosure(false);
    
    return (
        <>
            <UnstyledButton onClick={open}>
                <Card shadow="xs" padding="md" radius="md" withBorder hoverable>
                    <Group justify="space-between">
                        <Stack gap={0}>
                            <Text fw={700}>{props.universityName}</Text>
                            <Text size="sm" c="dimmed">{props.degreeType} in {props.major}</Text>
                        </Stack>
                        <Text size="xs" c="dimmed">{props.label}</Text>
                    </Group>
                </Card>
            </UnstyledButton>

            <Modal 
                opened={opened} 
                onClose={close} 
                title="Edit Education Record" 
                size="lg"
                centered
            >
                <EditEducationRecord
                    {...props}
                    updateRecord={(updateProps) => {
                        updateSections({ updateEducationRecord: { ...updateProps, index } });
                    }}
                    deleteRecord={() => {
                        updateSections({ deleteUniversityRecord: index });
                        close();
                    }}
                />
                <Group justify="flex-end" mt="xl">
                    <Button onClick={close} leftSection={<Save size={16} />}>Save Changes</Button>
                </Group>
            </Modal>
        </>
    );
}