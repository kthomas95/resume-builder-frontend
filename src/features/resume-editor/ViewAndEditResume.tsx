import * as React from "react";
import {
    Stack,
    Divider,
    Affix,
    Button,
    rem,
    Center,
    Loader,
    Container,
    Group,
    Title,
    ActionIcon,
    Menu,
    Text,
} from "@mantine/core";
import { Download, Plus, Settings, Trash2 } from "lucide-react";
import { useGetResumeSubscription } from "../../__generated__/graphql";
import { useModifyResume } from "./use-modify-resume";
import { ResumeContext } from "./resume-context";
import { ResumeTitleEditor } from "./ResumeTitleEditor";
import { ContactItemsEditor } from "./ContactItemsEditor";
import { GenericSection } from "./section/GenericSection";
import { ResumeSettingsEditor } from "./ResumeSettingsEditor";
import { useTitle } from "react-use";
import { ResumeUpdater, SettingsUpdater } from "../../types";

export const ViewAndEditResume = ({ id }: { id: string }) => {
    const [{ data, fetching, error }] = useGetResumeSubscription({ variables: { resumeId: id } });
    const mutate = useModifyResume(id);

    const resume = data?.subscribeToResume;
    useTitle(resume?.title || "Loading Resume");

    if (fetching) {
        return (
            <Center h="50vh">
                <Stack align="center">
                    <Loader size="md" />
                    <Text>Loading Resume Data...</Text>
                </Stack>
            </Center>
        );
    }

    if (error || !resume) {
        return (
            <Center h="50vh">
                <Stack align="center">
                    <Title order={3} c="red">
                        Error Loading Resume
                    </Title>
                    <Text>{error?.message || "Resume not found"}</Text>
                </Stack>
            </Center>
        );
    }

    const resumeData = resume.resumeData;

    return (
        <ResumeContext.Provider value={{ resume, mutate, resumeId: id }}>
            <Stack gap="xl" pb={rem(120)}>
                <Group justify="space-between" align="flex-start">
                    <Stack gap={0}>
                        <Title order={2}>{resume.title}</Title>
                        <Text c="dimmed">{resume.description}</Text>
                    </Stack>
                    <Group>
                        <Button
                            component="a"
                            href={`${import.meta.env.VITE_BUILD_RESUME_URL}${id}`}
                            target="_blank"
                            variant="filled"
                            leftSection={<Download size={20} />}
                        >
                            Preview PDF
                        </Button>
                    </Group>
                </Group>

                <Divider />

                <ResumeTitleEditor />

                <ContactItemsEditor items={resumeData.contactItems} onUpdate={mutate} />

                <ResumeSettingsEditor />

                <Divider label="Sections" labelPosition="center" />

                <Stack gap="lg">
                    {resumeData.sections.map((section, index) => (
                        <GenericSection
                            key={index}
                            title={section.title}
                            contentItems={section.contentItems}
                            onUpdate={(updater) =>
                                mutate({
                                    type: ResumeUpdater.Type.UpdateSection,
                                    index,
                                    updater,
                                })
                            }
                            onRemove={() =>
                                mutate({
                                    type: ResumeUpdater.Type.RemoveSection,
                                    index,
                                })
                            }
                        />
                    ))}
                </Stack>

                <Group justify="center" py="xl">
                    <Button
                        size="md"
                        variant="outline"
                        leftSection={<Plus size={20} />}
                        onClick={() =>
                            mutate({
                                type: ResumeUpdater.Type.AddSection,
                                section: {
                                    title: "New Section",
                                    contentItems: [],
                                },
                            })
                        }
                    >
                        Add New Section
                    </Button>
                </Group>

                <Affix position={{ bottom: 40, right: 40 }}>
                    <Button
                        component="a"
                        href={`${import.meta.env.VITE_BUILD_RESUME_URL}${id}`}
                        target="_blank"
                        size="lg"
                        radius="xl"
                        leftSection={<Download size={20} />}
                        style={{ boxShadow: "var(--mantine-shadow-xl)" }}
                    >
                        Build PDF
                    </Button>
                </Affix>
            </Stack>
        </ResumeContext.Provider>
    );
};
