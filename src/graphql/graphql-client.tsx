import { cacheExchange, Client, fetchExchange, Provider, subscriptionExchange } from "urql";
import { PropsWithChildren, useMemo } from "react";
import { createClient as createWSClient, SubscribePayload } from "graphql-ws";
import { useAtomValue } from "jotai/react";
import { UserAtom } from "../atoms/UserAtom";

const wsClient = createWSClient({
    url: import.meta.env.VITE_WS_URL ?? "wss://resume-api.kthomas.me/subscriptions",
    keepAlive: 1_000,
});

export const graphQlClient = new Client({
    url: import.meta.env.VITE_GQL_URL ?? "https://resume-api.kthomas.me/graphql",
    fetchOptions: {
        credentials: "include",
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

export const GraphQLProvider = ({ children }: PropsWithChildren) => {
    return <Provider value={graphQlClient}>{children}</Provider>;
};
