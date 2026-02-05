import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai/react";
import { UserAtom } from "../atoms/UserAtom";
import { useTitle } from "react-use";
import { Title, Text, Button, Group, Container, Stack, Box, Avatar } from "@mantine/core";
import { FileText, Plus, Rocket } from "lucide-react";
import { useHelloQueryQuery } from "../__generated__/graphql";

export const Route = createFileRoute("/")({
    component: HomeComponent,
});

function HomeComponent() {
    const user = useAtomValue(UserAtom);
    const hello = useHelloQueryQuery();
    useTitle("Your Resumes");

    if (!user) {
        return (
            <Container size="md" py={80}>
                <Stack align="center" gap="xl" ta="center">
                    <Box>
                        <Title order={1} size={56} style={{ fontWeight: 900 }}>
                            Build your{" "}
                            <Text
                                component="span"
                                c="blue"
                                inherit
                                variant="gradient"
                                gradient={{ from: "blue", to: "cyan" }}
                            >
                                perfect
                            </Text>{" "}
                            resume.
                        </Title>
                        <Text size="xl" c="dimmed" mt="md" maw={600} mx="auto">
                            Create professional, job-winning resumes in minutes with our Typst-powered builder.
                        </Text>
                    </Box>

                    <Group gap="md">
                        <Button size="xl" radius="md" leftSection={<Rocket size={20} />}>
                            Get Started
                        </Button>
                        <Button size="xl" radius="md" variant="default">
                            View Templates
                        </Button>
                    </Group>
                </Stack>
            </Container>
        );
    }

    return (
        <div>
            You are logged in! Welcome {user.token} {JSON.stringify(hello[0]?.data?.me)}
        </div>
    );

    // return (
    //     <Stack gap="xl">
    //         <Group justify="space-between" align="center">
    //             <Title order={2} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    //                 <FileText size={28} color="var(--mantine-color-blue-filled)" />
    //                 Your Resumes
    //             </Title>
    //             <CreateNewResume />
    //         </Group>

    //         <YourAvailableResumes />
    //     </Stack>
    // );
}
