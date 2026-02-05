import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { GraphQLProvider } from "../graphql/graphql-client";
import { UserManagement } from "../components/auth/UserManagement";
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
                <AppShell
                    header={{ height: 70 }}
                    padding="md"
                >
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

                                    <Menu shadow="md" width={200} trigger="hover" openDelay={100} closeDelay={400}>
                                        <Menu.Target>
                                            <Button variant="subtle" rightSection={<ChevronDown size={14} />}>
                                                Components
                                            </Button>
                                        </Menu.Target>

                                        <Menu.Dropdown>
                                            <Menu.Label>Library</Menu.Label>
                                            <Menu.Item leftSection={<Briefcase size={14} />} component={Link} to="/employment">
                                                Work History
                                            </Menu.Item>
                                            <Menu.Item leftSection={<GraduationCap size={14} />} component={Link} to="/education">
                                                Education
                                            </Menu.Item>
                                            <Menu.Item leftSection={<FileText size={14} />} component={Link} to="/summaries">
                                                Summaries
                                            </Menu.Item>
                                            <Menu.Divider />
                                            <Menu.Label>Project Layouts</Menu.Label>
                                            <Menu.Item leftSection={<Layout size={14} />}>
                                                Manage Templates
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
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
