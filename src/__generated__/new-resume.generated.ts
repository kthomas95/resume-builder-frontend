import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const NewResumeDocument = gql`
    mutation NewResume {
  newResume
}
    `;

export function useNewResumeMutation() {
  return Urql.useMutation<NewResumeMutation, NewResumeMutationVariables>(NewResumeDocument);
};
export type NewResumeMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type NewResumeMutation = { newResume: string };
