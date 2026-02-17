import { useForm } from "@tanstack/react-form";
import { useRegisterUserMutation } from "../../__generated__/graphql";
import { 
    Button, 
    Modal, 
    TextInput, 
    PasswordInput, 
    Stack, 
    Title, 
    Text, 
    Alert 
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { UserPlus, User, Lock, CheckCircle } from "lucide-react";

export const RegisterUserComponent = () => {
    const [registerStatus, sendRegistration] = useRegisterUserMutation();
    const registeredUser = registerStatus?.data?.registerUser?.username;
    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: async ({ value }) => {
            await sendRegistration({ username: value.username, password: value.password });
        },
    });

    return (
        <>
            <Button variant="outline" onClick={open} leftSection={<UserPlus size={16} />}>
                Register
            </Button>

            <Modal 
                opened={opened} 
                onClose={close} 
                title="Create Account" 
                centered
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                >
                    <Stack gap="md">
                        {registeredUser && (
                            <Alert variant="light" color="green" title="Success" icon={<CheckCircle size={16} />}>
                                User <b>{registeredUser}</b> has been created. You can now sign in.
                            </Alert>
                        )}

                        <form.Field
                            name={"username"}
                            children={(field) => (
                                <TextInput
                                    label="Username"
                                    placeholder="Choose a username"
                                    leftSection={<User size={16} />}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.currentTarget.value)}
                                    required
                                />
                            )}
                        />
                        <form.Field
                            name={"password"}
                            children={(field) => (
                                <PasswordInput
                                    label="Password"
                                    placeholder="Choose a password"
                                    leftSection={<Lock size={16} />}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.currentTarget.value)}
                                    required
                                />
                            )}
                        />
                        <Button type="submit" fullWidth mt="md">
                            Register User
                        </Button>
                    </Stack>
                </form>
            </Modal>
        </>
    );
};