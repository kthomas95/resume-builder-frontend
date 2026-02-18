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
export const BulletPointsFragmentDoc = gql`
    fragment BulletPoints on BulletPoints {
  columns
  bulletItems: items
}
    `;
export const ColumnItemFragmentDoc = gql`
    fragment ColumnItem on ColumnItem {
  items
  label
}
    `;
export const ColumnsFragmentDoc = gql`
    fragment Columns on Columns {
  columnItems: items {
    ...ColumnItem
  }
}
    ${ColumnItemFragmentDoc}`;
export const ParagraphFragmentDoc = gql`
    fragment Paragraph on Paragraph {
  text
}
    `;
export const ResumeTextFragmentDoc = gql`
    fragment ResumeText on ResumeText {
  __typename
  ... on BulletPoints {
    ...BulletPoints
  }
  ... on Columns {
    ...Columns
  }
  ... on Paragraph {
    ...Paragraph
  }
}
    ${BulletPointsFragmentDoc}
${ColumnsFragmentDoc}
${ParagraphFragmentDoc}`;
export const ResumeContentFragmentDoc = gql`
    fragment ResumeContent on ResumeContent {
  __typename
  ... on TextContent {
    text {
      ...ResumeText
    }
  }
  ... on SectionItem {
    item {
      rightLabel
      leftLabel
      centerLabel
      contentItems {
        text {
          ...ResumeText
        }
      }
    }
  }
}
    ${ResumeTextFragmentDoc}`;
export const ResumeSectionItemFragmentDoc = gql`
    fragment ResumeSectionItem on ResumeSectionItem {
  centerLabel
  leftLabel
  rightLabel
  contentItems {
    ...ResumeContent
  }
}
    ${ResumeContentFragmentDoc}`;
export const SectionItemsFragmentDoc = gql`
    fragment SectionItems on SectionItem {
  item {
    ...ResumeSectionItem
  }
}
    ${ResumeSectionItemFragmentDoc}`;
export const ResumeTitleFragmentDoc = gql`
    fragment ResumeTitle on ResumeTitle {
  name
}
    `;
export const ResumeSummaryFragmentDoc = gql`
    fragment ResumeSummary on ResumeSummary {
  text
}
    `;
export const ContactItemFragmentDoc = gql`
    fragment ContactItem on ResumeContactItem {
  value
  icon
}
    `;
export const ResumeSectionFragmentDoc = gql`
    fragment ResumeSection on ResumeSection {
  title
  contentItems {
    ...ResumeContent
  }
}
    ${ResumeContentFragmentDoc}`;
export const ResumeSettingsFragmentDoc = gql`
    fragment ResumeSettings on ResumeSettings {
  baseFontSize
}
    `;
export const ResumeFragmentDoc = gql`
    fragment Resume on Resume {
  description
  id
  lastModifiedSeconds
  title
  resumeData {
    title {
      ...ResumeTitle
    }
    summary {
      ...ResumeSummary
    }
    contactItems {
      ...ContactItem
    }
    sections {
      ...ResumeSection
    }
    settings {
      ...ResumeSettings
    }
  }
}
    ${ResumeTitleFragmentDoc}
${ResumeSummaryFragmentDoc}
${ContactItemFragmentDoc}
${ResumeSectionFragmentDoc}
${ResumeSettingsFragmentDoc}`;
export const AvailableResumeFragmentDoc = gql`
    fragment AvailableResume on AvailableResume {
  title
  id
  lastModifiedSeconds
  description
}
    `;
export const DeleteResumeDocument = gql`
    mutation DeleteResume($id: String!) {
  deleteResume(id: $id)
}
    `;

export function useDeleteResumeMutation() {
  return Urql.useMutation<DeleteResumeMutation, DeleteResumeMutationVariables>(DeleteResumeDocument);
};
export const GetAvailableResumesDocument = gql`
    subscription GetAvailableResumes {
  viewAvailableResumes {
    ...AvailableResume
  }
}
    ${AvailableResumeFragmentDoc}`;

export function useGetAvailableResumesSubscription<TData = GetAvailableResumesSubscription>(options?: Omit<Urql.UseSubscriptionArgs<GetAvailableResumesSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<GetAvailableResumesSubscription, TData>) {
  return Urql.useSubscription<GetAvailableResumesSubscription, TData, GetAvailableResumesSubscriptionVariables>({ query: GetAvailableResumesDocument, ...options }, handler);
};
export const GetResumeDocument = gql`
    subscription getResume($resumeId: String!) {
  subscribeToResume(resumeId: $resumeId) {
    ...Resume
  }
}
    ${ResumeFragmentDoc}`;

