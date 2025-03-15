import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useHelloQueryQuery } from "../__generated__/hello-query.generated";
import { useCounterSubscriptionSubscription } from "../__generated__/counter-subscription.generated";
import { useNewResumeMutation } from "../__generated__/new-resume.generated";

export const Route = createFileRoute("/")({
    component: HomeComponent,
});

function HomeComponent() {
    const [data] = useHelloQueryQuery();
    const createResume = useNewResumeMutation()[1];
    const nav = useNavigate();

    const timeOnPage = useCounterSubscriptionSubscription()[0].data?.counter;
    return (
        <div className="p-2 flex h-dvh">
            <button
                className={
                    "bg-sky-600 hover:bg-sky-500 text-sky-50 p-4 shadow-md rounded-md font-semibold text-lg m-auto"
                }
                onClick={() => {
                    createResume({}).then((result) => {
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
}
