import * as React from "react";
import { ActionIcon, Button, Group, Paper, Select, Stack, Title } from "@mantine/core";
import { Github, Globe, Linkedin, Mail, Phone, Plus, Trash2 } from "lucide-react";
import { ResumeContactIcon, ResumeUpdater } from "../../types";
import { TextField } from "../common/TextField";
import { useResume } from "./resume-context";

interface ContactItemsEditorProps {
    items: any[];
    onUpdate: (updater: ResumeUpdater) => void;
}

const IconMap: Record<ResumeContactIcon, React.ReactNode> = {
    [ResumeContactIcon.Email]: <Mail size={16} />,
    [ResumeContactIcon.Phone]: <Phone size={16} />,
    [ResumeContactIcon.Website]: <Globe size={16} />,
    [ResumeContactIcon.Github]: <Github size={16} />,
    [ResumeContactIcon.LinkedIn]: <Linkedin size={16} />,
};

export const ContactItemsEditor = () => {
    const { resume, mutate } = useResume();
    const items = resume.resumeData.contactItems;

    return (
        <Paper p="md" withBorder radius="md">
            <Stack gap="md">
                <Title order={4}>Contact Information</Title>
                <Stack gap="xs">
                    {items.map((item, index) => (
                        <Group key={index} align="flex-end">
                            <Select
                                label="Type"
                                data={Object.values(ResumeContactIcon)}
                                value={item.icon}
                                onChange={(val) =>
                                    mutate({
                                        type: ResumeUpdater.Type.UpdateContactItem,
                                        index,
                                        item: { ...item, icon: val as ResumeContactIcon },
                                    })
                                }
                                leftSection={IconMap[item.icon]}
                                style={{ width: 150 }}
                            />
                            <TextField
                                label="Value"
                                placeholder="e.g., john@example.com"
                                initialValue={item.value}
                                commitChange={(val) =>
                                    mutate({
                                        type: ResumeUpdater.Type.UpdateContactItem,
                                        index,
                                        item: {
                                            icon: item.icon,
                                            value: val,
                                        },
                                    })
                                }
                                style={{ flex: 1 }}
                            />
                            <ActionIcon
                                color="red"
                                variant="subtle"
                                size="lg"
                                onClick={() =>
                                    mutate({
                                        type: ResumeUpdater.Type.RemoveContactItem,
                                        index,
                                    })
                                }
                            >
                                <Trash2 size={20} />
                            </ActionIcon>
                        </Group>
                    ))}
                </Stack>
                <Button
                    variant="subtle"
                    size="sm"
                    leftSection={<Plus size={14} />}
                    onClick={() =>
                        mutate({
                            type: ResumeUpdater.Type.AddContactItem,
                            item: {
                                icon: ResumeContactIcon.Email,
                                value: "",
                            },
                        })
                    }
                >
                    Add Contact Item
                </Button>
            </Stack>
        </Paper>
    );
};
