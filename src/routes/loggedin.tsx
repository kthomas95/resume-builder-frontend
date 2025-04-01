import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

export const loggedInResponseSchema = v.object({
    id: v.number(),
    name: v.string(),
    token: v.string(),
});

export const Route = createFileRoute("/loggedin")({
    component: RouteComponent,
    validateSearch: loggedInResponseSchema,
});

function RouteComponent() {
    const params = Route.useParams();
    const search = Route.useSearch();
    const context = Route.useRouteContext();
    return <div>{JSON.stringify({ context, params, search })}</div>;
}
