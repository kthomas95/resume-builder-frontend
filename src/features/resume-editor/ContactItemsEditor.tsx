import * as React from "react";
import { ActionIcon, Button, Group, Menu, Stack, TextInput } from "@mantine/core";
import { ArrowLeft, ArrowRight, Github, Globe, Linkedin, Mail, Phone, Plus, Trash2 } from "lucide-react";
import { ResumeContactIcon, ResumeUpdater } from "../../types";
import { useTextFieldValue } from "../common/TextField";
import { useResume } from "./resume-context";
import { ContactItemFragment } from "../../__generated__/graphql";
import Type = ResumeUpdater.Type;

interface ContactItemsEditorProps {
    items: any[];
    onUpdate: (updater: ResumeUpdater) => void;
}

export const reorder = <T,>(list: readonly T[], startIndex: number, endIndex: number): T[] => {
    const result = [...list];

    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return result;
};

const IconMap: Record<ResumeContactIcon, React.ReactNode> = {
    [ResumeContactIcon.Email]: <Mail size={16} />,
    [ResumeContactIcon.Phone]: <Phone size={16} />,
    [ResumeContactIcon.Website]: <Globe size={16} />,
    [ResumeContactIcon.Github]: <Github size={16} />,
    [ResumeContactIcon.LinkedIn]: <Linkedin size={16} />,
};

const ContactItemEditor = ({
    index,
    isLastItem,
    ...item
}: ContactItemFragment & { index: number; isLastItem: boolean }) => {
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
                        borderRadius: "var(--mantine-radius-md)",
                        borderColor: "var(--mantine-color-blue-9)",
                    },
                    input: {
                        fontWeight: 300,
                        fontSize: "var(--mantine-font-size-xs)",
                        color: "var(--mantine-color-gray-7)",
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
                <Menu.Label>{item.value !== "" ? item.value : item.icon}</Menu.Label>
                <Menu.Divider />
                <Menu.Item
                    onClick={() => {
                        mutate({ type: Type.MoveContactItem, oldIndex: index, newIndex: index - 1 });
                    }}
                    disabled={index === 0}
                    leftSection={<ArrowLeft size={16} />}
                >
                    Move Left
                </Menu.Item>
                <Menu.Item
                    onClick={() => {
                        mutate({ type: Type.MoveContactItem, oldIndex: index, newIndex: index + 1 });
                    }}
                    disabled={isLastItem}
                    rightSection={<ArrowRight size={16} />}
                >
                    Move Right
                </Menu.Item>
                <Menu.Divider />
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
        <Stack>
            <Group justify={""} mx={"auto"}>
                {items.map((item, index) => (
                    <ContactItemEditor {...item} index={index} key={index} isLastItem={items.length - 1 === index} />
                ))}
            </Group>
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
        </Stack>
    );
};
