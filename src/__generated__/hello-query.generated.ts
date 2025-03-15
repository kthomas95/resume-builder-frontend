import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const HelloQueryDocument = gql`
    query HelloQuery {
  hello
}
    `;

export function useHelloQueryQuery(options?: Omit<Urql.UseQueryArgs<HelloQueryQueryVariables>, 'query'>) {
  return Urql.useQuery<HelloQueryQuery, HelloQueryQueryVariables>({ query: HelloQueryDocument, ...options });
};
export type HelloQueryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HelloQueryQuery = { hello: string };
