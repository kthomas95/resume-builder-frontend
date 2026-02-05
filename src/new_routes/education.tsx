import { createFileRoute } from "@tanstack/react-router";
import { ManageEducationComponents } from "../components/education/ManageEducationComponents";

export const Route = createFileRoute("/education")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ManageEducationComponents />;
}
