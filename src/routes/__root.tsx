import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../tailwind.css";
import { GraphQLProvider } from "../graphql/graphql-client";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <GraphQLProvider>
            <Outlet />
        </GraphQLProvider>
    );
}
