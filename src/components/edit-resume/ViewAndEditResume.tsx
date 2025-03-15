import { EditName } from "./EditName";
import { EditAttributes } from "./EditAttributes";
import { EditEducation } from "./EditEducation";
import { EditWorkExperience } from "./EditWorkExperience";
import * as React from "react";
import { EditSummary } from "./EditSummary";
import { resumeContext, useGetResume } from "./resume-context";
import { buttonStyles } from "../../styles/button";

export const ViewAndEditResume = ({ id }: { id: string }) => {
    const resume = useGetResume(id);

    if (!resume) return <div>Loading Resume Data</div>;

    return (
        <resumeContext.Provider value={resume}>
            <div className={"px-5 pt-5 pb-20 mx-auto flex flex-col gap-4"}>
                <EditName />
                <EditAttributes />
                <EditSummary />
                <hr className={"opacity-30 my-3"} />
                <EditEducation />
                <hr className={"opacity-30 my-3"} />
                <EditWorkExperience />
                <div className="fixed inset-x-0 bottom-0 flex m-4">
                    <a
                        href={`https://resume-api.kthomas.me/build-resume/${id}`}
                        target={"_blank"}
                        className={buttonStyles({ class: "w-max ml-auto !p-4 !text-base" })}
                    >
                        Build Resume
                    </a>
                </div>
            </div>
        </resumeContext.Provider>
    );
};
