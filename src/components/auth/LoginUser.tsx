import { useReducer } from "react";
import { useForm } from "@tanstack/react-form";
import { textFieldStyles } from "../../styles/textfield";
import { useAtom } from "jotai/react";
import { UserAtom } from "../../atoms/UserAtom";
import { Dialog, VisuallyHidden } from "radix-ui";
import { LoginMutation, useLoginMutation } from "../../__generated__/graphql";

const useLogin = () => {
    const [currentUser, setCurrentUser] = useAtom(UserAtom);
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
    const [state, dispatch] = useReducer((prev) => prev, {
        username: "",
        password: "",
    });

    const { loginUser, response } = useLogin();

    const loginForm = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            const repsonse = await loginUser(value);
        },
    });

    return (
        <form
            className={"p-2 flex flex-col gap-3"}
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                loginForm.handleSubmit();
            }}
        >
            <Dialog.Title className={"font-bold"}>Login</Dialog.Title>
            <VisuallyHidden.Root>
                <Dialog.Description>Login User</Dialog.Description>
            </VisuallyHidden.Root>
            <loginForm.Field
                name={"username"}
                children={(field) => (
                    <fieldset className={textFieldStyles.fieldset()}>
                        <label htmlFor={field.name} className={textFieldStyles.label()}>
                            Username
                        </label>
                        <input
                            type={"text"}
                            id={field.name}
                            value={field.state.value}
                            className={textFieldStyles.input()}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                    </fieldset>
                )}
            />
            <loginForm.Field
                name={"password"}
                children={(field) => (
                    <fieldset className={textFieldStyles.fieldset()}>
                        <label htmlFor={field.name} className={textFieldStyles.label()}>
                            Password
                        </label>
                        <input
                            type={"password"}
                            id={field.name}
                            value={field.state.value}
                            className={textFieldStyles.input()}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                    </fieldset>
                )}
            />
            <button type={"submit"} className={"btn btn-primary"}>
                Login
            </button>
            <div>{response?.__typename}</div>
        </form>
    );
};
