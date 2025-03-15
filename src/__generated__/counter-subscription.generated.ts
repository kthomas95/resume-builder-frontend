import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const CounterSubscriptionDocument = gql`
    subscription CounterSubscription {
  counter
}
    `;

export function useCounterSubscriptionSubscription<TData = CounterSubscriptionSubscription>(options?: Omit<Urql.UseSubscriptionArgs<CounterSubscriptionSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<CounterSubscriptionSubscription, TData>) {
  return Urql.useSubscription<CounterSubscriptionSubscription, TData, CounterSubscriptionSubscriptionVariables>({ query: CounterSubscriptionDocument, ...options }, handler);
};
export type CounterSubscriptionSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type CounterSubscriptionSubscription = { counter: number };
