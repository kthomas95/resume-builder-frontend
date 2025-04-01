import { EditName } from "./EditName";
import { EditAttributes } from "./EditAttributes";
import { EditEducation } from "./EditEducation";
import { EditWorkExperience } from "./EditWorkExperience";
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
                <EditEducation />
                <hr className={"opacity-30 my-3"} />
                <EditWorkExperience />
                <div className="fixed right-18 bottom-9 flex">
                    <a
                        href={`${import.meta.env.VITE_BUILD_RESUME_URL}${id}`}
                        target={"_blank"}
                        className={buttonStyles({ class: "w-max ml-auto !p-4 !text-base !rounded-full" })}
                    >
                        Build Resume
                    </a>
                </div>
            </div>
        </resumeContext.Provider>
    );
};
