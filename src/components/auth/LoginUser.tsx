import { useForm } from "@tanstack/react-form";
import { useAtom } from "jotai/react";
import { UserAtom } from "../../atoms/UserAtom";
import { LoginMutation, useLoginMutation } from "../../__generated__/graphql";
import { 
    TextInput, 
    PasswordInput, 
    Button, 
    Stack, 
    Title, 
    Text, 
    Alert 
} from "@mantine/core";
import { AlertCircle, Lock, User } from "lucide-react";

const useLogin = () => {
    const [, setCurrentUser] = useAtom(UserAtom);
    const [mutationResponse, sendMutation] = useLoginMutation();

    const loginUser = async (loginProps: {
        username: string;
        password: string;
    }): Promise<LoginMutation["login"] | undefined> => {
        const result = await sendMutation(loginProps);
        const loginResponse = result?.data?.login;
        if (loginResponse?.__typename === "Success") {
            setCurrentUser({ username: loginResponse.username, token: loginResponse.token });
        }
        return loginResponse;
    };
    return { loginUser, response: mutationResponse?.data?.login };
};

export const LoginForm = () => {
    const { loginUser, response } = useLogin();

    const loginForm = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            await loginUser(value);
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                loginForm.handleSubmit();
            }}
        >
            <Stack gap="md">
                <Title order={3}>Sign In</Title>
                
                {response?.__typename && response?.__typename !== "Success" && (
                    <Alert variant="light" color="red" title="Login Failed" icon={<AlertCircle size={16} />}>
                        {response.__typename === "InvalidUsername" ? "Username not found." : "Incorrect password."}
                    </Alert>
                )}

                <loginForm.Field
                    name={"username"}
                    children={(field) => (
                        <TextInput
                            label="Username"
                            placeholder="Your username"
                            leftSection={<User size={16} />}
                            id={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.currentTarget.value)}
                            required
                        />
                    )}
                />
                <loginForm.Field
                    name={"password"}
                    children={(field) => (
                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            leftSection={<Lock size={16} />}
                            id={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.currentTarget.value)}
                            required
                        />
                    )}
                />
                <Button type="submit" fullWidth mt="md">
                    Login
                </Button>
            </Stack>
        </form>
    );
};