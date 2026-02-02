import { Dialog } from "radix-ui";
import { dialogStyles } from "../../styles/dialog";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { textFieldStyles } from "../../styles/textfield";
import { useRegisterUserMutation } from "../../__generated__/graphql";
import { buttonStyles } from "../../styles/button";

export const RegisterUserComponent = () => {
    const [registerStatus, sendRegistration] = useRegisterUserMutation();
    const registeredUser = registerStatus?.data?.registerUser?.username;
    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: async ({ value }) => {
            sendRegistration({ username: value.username, password: value.password });
        },
    });
    return (
        <Dialog.Root>
            <Dialog.Trigger>Register User</Dialog.Trigger>
            <Dialog.Overlay className={dialogStyles.overlay()} />
            <Dialog.Content className={dialogStyles.content({ class: "flex flex-col gap-3" })}>
                <form.Field
                    name={"username"}
                    children={(props) => (
                        <input
                            className={textFieldStyles.input()}
                            placeholder={"Username"}
                            value={props.state.value}
                            onChange={(e) => props.handleChange(e.target.value)}
                            type={"text"}
                        />
                    )}
                />
                <form.Field
                    name={"password"}
                    children={(props) => (
                        <input
                            className={textFieldStyles.input()}
                            placeholder={"Password"}
                            value={props.state.value}
                            onChange={(e) => props.handleChange(e.target.value)}
                            type={"password"}
                        />
                    )}
                />
                <button onClick={form.handleSubmit} className={"btn btn-primary"}>
                    Register User
                </button>
                {registeredUser && (
                    <div>
                        User <b>{registeredUser}</b> has been created.
                    </div>
                )}
            </Dialog.Content>
        </Dialog.Root>
    );
};
