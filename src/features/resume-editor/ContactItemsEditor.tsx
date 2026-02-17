import * as React from "react";
import { ActionIcon, Button, Group, Paper, Select, Stack, Title } from "@mantine/core";
import { Github, Globe, Linkedin, Mail, Phone, Plus, Trash2 } from "lucide-react";
import { ResumeContactIcon, ResumeUpdater } from "../../types";
import { TextField } from "../common/TextField";

interface ContactItemsEditorProps {
    items: any[];
    onUpdate: (updater: ResumeUpdater) => void;
}

const IconMap: Record<ResumeContactIcon, React.ReactNode> = {
    [ResumeContactIcon.EMAIL]: <Mail size={16} />,
    [ResumeContactIcon.PHONE]: <Phone size={16} />,
    [ResumeContactIcon.WEBSITE]: <Globe size={16} />,
    [ResumeContactIcon.GITHUB]: <Github size={16} />,
    [ResumeContactIcon.LINKEDIN]: <Linkedin size={16} />,
};

export const ContactItemsEditor = ({ items, onUpdate }: ContactItemsEditorProps) => {
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
                                    onUpdate({
                                        type: ResumeUpdater.Type.UpdateContactItem,
                                        index,
                                        item: { ...item, icon: val as ResumeContactIcon },
                                    })
                                }
                                leftSection={IconMap[item.icon as ResumeContactIcon]}
                                style={{ width: 150 }}
                            />
                            <TextField
                                label="Value"
                                placeholder="e.g., john@example.com"
                                initialValue={item.value}
                                commitChange={(val) =>
                                    onUpdate({
                                        type: ResumeUpdater.Type.UpdateContactItem,
                                        index,
                                        item: { ...item, value: val },
                                    })
                                }
                                style={{ flex: 1 }}
                            />
                            <ActionIcon
                                color="red"
                                variant="subtle"
                                size="lg"
                                onClick={() =>
                                    onUpdate({
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
                        onUpdate({
                            type: ResumeUpdater.Type.AddContactItem,
                            item: {
                                icon: ResumeContactIcon.EMAIL,
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
