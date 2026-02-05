import { cacheExchange, Client, fetchExchange, Provider, subscriptionExchange } from "urql";
import { PropsWithChildren, useMemo } from "react";
import { createClient as createWSClient, SubscribePayload } from "graphql-ws";
import { useAtomValue } from "jotai/react";
import { UserAtom } from "../atoms/UserAtom";

const useClient = () => {
    const user = useAtomValue(UserAtom);

    return useMemo(() => {
        const headers = user ? { Authorization: `Bearer ${user.token}` } : null;

        const wsClient = createWSClient({
            // url: import.meta.env.VITE_WS_URL ?? "wss://resume-api.kthomas.me/subscriptions",
            url: "http://localhost:8090/subscriptions",
            connectionParams: {
                headers,
            },
        });

        return new Client({
            url: import.meta.env.VITE_GQL_URL,
            fetchOptions: {
                credentials: 'include',
            },
            exchanges: [
                cacheExchange,
                fetchExchange,
                subscriptionExchange({
                    forwardSubscription: (request) => {
                        const input: SubscribePayload = {
                            ...request,
                            query: request.query || "",
                        };
                        return {
                            subscribe: (sink) => ({
                                unsubscribe: wsClient.subscribe(input, sink),
                            }),
                        };
                    },
                }),
            ],
        });
    }, [user?.token]);
};

export const GraphQLProvider = ({ children }: PropsWithChildren) => {
    const client = useClient();
    return <Provider value={client}>{children}</Provider>;
};
