import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const EditUniversityInfoDocument = gql`
    mutation EditUniversityInfo($id: String!, $request: UpdateUniversityRecordInput!) {
  updateUniversityRecord(id: $id, request: $request)
}
    `;

export function useEditUniversityInfoMutation() {
  return Urql.useMutation<EditUniversityInfoMutation, EditUniversityInfoMutationVariables>(EditUniversityInfoDocument);
};
export type EditUniversityInfoMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  request: Types.UpdateUniversityRecordInput;
}>;


export type EditUniversityInfoMutation = { updateUniversityRecord: boolean };