export function useGetResumeSubscription<TData = GetResumeSubscription>(options: Omit<Urql.UseSubscriptionArgs<GetResumeSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<GetResumeSubscription, TData>) {
  return Urql.useSubscription<GetResumeSubscription, TData, GetResumeSubscriptionVariables>({ query: GetResumeDocument, ...options }, handler);
};
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
export const LogoutWithGoogleDocument = gql`
    mutation LogoutWithGoogle {
  logout
}
    `;

export function useLogoutWithGoogleMutation() {
  return Urql.useMutation<LogoutWithGoogleMutation, LogoutWithGoogleMutationVariables>(LogoutWithGoogleDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    success
    message
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const ModifyResumeDocument = gql`
    mutation ModifyResume($id: String!, $requestString: String!) {
  mutateResume(id: $id, requestString: $requestString)
}
    `;

export function useModifyResumeMutation() {
  return Urql.useMutation<ModifyResumeMutation, ModifyResumeMutationVariables>(ModifyResumeDocument);
};
export const NewResumeDocument = gql`
    mutation NewResume($title: String!, $description: String) {
  newResume(title: $title, description: $description)
}
    `;

export function useNewResumeMutation() {
  return Urql.useMutation<NewResumeMutation, NewResumeMutationVariables>(NewResumeDocument);
};
export type DeleteResumeMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteResumeMutation = { deleteResume: boolean };

export type ContactItemFragment = { value: string, icon: ResumeContactIcon };

export type BulletPointsFragment = { columns: number, bulletItems: Array<string> };

export type ColumnItemFragment = { items: Array<string>, label: string };

export type ColumnsFragment = { columnItems: Array<ColumnItemFragment> };

export type ParagraphFragment = { text: string };

export type SectionItemsFragment = { item: ResumeSectionItemFragment };

export type ResumeText_BulletPoints_Fragment = (
  { __typename: 'BulletPoints' }
  & BulletPointsFragment
);

export type ResumeText_Columns_Fragment = (
  { __typename: 'Columns' }
  & ColumnsFragment
);

export type ResumeText_Paragraph_Fragment = (
  { __typename: 'Paragraph' }
  & ParagraphFragment
);

export type ResumeTextFragment = ResumeText_BulletPoints_Fragment | ResumeText_Columns_Fragment | ResumeText_Paragraph_Fragment;

export type ResumeContent_SectionItem_Fragment = { __typename: 'SectionItem', item: { rightLabel?: string | null, leftLabel?: string | null, centerLabel?: string | null, contentItems: Array<{ text: ResumeText_BulletPoints_Fragment | ResumeText_Columns_Fragment | ResumeText_Paragraph_Fragment }> } };

export type ResumeContent_TextContent_Fragment = { __typename: 'TextContent', text: ResumeText_BulletPoints_Fragment | ResumeText_Columns_Fragment | ResumeText_Paragraph_Fragment };

export type ResumeContentFragment = ResumeContent_SectionItem_Fragment | ResumeContent_TextContent_Fragment;

export type ResumeFragment = { description: string, id: string, lastModifiedSeconds: string, title: string, resumeData: { title: ResumeTitleFragment, summary: ResumeSummaryFragment, contactItems: Array<ContactItemFragment>, sections: Array<ResumeSectionFragment>, settings: ResumeSettingsFragment } };

export type ResumeSectionItemFragment = { centerLabel?: string | null, leftLabel?: string | null, rightLabel?: string | null, contentItems: Array<ResumeContent_TextContent_Fragment> };

export type ResumeSectionFragment = { title: string, contentItems: Array<ResumeContent_SectionItem_Fragment | ResumeContent_TextContent_Fragment> };

export type ResumeSettingsFragment = { baseFontSize: number };

export type ResumeSummaryFragment = { text: string };

export type ResumeTitleFragment = { name: string };

export type AvailableResumeFragment = { title: string, id: string, lastModifiedSeconds: string, description: string };

export type GetAvailableResumesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GetAvailableResumesSubscription = { viewAvailableResumes: Array<AvailableResumeFragment> };

export type GetResumeSubscriptionVariables = Exact<{
  resumeId: Scalars['String']['input'];
}>;


export type GetResumeSubscription = { subscribeToResume?: ResumeFragment | null };

export type HelloQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQueryQuery = { me?: { name: string, email: string, userId: number, photoUrl?: string | null } | null };

export type LoginWithGoogleMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type LoginWithGoogleMutation = { loginWithGoogle: { message?: string | null, success: boolean } };

export type LogoutWithGoogleMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutWithGoogleMutation = { logout: boolean };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { login: { success: boolean, message?: string | null } };

export type ModifyResumeMutationVariables = Exact<{
  id: Scalars['String']['input'];
  requestString: Scalars['String']['input'];
}>;


export type ModifyResumeMutation = { mutateResume: boolean };

export type NewResumeMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type NewResumeMutation = { newResume?: string | null };

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

export interface AvailableResume {
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedSeconds: Scalars['String']['output'];
  title: Scalars['String']['output'];
}

export interface BulletPoints {
  columns: Scalars['Int']['output'];
  items: Array<Scalars['String']['output']>;
}

export interface ColumnItem {
  items: Array<Scalars['String']['output']>;
  label: Scalars['String']['output'];
}

export interface Columns {
  items: Array<ColumnItem>;
}

export interface HelloResponse {
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  photoUrl?: Maybe<Scalars['String']['output']>;
  userId: Scalars['Int']['output'];
}

export interface Mutation {
  deleteResume: Scalars['Boolean']['output'];
  duplicateResume?: Maybe<Scalars['String']['output']>;
  login: AuthResponse;
  loginWithGoogle: AuthResponse;
  logout: Scalars['Boolean']['output'];
  mutateResume: Scalars['Boolean']['output'];
  newResume?: Maybe<Scalars['String']['output']>;
}


export interface MutationDeleteResumeArgs {
  id: Scalars['String']['input'];
}


export interface MutationDuplicateResumeArgs {
  id: Scalars['String']['input'];
  newTitle: Scalars['String']['input'];
}


export interface MutationLoginArgs {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
}


export interface MutationLoginWithGoogleArgs {
  token: Scalars['String']['input'];
}


export interface MutationMutateResumeArgs {
  id: Scalars['String']['input'];
  requestString: Scalars['String']['input'];
}


export interface MutationNewResumeArgs {
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
}

export interface Paragraph {
  text: Scalars['String']['output'];
}

export interface Query {
  me?: Maybe<HelloResponse>;
  typstVersion?: Maybe<Scalars['String']['output']>;
}

export interface Resume {
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedSeconds: Scalars['String']['output'];
  resumeData: ResumeData;
  title: Scalars['String']['output'];
}

export enum ResumeContactIcon {
  Email = 'Email',
  Github = 'Github',
  LinkedIn = 'LinkedIn',
  Phone = 'Phone',
  Website = 'Website'
}

export interface ResumeContactItem {
  icon: ResumeContactIcon;
  value: Scalars['String']['output'];
}

export type ResumeContent = SectionItem | TextContent;

export interface ResumeData {
  contactItems: Array<ResumeContactItem>;
  sections: Array<ResumeSection>;
  settings: ResumeSettings;
  summary: ResumeSummary;
  title: ResumeTitle;
}

export interface ResumeSection {
  contentItems: Array<ResumeContent>;
  title: Scalars['String']['output'];
}

export interface ResumeSectionItem {
  centerLabel?: Maybe<Scalars['String']['output']>;
  contentItems: Array<TextContent>;
  leftLabel?: Maybe<Scalars['String']['output']>;
  rightLabel?: Maybe<Scalars['String']['output']>;
}

export interface ResumeSettings {
  baseFontSize: Scalars['Int']['output'];
}

export interface ResumeSummary {
  text: Scalars['String']['output'];
}

export type ResumeText = BulletPoints | Columns | Paragraph;

export interface ResumeTitle {
  name: Scalars['String']['output'];
}

export interface SectionItem {
  item: ResumeSectionItem;
}

export interface Subscription {
  subscribeToResume?: Maybe<Resume>;
  viewAvailableResumes: Array<AvailableResume>;
}


export interface SubscriptionSubscribeToResumeArgs {
  resumeId: Scalars['String']['input'];
}

export interface TextContent {
  text: ResumeText;
}
