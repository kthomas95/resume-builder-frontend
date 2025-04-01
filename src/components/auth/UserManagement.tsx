import { useAtom } from "jotai/react";
import { UserAtom } from "../../atoms/UserAtom";
import { UserIcon } from "@heroicons/react/24/outline";
import { Dialog } from "radix-ui";
import { dialogStyles } from "../../styles/dialog";
import { LoginForm } from "./LoginUser";
import { RegisterUserDocument } from "../../__generated__/graphql";
import { RegisterUserComponent } from "./RegisterUserComponent";
import { useNavigate } from "@tanstack/react-router";

const RegisterForm = () => {
    return <form>Register</form>;
};

export const UserManagement = () => {
    const [currentUser, setCurrentUser] = useAtom(UserAtom);
    const navigate = useNavigate();
    const logoutUser = () => {
        setCurrentUser(null);
        navigate({to: "/"});

    }

    if (currentUser) {
        return (
            <div className={"flex items-center gap-2"}>
                <UserIcon className={"size-5"} />
                {currentUser.username}
                <button className={"ml-4"} onClick={logoutUser}>
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div className={"flex items-center gap-7"}>
            <Dialog.Root>
                <Dialog.Trigger>Sign In</Dialog.Trigger>
                <Dialog.Content className={dialogStyles.content()}>
                    <LoginForm />
                </Dialog.Content>
            </Dialog.Root>
            <RegisterUserComponent />
        </div>
    );
};
