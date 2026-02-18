import * as React from "react";
import { ActionIcon, Button, Group, Menu, TextInput } from "@mantine/core";
import { Github, Globe, Linkedin, Mail, Phone, Plus, Trash2 } from "lucide-react";
import { ResumeContactIcon, ResumeUpdater } from "../../types";
import { useTextFieldValue } from "../common/TextField";
import { useResume } from "./resume-context";
import { ContactItemFragment } from "../../__generated__/graphql";
import Type = ResumeUpdater.Type;

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

const ContactItemEditor = ({ index, ...item }: ContactItemFragment & { index: number }) => {
    const { mutate } = useResume();

    const { inputProps } = useTextFieldValue(item.value, 1000, (newValue) => {
        mutate({
            type: Type.UpdateContactItem,
            index,
            item: {
                icon: item.icon,
                value: newValue,
            },
        });
    });

    return (
        <Menu>
            <TextInput
                {...inputProps}
                variant={"unstyled"}
                styles={{
                    wrapper: {
                        // border: "1px solid",
                        // boxShadow: "var(--mantine-shadow-sm)",
                        borderRadius: "var(--mantine-radius-md)",
                        // backgroundColor: "var(--mantine-color-white)",
                        borderColor: "var(--mantine-color-blue-9)",
                        padding: "0em",
                    },
                    input: {
                        fontWeight: 300,
                        fontSize: "var(--mantine-font-size-xs)",
                        color: "var(--mantine-color-gray-9)",
                        fontFamily: "Merriweather Sans Variable",
                    },
                }}
                leftSection={
                    <Menu.Target>
                        <ActionIcon bg={"transparent"} variant={"white"} color={"gray.7"}>
                            {IconMap[item.icon]}
                        </ActionIcon>
                    </Menu.Target>
                }
            />
            <Menu.Dropdown>
                <Menu.Label>{item.value !== "" ? item.value : "______________"}</Menu.Label>
                {Object.values(ResumeContactIcon).map((icon) => (
                    <Menu.Item
                        onClick={() =>
                            mutate({
                                type: ResumeUpdater.Type.UpdateContactItem,
                                index,
                                item: {
                                    value: item.value,
                                    icon,
                                },
                            })
                        }
                        leftSection={IconMap[icon]}
                    >
                        {icon}
                    </Menu.Item>
                ))}
                <Menu.Divider />
                <Menu.Item
                    onClick={() =>
                        mutate({
                            type: ResumeUpdater.Type.RemoveContactItem,
                            index,
                        })
                    }
                    color={"red"}
                    leftSection={<Trash2 size={16} />}
                >
                    Remove
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export const ContactItemsEditor = () => {
    const { resume, mutate } = useResume();
    const items = resume.resumeData.contactItems;

    return (
        <Group justify={"center"}>
            {items.map((item, index) => (
                <ContactItemEditor {...item} index={index} key={index} />
            ))}
            <Button
                variant="outline"
                size="xs"
                color={"gray"}
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
                <Plus size={14} />
            </Button>
        </Group>
    );
};
