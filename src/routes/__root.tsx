import * as React from "react";
import { Link, Outlet, createRootRoute, LinkComponent } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../tailwind.css";
import { GraphQLProvider } from "../graphql/graphql-client";
import { UserManagement } from "../components/auth/UserManagement";
import { UserAtom } from "../atoms/UserAtom";
import { useAtomValue } from "jotai/react";
import { DropdownMenu } from "radix-ui";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const currentUser = useAtomValue(UserAtom);
    return (
        <GraphQLProvider>
            <div className={"px-8 py-6 shadow-sm mb-8 flex gap-3 justify-between"}>
                <div className="flex gap-3">
                    <Link to={"/"}>{currentUser ? "Your Resumes" : "Home"}</Link>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger className={"px-4 text-right focus:outline-none"}>
                            Resume Components
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content className={"flex flex-col bg-white rounded-md shadow-md"}>
                            <DropdownMenu.DropdownMenuItem asChild>
                                <Link to={"/summaries"} className={"p-3"}>
                                    Summaries
                                </Link>
                            </DropdownMenu.DropdownMenuItem>
                            <DropdownMenu.DropdownMenuItem asChild>
                                <Link to={"/employment"} className={"p-3"}>
                                    Work History
                                </Link>
                            </DropdownMenu.DropdownMenuItem>
                            <DropdownMenu.DropdownMenuItem asChild>
                                <Link to={"/education"} className={"p-3"}>
                                    Education
                                </Link>
                            </DropdownMenu.DropdownMenuItem>
                            <DropdownMenu.DropdownMenuItem asChild>
                                <Link to={"/summaries"} className={"p-3"}>
                                    Projects
                                </Link>
                            </DropdownMenu.DropdownMenuItem>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>

                <UserManagement />
            </div>
            <Outlet />
        </GraphQLProvider>
    );
}
