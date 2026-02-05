import { createFileRoute } from "@tanstack/react-router";
import { ViewEmploymentComponents } from "../components/employment/ViewEmploymentComponents";

export const Route = createFileRoute("/employment")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <ViewEmploymentComponents />
        </div>
    );
}
