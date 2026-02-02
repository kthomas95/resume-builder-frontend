import { EditName } from "./EditName";
import { EditAttributes } from "./EditAttributes";
import { EditEducation } from "../education/EditEducation";
import { EditWorkExperience } from "../employment/EditWorkExperience";
import * as React from "react";
import { EditSummary } from "./EditSummary";
import { resumeContext, useGetResume } from "./resume-context";
import { buttonStyles } from "../../styles/button";
import { EditDescription } from "./EditDescription";
import { useTitle } from "react-use";

export const ViewAndEditResume = ({ id }: { id: string }) => {
    const resume = useGetResume(id);

    useTitle(resume?.description ?? "Loading Resume");
    if (!resume) return <div>Loading Resume Data for {id}</div>;

    return (
        <resumeContext.Provider value={resume}>
            <div className={"px-5 pb-32 mx-auto flex flex-col gap-4"}>
                <EditDescription />
                <EditName />
                <EditAttributes />
                <EditSummary />
                <hr className={"opacity-30 my-3"} />
                {resume.sections.map((section) => {
                    if (section.__typename === "EducationRecords") {
                        return <EditEducation {...section} />;
                    }
                    if (section.__typename === "EmploymentRecords") {
                        return <EditWorkExperience {...section} />;
                    }
                    return null;
                })}
                <div className="fixed right-18 bottom-9 flex">
                    <a
                        href={`${import.meta.env.VITE_BUILD_RESUME_URL}${id}`}
                        target={"_blank"}
                        className={"btn btn-primary text-lg p-3 !rounded-full"}
                    >
                        Build Resume
                    </a>
                </div>
            </div>
        </resumeContext.Provider>
    );
};
