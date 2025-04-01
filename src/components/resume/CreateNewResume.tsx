import { useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useState } from "react";
import { textFieldStyles } from "../../styles/textfield";
import { useNewResumeMutation } from "../../__generated__/graphql";

export const CreateNewResume = () => {
    const createResume = useNewResumeMutation()[1];
    const nav = useNavigate();
    const [description, setDescription] = useState("");

    return (
        <div className="flex gap-4 justify-center h-10">
            <fieldset className="h-full flex">
                <input
                    type={"text"}
                    className={textFieldStyles.input({ class: "h-full" })}
                    placeholder={"Resume Description"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </fieldset>

            <button
                className={
                    "bg-sky-600 ring-sky-600 ring-2 hover:bg-sky-500 px-4 py-2 text-sky-50 whitespace-nowrap shadow-md rounded-md font-semibold"
                }
                onClick={() => {
                    createResume({ description }).then((result) => {
                        const resumeId = result?.data?.newResume;
                        if (resumeId) {
                            nav({ to: "/$resumeId/edit", params: { resumeId } });
                        }
                    });
                }}
            >
                Create New Resume
            </button>
        </div>
    );
};
