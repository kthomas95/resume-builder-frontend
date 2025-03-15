import { Client, cacheExchange, fetchExchange, Provider, subscriptionExchange } from "urql";
import { Component, FunctionComponent, PropsWithChildren } from "react";
import { SubscribePayload, createClient as createWSClient } from "graphql-ws";
const wsClient = createWSClient({
    url: "http://10.0.0.183:8080/subscriptions",
});

const client = new Client({
    url: "http://10.0.0.183:8080/graphql",
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

export const GraphQLProvider = ({ children }: PropsWithChildren) => <Provider value={client}>{children}</Provider>;
