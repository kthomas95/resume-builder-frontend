import { Link } from "@tanstack/react-router";
import { format, fromUnixTime } from "date-fns";
import * as React from "react";
import { 
    Card, 
    Button, 
    Menu, 
    ActionIcon,
    Text,
    Group,
    Stack,
    rem
} from "@mantine/core";
import { MoreVertical, Edit, Trash2, Download, Clock, ExternalLink } from "lucide-react";
import { AvailableResume, useGetAvailableResumesSubscription, useDeleteResumeMutation } from "../../__generated__/graphql";
import * as R from "remeda";

const AvailableResumeComponent = ({ description, id, lastModifiedSeconds, title }: AvailableResume) => {
    const [, deleteResume] = useDeleteResumeMutation();
    const resumeName = title !== "" ? title : (description !== "" ? description : "Untitled Resume");
    
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" align="center">
                <Stack gap={4}>
                    <Text size="lg" fw={700}>{resumeName}</Text>
                    {description && <Text size="sm" c="dimmed">{description}</Text>}
                    <Group gap="xs" c="dimmed">
                        <Clock size={14} />
                        <Text size="xs">
                            Last modified: {format(fromUnixTime(Number(lastModifiedSeconds)), "MMM d, yyyy 'at' h:mm a")}
                        </Text>
                    </Group>
                </Stack>
                
                <Group gap="sm">
                    <Button 
                        component={Link}
                        to="/$resumeId/edit" 
                        params={{ resumeId: id }} 
                        variant="light"
                        leftSection={<Edit size={16} />}
                    >
                        Edit
                    </Button>
                    
                    <Button
                        component="a"
                        href={`${import.meta.env.VITE_BUILD_RESUME_URL}${id}`}
                        target="_blank"
                        variant="default"
                        leftSection={<Download size={16} />}
                    >
                        Download
                    </Button>

                    <Menu position="bottom-end" shadow="md" width={200}>
                        <Menu.Target>
                            <ActionIcon variant="subtle" size="lg" radius="md">
                                <MoreVertical size={20} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>Actions</Menu.Label>
                            <Menu.Item 
                                leftSection={<ExternalLink style={{ width: rem(14), height: rem(14) }} />}
                                component="a"
                                href={`${import.meta.env.VITE_BUILD_RESUME_URL}${id}`}
                                target="_blank"
                            >
                                Preview in Browser
                            </Menu.Item>
                            
                            <Menu.Divider />
                            
                            <Menu.Label>Danger zone</Menu.Label>
                            <Menu.Item 
                                color="red"
                                leftSection={<Trash2 style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => {
                                    if (window.confirm(`Are you sure you want to delete "${resumeName}"?`)) {
                                        deleteResume({ id });
                                    }
                                }}
                            >
                                Delete Resume
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Group>
        </Card>
    );
};

export const YourAvailableResumes = () => {
    const [{ data, fetching }] = useGetAvailableResumesSubscription();
    
    const resumes = React.useMemo(() => {
        const rawResumes = data?.viewAvailableResumes ?? [];
        return R.pipe(
            rawResumes,
            R.sortBy([(x) => Number(x.lastModifiedSeconds), 'desc'])
        );
    }, [data?.viewAvailableResumes]);

    if (resumes.length === 0 && !fetching) {
        return (
            <Card padding="xl" radius="md" withBorder style={{ borderStyle: 'dashed', textAlign: 'center', backgroundColor: 'transparent' }}>
                <Text c="dimmed">You haven't created any resumes yet. Click the button above to get started!</Text>
            </Card>
        );
    }

    return (
        <Stack gap="md">
            {resumes.map((resume) => (
                <AvailableResumeComponent key={resume.id} {...resume} />
            ))}
        </Stack>
    );
};
