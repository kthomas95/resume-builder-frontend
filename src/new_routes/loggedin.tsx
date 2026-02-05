import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

export const loggedInResponseSchema = v.object({
    id: v.string(), // Changed to string as most IDs in this app are now strings
    name: v.string(),
    token: v.string(),
});

export const Route = createFileRoute("/loggedin")({
    component: RouteComponent,
    validateSearch: (search) => v.parse(loggedInResponseSchema, search),
});

function RouteComponent() {
    const search = Route.useSearch();
    return (
        <div style={{ padding: '20px' }}>
            <h1>Login Successful</h1>
            <pre>{JSON.stringify(search, null, 2)}</pre>
        </div>
    );
}
