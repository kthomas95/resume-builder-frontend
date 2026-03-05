import {useAtom} from "jotai/react";
import {UserAtom} from "../../atoms/UserAtom";
import {LogOut} from "lucide-react";
import {useNavigate} from "@tanstack/react-router";
import {Avatar, Menu, UnstyledButton} from "@mantine/core";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import {
    useHelloQueryQuery,
    useLoginWithGoogleMutation,
    useLogoutWithGoogleMutation,
} from "../../__generated__/graphql";
import {useEffect} from "react";
import {Maybe} from "purify-ts";
import {hasAtLeast, join, map, split, toUpperCase} from "remeda";


export const UserManagement = () => {
    const [currentUser, setCurrentUser] = useAtom(UserAtom);
    const [_, logout] = useLogoutWithGoogleMutation();
    const navigate = useNavigate();

    const [{data, fetching: fetchingMe}, refetchMe] = useHelloQueryQuery();

    const shouldTryAndGoogleLogin = data && !data.me && !fetchingMe && !currentUser;

    useEffect(() => {
        console.log("useEffect", data);
        if (data) {
            const me = data.me;
            setCurrentUser(prev =>
                    me ? ({
                        username: me.userId.toString(),
                        token: me.userId.toString(),
                        photoUrl: me.photoUrl,
                        name: me.name,

                    }) : prev
            )
        }
    }, [data]);

    const [, loginWithGoogleMutation] = useLoginWithGoogleMutation();

    const logoutUser = () => {
        logout({});
        setCurrentUser(null);
        // .then(refetchMe);
        // We could also call a logout mutation if we want to clear the session cookie on backend
        navigate({to: "/"});
    };

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        const result = await loginWithGoogleMutation({
            token: credentialResponse.credential!!,
        });

        console.log(credentialResponse);
        console.log(result);

        if (result.data?.loginWithGoogle?.success) {
            console.log("Success Login", result.data?.loginWithGoogle);

            const me = result?.data?.loginWithGoogle?.user;


            if (me) {
                setCurrentUser({
                    username: me.userId.toString(),
                    token: me.userId.toString(),
                    photoUrl: me.photoUrl,
                    name: me.name,
                });
            }
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
                <Menu shadow="md" width={200} position="bottom-end" transitionProps={{transition: "pop-top-right"}}>
                    <Menu.Target>
                        <UnstyledButton>
                            <Avatar color="blue" radius="xl" src={currentUser?.photoUrl}>
                                {initials}
                            </Avatar>
                        </UnstyledButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>{currentUser.name}</Menu.Label>
                        {/*<Menu.Item leftSection={<Settings size={14} />}>Settings</Menu.Item>*/}

                        {/*<Menu.Divider />*/}

                        <Menu.Item color="red" leftSection={<LogOut size={14}/>} onClick={logoutUser}>
                            Sign Out
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
        );
    }

    if (shouldTryAndGoogleLogin) {
        return <GoogleLogin onSuccess={handleGoogleSuccess} text={"signin"} size={"medium"}  useOneTap={shouldTryAndGoogleLogin}/>;
    }
};
