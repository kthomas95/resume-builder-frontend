import { useAtom } from "jotai/react";
import { UserAtom } from "../../atoms/UserAtom";
import { User as UserIcon, LogOut, Settings } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button, Modal, Group, Avatar, Menu, Text, UnstyledButton, Divider, Stack, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { gql, useMutation } from "urql";
import { useHelloQueryQuery, useLoginWithGoogleMutation } from "../../__generated__/graphql";
import { useEffect } from "react";
import { Maybe } from "purify-ts";
import { first, hasAtLeast, join, map, split, toUpperCase, truncate } from "remeda";

export const UserManagement = () => {
    const [currentUser, setCurrentUser] = useAtom(UserAtom);
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();

    const me = useHelloQueryQuery()[0].data?.me;

    useEffect(() => {
        if (me) {
            setCurrentUser((prev) =>
                prev
                    ? {
                          username: prev.username,
                          token: prev.token,
                          photoUrl: me.photoUrl,
                          name: me.name,
                      }
                    : null,
            );
        }
    }, [me]);

    const [, loginWithGoogleMutation] = useLoginWithGoogleMutation();

    const logoutUser = () => {
        setCurrentUser(null);
        // We could also call a logout mutation if we want to clear the session cookie on backend
        navigate({ to: "/" });
    };

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        const result = await loginWithGoogleMutation({
            token: credentialResponse.credential!!,
        });

        console.log(credentialResponse);
        console.log(result);

        if (result.data?.loginWithGoogle?.success) {
            // After successful login, we could fetch user info or just set a placeholder
            // Since we use sessions, the backend knows who we are.
            // For the sake of the current UI, let's set a minimal user object
            console.log("Success Login", result.data?.loginWithGoogle);
            setCurrentUser({
                username: "Google User", // Ideally fetch this
                token: "SESSION_MANAGED",
            });
            close();
            window.location.reload(); // Reload to ensure all components see the session
        } else {
            console.error("Login failed:", result);
        }
    };

    if (currentUser) {
        const initials = Maybe.fromNullable(currentUser.name)
            .map(split(" "))
            .map(map((x) => x[0]))
            .filter(hasAtLeast(1))
            .map(join(""))
            .map<string>(toUpperCase())
            .orDefault(currentUser?.username?.charAt(0));

        return (
            <Menu shadow="md" width={200} position="bottom-end" transitionProps={{ transition: "pop-top-right" }}>
                <Menu.Target>
                    <UnstyledButton>
                        <Avatar color="blue" radius="xl" src={currentUser?.photoUrl}>
                            {initials}
                        </Avatar>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item leftSection={<UserIcon size={14} />}>Profile: {currentUser.username}</Menu.Item>
                    <Menu.Item leftSection={<Settings size={14} />}>Settings</Menu.Item>

                    <Menu.Divider />

                    <Menu.Item color="red" leftSection={<LogOut size={14} />} onClick={logoutUser}>
                        Log out
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        );
    }

    return (
        <>
            <Group>
                <Button variant="light" onClick={open}>
                    Sign In
                </Button>
                <Button onClick={open}>Sign Up</Button>
            </Group>

            <Modal
                opened={opened}
                onClose={close}
                title="Authentication"
                centered
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
            >
                <Stack py="md">
                    <Box style={{ display: "flex", justifyContent: "center" }}>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => console.log("Login Failed")}
                            useOneTap
                        />
                    </Box>

                    <Divider label="or" labelPosition="center" my="sm" />

                    <Text size="sm" c="dimmed" ta="center" fs="italic">
                        Traditional login is currently being upgraded.
                    </Text>

                    <Button variant="subtle" fullWidth onClick={close}>
                        Cancel
                    </Button>
                </Stack>
            </Modal>
        </>
    );
};
