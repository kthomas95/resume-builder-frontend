import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const ManageResumeInfoDocument = gql`
    mutation ManageResumeInfo($id: String!, $request: UpdateResumeInfoInput!) {
  updateResumeInfo(id: $id, request: $request)
}
    `;

export function useManageResumeInfoMutation() {
  return Urql.useMutation<ManageResumeInfoMutation, ManageResumeInfoMutationVariables>(ManageResumeInfoDocument);
};
export type ManageResumeInfoMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  request: Types.UpdateResumeInfoInput;
}>;


export type ManageResumeInfoMutation = { updateResumeInfo: boolean };
