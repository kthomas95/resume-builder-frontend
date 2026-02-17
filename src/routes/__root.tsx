import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { GraphQLProvider } from "../graphql/graphql-client";
import { UserManagement } from "../features/auth/UserManagement";
import { UserAtom } from "../atoms/UserAtom";
import { useAtomValue } from "jotai/react";
import { MantineProvider, createTheme, AppShell, Group, Button, Menu, Text, Container, Title } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ChevronDown, FileText, GraduationCap, Briefcase, Layout } from "lucide-react";
import "../index.css";

const theme = createTheme({
    primaryColor: "blue",
    fontFamily: "Inter, sans-serif",
});

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const currentUser = useAtomValue(UserAtom);

    return (
        <MantineProvider theme={theme}>
            <Notifications />
            <GraphQLProvider>
                <AppShell header={{ height: 70 }} padding="md">
                    <AppShell.Header px="xl">
                        <Group h="100%" justify="space-between">
                            <Group>
                                <Title order={3} c="blue" style={{ letterSpacing: "-0.5px" }}>
                                    RESUME BUILDER
                                </Title>

                                <Group ml="xl" gap="md" visibleFrom="sm">
                                    <Button variant="subtle" component={Link} to="/">
                                        {currentUser ? "Your Resumes" : "Home"}
                                    </Button>
                                </Group>
                            </Group>

                            <UserManagement />
                        </Group>
                    </AppShell.Header>

                    <AppShell.Main>
                        <Container size="lg" py="xl">
                            <Outlet />
                        </Container>
                    </AppShell.Main>
                </AppShell>
            </GraphQLProvider>
        </MantineProvider>
    );
}
