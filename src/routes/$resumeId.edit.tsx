import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ViewAndEditResume } from "../components/edit-resume/ViewAndEditResume";

export const Route = createFileRoute("/$resumeId/edit")({
    component: AboutComponent,
});

function AboutComponent() {
    return <ViewAndEditResume id={Route.useParams().resumeId} />;
}
