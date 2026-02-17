import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ViewAndEditResume } from "../features/resume-editor/ViewAndEditResume";

export const Route = createFileRoute("/$resumeId/edit")({
    component: AboutComponent,
});

function AboutComponent() {
    // return <div>Edit</div>
    return <ViewAndEditResume id={Route.useParams().resumeId} />;
}
