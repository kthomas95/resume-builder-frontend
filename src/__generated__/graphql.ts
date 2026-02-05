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

export const HelloQueryDocument = gql`
    query HelloQuery {
  me {
    name
    email
    userId
    photoUrl
  }
}
    `;

export function useHelloQueryQuery(options?: Omit<Urql.UseQueryArgs<HelloQueryQueryVariables>, 'query'>) {
  return Urql.useQuery<HelloQueryQuery, HelloQueryQueryVariables>({ query: HelloQueryDocument, ...options });
};
export const LoginWithGoogleDocument = gql`
    mutation LoginWithGoogle($token: String!) {
  loginWithGoogle(token: $token) {
    message
    success
  }
}
    `;

export function useLoginWithGoogleMutation() {
  return Urql.useMutation<LoginWithGoogleMutation, LoginWithGoogleMutationVariables>(LoginWithGoogleDocument);
};
export type HelloQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQueryQuery = { me?: { name: string, email: string, userId: number, photoUrl?: string | null } | null };

export type LoginWithGoogleMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type LoginWithGoogleMutation = { loginWithGoogle: { message?: string | null, success: boolean } };

/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
}

export interface AuthResponse {
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
}

export interface EducationEntry {
  degree: Scalars['String']['output'];
  endDate: Scalars['String']['output'];
  id: Scalars['String']['output'];
  location: Scalars['String']['output'];
  school: Scalars['String']['output'];
  startDate: Scalars['String']['output'];
}

export interface HelloResponse {
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  photoUrl?: Maybe<Scalars['String']['output']>;
  userId: Scalars['Int']['output'];
}

export interface Mutation {
  duplicateResume?: Maybe<Scalars['String']['output']>;
  loginWithGoogle: AuthResponse;
  logout: Scalars['Boolean']['output'];
  newResume?: Maybe<Scalars['String']['output']>;
}


export interface MutationDuplicateResumeArgs {
  id: Scalars['String']['input'];
  newTitle: Scalars['String']['input'];
}


export interface MutationLoginWithGoogleArgs {
  token: Scalars['String']['input'];
}


export interface MutationNewResumeArgs {
  description: Scalars['String']['input'];
}

export interface Profile {
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  github: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  linkedin: Scalars['String']['output'];
  location: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  website: Scalars['String']['output'];
}

export interface Query {
  getResume?: Maybe<ResumeVersion>;
  me?: Maybe<HelloResponse>;
}


export interface QueryGetResumeArgs {
  id: Scalars['String']['input'];
}

export interface ResumeVersion {
  description: Scalars['String']['output'];
  education: Array<EducationEntry>;
  id: Scalars['String']['output'];
  lastModified: Scalars['String']['output'];
  profile: Profile;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  workHistory: Array<WorkEntry>;
}

export interface WorkEntry {
  company: Scalars['String']['output'];
  description: Scalars['String']['output'];
  endDate: Scalars['String']['output'];
  id: Scalars['String']['output'];
  location: Scalars['String']['output'];
  position: Scalars['String']['output'];
  startDate: Scalars['String']['output'];
}
