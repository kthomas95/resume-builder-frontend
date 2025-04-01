import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const GetAvailableResumesDocument = gql`
    query GetAvailableResumes {
  getAvailableResumes {
    description
    lastModified
    resumeId
  }
}
    `;

export function useGetAvailableResumesQuery(options?: Omit<Urql.UseQueryArgs<GetAvailableResumesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAvailableResumesQuery, GetAvailableResumesQueryVariables>({ query: GetAvailableResumesDocument, ...options });
};
export const DeleteResumeDocument = gql`
    mutation DeleteResume($resumeId: UUID!) {
  deleteResume(resumeId: $resumeId)
}
    `;

export function useDeleteResumeMutation() {
  return Urql.useMutation<DeleteResumeMutation, DeleteResumeMutationVariables>(DeleteResumeDocument);
};
export const GetResumeDocument = gql`
    subscription GetResume($id: String!) {
  resume(id: $id) {
    description
    currentResume {
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
}
    `;

export function useGetResumeSubscription<TData = GetResumeSubscription>(options: Omit<Urql.UseSubscriptionArgs<GetResumeSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<GetResumeSubscription, TData>) {
  return Urql.useSubscription<GetResumeSubscription, TData, GetResumeSubscriptionVariables>({ query: GetResumeDocument, ...options }, handler);
};
export const HelloQueryDocument = gql`
    query HelloQuery {
  hello
}
    `;

export function useHelloQueryQuery(options?: Omit<Urql.UseQueryArgs<HelloQueryQueryVariables>, 'query'>) {
  return Urql.useQuery<HelloQueryQuery, HelloQueryQueryVariables>({ query: HelloQueryDocument, ...options });
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    __typename
    ... on Success {
      expiration
      token
      username
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const ManageResumeInfoDocument = gql`
    mutation ManageResumeInfo($id: String!, $request: UpdateResumeInfoInput!) {
  updateResumeInfo(id: $id, request: $request)
}
    `;

export function useManageResumeInfoMutation() {
  return Urql.useMutation<ManageResumeInfoMutation, ManageResumeInfoMutationVariables>(ManageResumeInfoDocument);
};
export const NewResumeDocument = gql`
    mutation NewResume($description: String!) {
  newResume(description: $description)
}
    `;

export function useNewResumeMutation() {
  return Urql.useMutation<NewResumeMutation, NewResumeMutationVariables>(NewResumeDocument);
};
export const RegisterUserDocument = gql`
    mutation RegisterUser($username: String!, $password: String!) {
  registerUser(username: $username, password: $password) {
    username
  }
}
    `;

export function useRegisterUserMutation() {
  return Urql.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument);
};
export type GetAvailableResumesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAvailableResumesQuery = { getAvailableResumes: Array<{ description: string, lastModified: number, resumeId: string }> };

export type DeleteResumeMutationVariables = Exact<{
  resumeId: Scalars['UUID']['input'];
}>;


export type DeleteResumeMutation = { deleteResume: boolean };

export type GetResumeSubscriptionVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetResumeSubscription = { resume: { description: string, currentResume: { name: string, summary: string, attributes: Array<{ name: AttributeType, value: string } | { name: AttributeType, value: string } | { name: AttributeType, value: string }>, employmentRecords: Array<{ employer: string, summary: string, title: string, yearsEmployed: string }>, universityRecord: Array<{ degreeType: string, label: string, major: string, minors: Array<string>, universityName: string }> } } };

export type HelloQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQueryQuery = { hello: string };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { login: { __typename: 'InvalidPassword' } | { __typename: 'InvalidUsername' } | { __typename: 'Success', expiration: number, token: string, username: string } };

export type ManageResumeInfoMutationVariables = Exact<{
  id: Scalars['String']['input'];
  request: UpdateResumeInfoInput;
}>;


export type ManageResumeInfoMutation = { updateResumeInfo: boolean };

export type NewResumeMutationVariables = Exact<{
  description: Scalars['String']['input'];
}>;


export type NewResumeMutation = { newResume: string };

export type RegisterUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterUserMutation = { registerUser?: { username: string } | null };

/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  UUID: { input: string; output: string; }
}

export interface Address extends ResumePersonAttribute {
  getTypstString: Scalars['String']['output'];
  name: AttributeType;
  value: Scalars['String']['output'];
}

export enum AttributeType {
  Address = 'Address',
  Email = 'Email',
  Phone = 'Phone'
}

