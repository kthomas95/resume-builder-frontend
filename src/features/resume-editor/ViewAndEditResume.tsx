import * as React from "react";
import { Center, Divider, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { useGetResumeSubscription } from "../../__generated__/graphql";
import { useModifyResume } from "./use-modify-resume";
import { ResumeContext } from "./resume-context";
import { ResumeTitleEditor } from "./ResumeTitleEditor";
import { ContactItemsEditor } from "./ContactItemsEditor";
import { GenericSection } from "./section/GenericSection";
import { useTitle } from "react-use";
import { AddNewSectionButton } from "./section/AddNewSectionButton";
import { ResumeInfoBar } from "./ResumeInfoBar";
import { EditSummary } from "./EditSummary";
import { DivideChildren } from "../common/DivideChildren";
import { SectionIndexContext } from "./section/section-context";

export const ViewAndEditResume = ({ id }: { id: string }) => {
    const [{ data, fetching, error }] = useGetResumeSubscription({ variables: { resumeId: id } });
    const mutate = useModifyResume(id);

    const resume = data?.subscribeToResume;
    useTitle(`> ${resume?.title}` || "Loading Resume");

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

    return (
        <ResumeContext.Provider value={{ resume, mutate, resumeId: id }}>
            <Stack gap="xl" style={{ "--font-resume-heading": "Merriweather Variable" }}>
                <ResumeInfoBar />

                <Divider />

                <ResumeTitleEditor />

                <ContactItemsEditor />

                <EditSummary />

                <Divider label="Sections" labelPosition="center" />

                <Stack gap="lg">
                    <DivideChildren divider={<Divider my={"xl"} />}>
                        {resume.resumeData.sections.map((section, index) => (
                            <SectionIndexContext value={index} key={index}>
                                <GenericSection {...section} />
                            </SectionIndexContext>
                        ))}
                    </DivideChildren>
                </Stack>

                <Group justify="center" py="xl">
                    <AddNewSectionButton />
                </Group>
            </Stack>
        </ResumeContext.Provider>
    );
};
