import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const GetResumeDocument = gql`
    subscription GetResume($id: String!) {
  resume(id: $id) {
    attributes {
      name
      value
    }
    name
    employmentRecords {
      employer
      summary
      title
      yearsEmployed
    }
    universityRecord {
      degreeType
      label
      major
      minors
      universityName
    }
    summary
  }
}
    `;

export function useGetResumeSubscription<TData = GetResumeSubscription>(options: Omit<Urql.UseSubscriptionArgs<GetResumeSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<GetResumeSubscription, TData>) {
  return Urql.useSubscription<GetResumeSubscription, TData, GetResumeSubscriptionVariables>({ query: GetResumeDocument, ...options }, handler);
};
export type GetResumeSubscriptionVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetResumeSubscription = { resume: { name: string, summary: string, attributes: Array<{ name: Types.AttributeType, value: string } | { name: Types.AttributeType, value: string } | { name: Types.AttributeType, value: string }>, employmentRecords: Array<{ employer: string, summary: string, title: string, yearsEmployed: string }>, universityRecord: Array<{ degreeType: string, label: string, major: string, minors: Array<string>, universityName: string }> } };
