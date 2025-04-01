import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../tailwind.css";
import { GraphQLProvider } from "../graphql/graphql-client";
import { UserManagement } from "../components/auth/UserManagement";
import { UserAtom } from "../atoms/UserAtom";
import { useAtomValue } from "jotai/react";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const currentUser = useAtomValue(UserAtom);
    return (
        <GraphQLProvider>
            <div className={"px-8 py-6 shadow-sm mb-8 flex gap-3 justify-between"}>
                <Link to={"/"}>{currentUser ? "Your Resumes" : "Home"}</Link>

                <UserManagement />
            </div>
            <Outlet />
        </GraphQLProvider>
    );
}