export interface AvailableResume {
  description: Scalars['String']['output'];
  lastModified: Scalars['Int']['output'];
  resumeId: Scalars['UUID']['output'];
}

export interface BuildResumeRequest {
  attributes: Array<Address | Email | PhoneNumber>;
  employmentRecords: Array<EmploymentRecord>;
  name: Scalars['String']['output'];
  summary: Scalars['String']['output'];
  universityRecord: Array<UniversityRecord>;
}

export interface Email extends ResumePersonAttribute {
  getTypstString: Scalars['String']['output'];
  name: AttributeType;
  value: Scalars['String']['output'];
}

export interface EmploymentRecord {
  employer: Scalars['String']['output'];
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  toTypstRecord: Scalars['String']['output'];
  yearsEmployed: Scalars['String']['output'];
}

export interface InvalidPassword {
  type: Scalars['String']['output'];
}

export interface InvalidUsername {
  type: Scalars['String']['output'];
}

export interface LoggedInUser {
  userId: Scalars['String']['output'];
  username: Scalars['String']['output'];
}

export type LoginResponse = InvalidPassword | InvalidUsername | Success;

export interface Mutation {
  deleteResume: Scalars['Boolean']['output'];
  login: LoginResponse;
  newResume: Scalars['String']['output'];
  registerUser?: Maybe<LoggedInUser>;
  updateResumeInfo: Scalars['Boolean']['output'];
}


export interface MutationDeleteResumeArgs {
  resumeId: Scalars['UUID']['input'];
}


export interface MutationLoginArgs {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
}


export interface MutationNewResumeArgs {
  description: Scalars['String']['input'];
}


export interface MutationRegisterUserArgs {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
}


export interface MutationUpdateResumeInfoArgs {
  id: Scalars['String']['input'];
  request: UpdateResumeInfoInput;
}

export interface PhoneNumber extends ResumePersonAttribute {
  getTypstString: Scalars['String']['output'];
  name: AttributeType;
  value: Scalars['String']['output'];
}

export interface Query {
  getAvailableResumes: Array<AvailableResume>;
  hello: Scalars['String']['output'];
}

export interface Resume {
  currentResume: BuildResumeRequest;
  description: Scalars['String']['output'];
  lastModified: Scalars['Int']['output'];
  resumeId: Scalars['UUID']['output'];
  userId?: Maybe<Scalars['String']['output']>;
}

export interface ResumePersonAttribute {
  name: AttributeType;
  value: Scalars['String']['output'];
}

export interface Subscription {
  resume: Resume;
}


export interface SubscriptionResumeArgs {
  id: Scalars['String']['input'];
}

export interface Success {
  expiration: Scalars['Int']['output'];
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
}

export interface UniversityRecord {
  degreeType: Scalars['String']['output'];
  label: Scalars['String']['output'];
  major: Scalars['String']['output'];
  makeTypstText: Scalars['String']['output'];
  minors: Array<Scalars['String']['output']>;
  universityName: Scalars['String']['output'];
}

export interface UpdateEmploymentRecordInput {
  index: Scalars['Int']['input'];
  newEmployer?: InputMaybe<Scalars['String']['input']>;
  newSummary?: InputMaybe<Scalars['String']['input']>;
  newTitle?: InputMaybe<Scalars['String']['input']>;
  newYearsWorked?: InputMaybe<Scalars['String']['input']>;
}

export interface UpdateResumeInfoInput {
  addEmploymentRecord?: InputMaybe<Scalars['Boolean']['input']>;
  addUniversityRecord?: InputMaybe<Scalars['Boolean']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  deleteEmploymentRecord?: InputMaybe<Scalars['Int']['input']>;
  deleteUniversityRecord?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  updateEducationRecord?: InputMaybe<UpdateUniversityRecordInput>;
  updateEmploymentRecord?: InputMaybe<UpdateEmploymentRecordInput>;
}

export interface UpdateUniversityRecordInput {
  index: Scalars['Int']['input'];
  newDegreeType?: InputMaybe<Scalars['String']['input']>;
  newLabel?: InputMaybe<Scalars['String']['input']>;
  newMajor?: InputMaybe<Scalars['String']['input']>;
  newMinors?: InputMaybe<Array<Scalars['String']['input']>>;
  newUniversityName?: InputMaybe<Scalars['String']['input']>;
}
