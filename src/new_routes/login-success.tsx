import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai/react";
import { UserAtom } from "../atoms/UserAtom";
import { useEffect } from "react";
import { Loader, Center, Stack, Text } from "@mantine/core";
import * as v from "valibot";

const loginSuccessSchema = v.object({
    token: v.string(),
    email: v.string([v.email()]),
});

export const Route = createFileRoute("/login-success")({
    validateSearch: (search) => v.parse(loginSuccessSchema, search),
    component: LoginSuccessComponent,
});

function LoginSuccessComponent() {
    const { token, email } = Route.useSearch();
    const [, setUser] = useAtom(UserAtom);
    const navigate = useNavigate();

    useEffect(() => {
        if (token && email) {
            setUser({
                token,
                username: email,
            });
            setTimeout(() => {
                navigate({ to: "/" });
            }, 1000);
        }
    }, [token, email, setUser, navigate]);

    return (
        <Center h="60vh">
            <Stack align="center" gap="md">
                <Loader size="xl" variant="dots" />
                <Text size="lg" fw={500} c="blue">Finalizing your login...</Text>
            </Stack>
        </Center>
    );
}
