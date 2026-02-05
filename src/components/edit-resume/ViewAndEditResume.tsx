import { EditName } from "./EditName";
import { EditAttributes } from "./EditAttributes";
import { EditEducation } from "../education/EditEducation";
import { EditWorkExperience } from "../employment/EditWorkExperience";
import * as React from "react";
import { EditSummary } from "./EditSummary";
import { resumeContext, useGetResume } from "./resume-context";
import { EditDescription } from "./EditDescription";
import { useTitle } from "react-use";
import { Stack, Divider, Affix, Button, rem, Center, Loader } from "@mantine/core";
import { Download } from "lucide-react";

export const ViewAndEditResume = ({ id }: { id: string }) => {
    const resume = useGetResume(id);

    useTitle(resume?.description ?? "Loading Resume");
    
    if (!resume) {
        return (
            <Center h="50vh">
                <Stack align="center">
                    <Loader size="md" />
                    <div>Loading Resume Data for {id}</div>
                </Stack>
            </Center>
        );
    }

    return (
        <resumeContext.Provider value={resume}>
            <Stack gap="md" pb={rem(120)}>
                <EditDescription />
                <EditName />
                <EditAttributes />
                <EditSummary />
                
                <Divider my="xl" label="Sections" labelPosition="center" />
                
                {resume.sections.map((section, index) => {
                    if (section.__typename === "EducationRecords") {
                        return <EditEducation key={index} {...section} />;
                    }
                    if (section.__typename === "EmploymentRecords") {
                        return <EditWorkExperience key={index} {...section} />;
                    }
                    return null;
                })}
                
                <Affix position={{ bottom: 40, right: 40 }}>
                    <Button
                        component="a"
                        href={`${import.meta.env.VITE_BUILD_RESUME_URL}${id}`}
                        target="_blank"
                        size="lg"
                        radius="xl"
                        leftSection={<Download size={20} />}
                        shadow="xl"
                    >
                        Build PDF
                    </Button>
                </Affix>
            </Stack>
        </resumeContext.Provider>
    );
};