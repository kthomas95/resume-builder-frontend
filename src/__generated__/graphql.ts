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
export const EducationPropsFragmentDoc = gql`
    fragment EducationProps on UniversityRecord {
  degreeType
  label
  major
  minors
  universityName
}
    `;
export const EducationComponentFragmentDoc = gql`
    fragment EducationComponent on EducationComponent {
  record {
    ...EducationProps
  }
  id
  description
}
    ${EducationPropsFragmentDoc}`;
export const EmploymentPropsFragmentDoc = gql`
    fragment EmploymentProps on EmploymentRecord {
  employer
  summary
  title
  yearsEmployed
}
    `;
export const WorkHistoryComponentFragmentDoc = gql`
    fragment WorkHistoryComponent on WorkHistoryComponent {
  record {
    ...EmploymentProps
  }
  id
  description
}
    ${EmploymentPropsFragmentDoc}`;
export const EducationSectionFragmentDoc = gql`
    fragment EducationSection on EducationRecords {
  title
  records {
    ...EducationProps
  }
}
    ${EducationPropsFragmentDoc}`;
export const EmploymentSectionFragmentDoc = gql`
    fragment EmploymentSection on EmploymentRecords {
  title
  records {
    ...EmploymentProps
  }
}
    ${EmploymentPropsFragmentDoc}`;
export const CustomSectionRecordFragmentDoc = gql`
    fragment CustomSectionRecord on CustomSectionRecord {
  name
  description
  label
  rightLabel
}
    `;
export const CustomSectionFragmentDoc = gql`
    fragment CustomSection on CustomSection {
  records {
    ...CustomSectionRecord
  }
  title
}
    ${CustomSectionRecordFragmentDoc}`;
export const ResumePropsFragmentDoc = gql`
    fragment ResumeProps on ResumeData {
  attributes {
    name
    value
  }
  name
  summary
  sections {
    __typename
    ... on EducationRecords {
      ...EducationSection
    }
    ... on EmploymentRecords {
      ...EmploymentSection
    }
    ... on CustomSection {
      ...CustomSection
    }
  }
}
    ${EducationSectionFragmentDoc}
${EmploymentSectionFragmentDoc}
${CustomSectionFragmentDoc}`;
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
export const GetEducationComponentsDocument = gql`
    subscription GetEducationComponents {
  getEducationRecords {
    ...EducationComponent
  }
}
    ${EducationComponentFragmentDoc}`;

export function useGetEducationComponentsSubscription<TData = GetEducationComponentsSubscription>(options?: Omit<Urql.UseSubscriptionArgs<GetEducationComponentsSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<GetEducationComponentsSubscription, TData>) {
  return Urql.useSubscription<GetEducationComponentsSubscription, TData, GetEducationComponentsSubscriptionVariables>({ query: GetEducationComponentsDocument, ...options }, handler);
};
export const NewEducationComponentDocument = gql`
    mutation NewEducationComponent($description: String!) {
  newEducationRecord(description: $description)
}
    `;

export function useNewEducationComponentMutation() {
  return Urql.useMutation<NewEducationComponentMutation, NewEducationComponentMutationVariables>(NewEducationComponentDocument);
};
export const UpdateEducationComponentDocument = gql`
    mutation UpdateEducationComponent($id: UUID!, $record: UpdateUniversityRecordInput!) {
  updateEducationRecord(id: $id, record: $record)
}
    `;

export function useUpdateEducationComponentMutation() {
  return Urql.useMutation<UpdateEducationComponentMutation, UpdateEducationComponentMutationVariables>(UpdateEducationComponentDocument);
};
export const DeleteEducationRecordDocument = gql`
    mutation DeleteEducationRecord($id: UUID!) {
  deleteEducationRecord(id: $id)
}
    `;

export function useDeleteEducationRecordMutation() {
  return Urql.useMutation<DeleteEducationRecordMutation, DeleteEducationRecordMutationVariables>(DeleteEducationRecordDocument);
};
export const InsertEducationComponentIntoResumeDocument = gql`
    mutation InsertEducationComponentIntoResume($resumeId: UUID!, $componentId: UUID!) {
  insertEducationRecordIntoResume(resumeId: $resumeId, employmentId: $componentId)
}
    `;

export function useInsertEducationComponentIntoResumeMutation() {
  return Urql.useMutation<InsertEducationComponentIntoResumeMutation, InsertEducationComponentIntoResumeMutationVariables>(InsertEducationComponentIntoResumeDocument);
};
export const GetEmploymentComponentsDocument = gql`
    subscription GetEmploymentComponents {
  getEmploymentRecords {
    ...WorkHistoryComponent
  }
}
    ${WorkHistoryComponentFragmentDoc}`;

export function useGetEmploymentComponentsSubscription<TData = GetEmploymentComponentsSubscription>(options?: Omit<Urql.UseSubscriptionArgs<GetEmploymentComponentsSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<GetEmploymentComponentsSubscription, TData>) {
  return Urql.useSubscription<GetEmploymentComponentsSubscription, TData, GetEmploymentComponentsSubscriptionVariables>({ query: GetEmploymentComponentsDocument, ...options }, handler);
};
export const NewEmploymentComponentDocument = gql`
    mutation NewEmploymentComponent($description: String!) {
  newEmploymentRecord(description: $description)
}
    `;

export function useNewEmploymentComponentMutation() {
  return Urql.useMutation<NewEmploymentComponentMutation, NewEmploymentComponentMutationVariables>(NewEmploymentComponentDocument);
};
export const UpdateEmploymentComponentDocument = gql`
    mutation UpdateEmploymentComponent($id: UUID!, $record: UpdateEmploymentRecordInput!) {
  updateEmploymentRecord(id: $id, record: $record)
}
    `;

export function useUpdateEmploymentComponentMutation() {
  return Urql.useMutation<UpdateEmploymentComponentMutation, UpdateEmploymentComponentMutationVariables>(UpdateEmploymentComponentDocument);
};
export const DeleteEmploymentComponentDocument = gql`
    mutation DeleteEmploymentComponent($id: UUID!) {
  deleteEmploymentRecord(id: $id)
}
    `;

export function useDeleteEmploymentComponentMutation() {
  return Urql.useMutation<DeleteEmploymentComponentMutation, DeleteEmploymentComponentMutationVariables>(DeleteEmploymentComponentDocument);
};
export const InsertEmploymentComponentIntoResumeDocument = gql`
    mutation InsertEmploymentComponentIntoResume($resumeId: UUID!, $componentId: UUID!) {
  insertEmploymentRecordIntoResume(
    resumeId: $resumeId
    employmentId: $componentId
  )
}
    `;

export function useInsertEmploymentComponentIntoResumeMutation() {
  return Urql.useMutation<InsertEmploymentComponentIntoResumeMutation, InsertEmploymentComponentIntoResumeMutationVariables>(InsertEmploymentComponentIntoResumeDocument);
};
export const GetResumeDocument = gql`
    subscription GetResume($id: String!) {
  resume(id: $id) {
    description
    currentResume {
      ...ResumeProps
    }
  }
}
    ${ResumePropsFragmentDoc}`;

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
export const NewSummaryDocument = gql`
    mutation NewSummary($description: String!) {
  newSummary(description: $description)
}
    `;

export function useNewSummaryMutation() {
  return Urql.useMutation<NewSummaryMutation, NewSummaryMutationVariables>(NewSummaryDocument);
};
export const UpdateSummaryDocument = gql`
    mutation UpdateSummary($description: String, $id: UUID!, $summaryText: String) {
  updateSummary(description: $description, id: $id, summaryText: $summaryText)
}
    `;

export function useUpdateSummaryMutation() {
  return Urql.useMutation<UpdateSummaryMutation, UpdateSummaryMutationVariables>(UpdateSummaryDocument);
};
export const DeleteSummaryDocument = gql`
    mutation DeleteSummary($id: UUID!) {
  deleteSummary(id: $id)
}
    `;

export function useDeleteSummaryMutation() {
  return Urql.useMutation<DeleteSummaryMutation, DeleteSummaryMutationVariables>(DeleteSummaryDocument);
};
export const GetSummariesDocument = gql`
    subscription GetSummaries {
  getSummaries {
    summaryText
    description
    id
  }
}
    `;

export function useGetSummariesSubscription<TData = GetSummariesSubscription>(options?: Omit<Urql.UseSubscriptionArgs<GetSummariesSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<GetSummariesSubscription, TData>) {
  return Urql.useSubscription<GetSummariesSubscription, TData, GetSummariesSubscriptionVariables>({ query: GetSummariesDocument, ...options }, handler);
};
export const ImportSummaryDocument = gql`
    mutation ImportSummary($resumeId: UUID!, $summaryId: UUID!) {
  importSummary(resumeId: $resumeId, summaryId: $summaryId)
}
    `;

export function useImportSummaryMutation() {
  return Urql.useMutation<ImportSummaryMutation, ImportSummaryMutationVariables>(ImportSummaryDocument);
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

export type EducationPropsFragment = { degreeType: string, label: string, major: string, minors: Array<string>, universityName: string };

export type EducationSectionFragment = { title: string, records: Array<EducationPropsFragment> };

export type EducationComponentFragment = { id: string, description: string, record: EducationPropsFragment };

export type GetEducationComponentsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GetEducationComponentsSubscription = { getEducationRecords: Array<EducationComponentFragment> };

export type NewEducationComponentMutationVariables = Exact<{
  description: Scalars['String']['input'];
}>;


export type NewEducationComponentMutation = { newEducationRecord: string };

export type UpdateEducationComponentMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  record: UpdateUniversityRecordInput;
}>;


export type UpdateEducationComponentMutation = { updateEducationRecord: boolean };

export type DeleteEducationRecordMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteEducationRecordMutation = { deleteEducationRecord: boolean };

export type InsertEducationComponentIntoResumeMutationVariables = Exact<{
  resumeId: Scalars['UUID']['input'];
  componentId: Scalars['UUID']['input'];
}>;


export type InsertEducationComponentIntoResumeMutation = { insertEducationRecordIntoResume: boolean };

export type EmploymentPropsFragment = { employer: string, summary: string, title: string, yearsEmployed: string };

export type WorkHistoryComponentFragment = { id: string, description: string, record: EmploymentPropsFragment };

export type GetEmploymentComponentsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GetEmploymentComponentsSubscription = { getEmploymentRecords: Array<WorkHistoryComponentFragment> };

export type NewEmploymentComponentMutationVariables = Exact<{
  description: Scalars['String']['input'];
}>;


export type NewEmploymentComponentMutation = { newEmploymentRecord: string };

export type UpdateEmploymentComponentMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  record: UpdateEmploymentRecordInput;
}>;


export type UpdateEmploymentComponentMutation = { updateEmploymentRecord: boolean };

export type DeleteEmploymentComponentMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteEmploymentComponentMutation = { deleteEmploymentRecord: boolean };

export type InsertEmploymentComponentIntoResumeMutationVariables = Exact<{
  resumeId: Scalars['UUID']['input'];
  componentId: Scalars['UUID']['input'];
}>;


export type InsertEmploymentComponentIntoResumeMutation = { insertEmploymentRecordIntoResume: boolean };

export type EmploymentSectionFragment = { title: string, records: Array<EmploymentPropsFragment> };

export type CustomSectionRecordFragment = { name: string, description: string, label: string, rightLabel: string };

export type CustomSectionFragment = { title: string, records: Array<CustomSectionRecordFragment> };

export type ResumePropsFragment = { name: string, summary: string, attributes: Array<{ name: AttributeType, value: string } | { name: AttributeType, value: string } | { name: AttributeType, value: string }>, sections: Array<(
    { __typename: 'CustomSection' }
    & CustomSectionFragment
  ) | (
    { __typename: 'EducationRecords' }
    & EducationSectionFragment
  ) | (
    { __typename: 'EmploymentRecords' }
    & EmploymentSectionFragment
  )> };

export type GetResumeSubscriptionVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetResumeSubscription = { resume: { description: string, currentResume: ResumePropsFragment } };

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

export type NewSummaryMutationVariables = Exact<{
  description: Scalars['String']['input'];
}>;


export type NewSummaryMutation = { newSummary: string };

export type UpdateSummaryMutationVariables = Exact<{
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  summaryText?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateSummaryMutation = { updateSummary: boolean };

export type DeleteSummaryMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteSummaryMutation = { deleteSummary: boolean };

export type GetSummariesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GetSummariesSubscription = { getSummaries: Array<{ summaryText: string, description: string, id: string }> };

export type ImportSummaryMutationVariables = Exact<{
  resumeId: Scalars['UUID']['input'];
  summaryId: Scalars['UUID']['input'];
}>;


export type ImportSummaryMutation = { importSummary: boolean };

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

export interface CustomSection extends ResumeSection {
  getTypstString: Scalars['String']['output'];
  records: Array<CustomSectionRecord>;
  title: Scalars['String']['output'];
  updateTitle: CustomSection | EducationRecords | EmploymentRecords;
}


export interface CustomSectionUpdateTitleArgs {
  newTitle: Scalars['String']['input'];
}

export interface CustomSectionRecord {
  description: Scalars['String']['output'];
  label: Scalars['String']['output'];
  name: Scalars['String']['output'];
  rightLabel: Scalars['String']['output'];
}

export interface EducationComponent {
  description: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  record: UniversityRecord;
}

export interface EducationRecords extends ResumeSection {
  getTypstString: Scalars['String']['output'];
  records: Array<UniversityRecord>;
  title: Scalars['String']['output'];
  updateTitle: CustomSection | EducationRecords | EmploymentRecords;
}


export interface EducationRecordsUpdateTitleArgs {
  newTitle: Scalars['String']['input'];
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

export interface EmploymentRecords extends ResumeSection {
  getTypstString: Scalars['String']['output'];
  records: Array<EmploymentRecord>;
  title: Scalars['String']['output'];
  updateTitle: CustomSection | EducationRecords | EmploymentRecords;
}


export interface EmploymentRecordsUpdateTitleArgs {
  newTitle: Scalars['String']['input'];
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

export interface MoveSectionsInput {
  fromIndex: Scalars['Int']['input'];
  toIndex: Scalars['Int']['input'];
}

export interface Mutation {
  copyResume: Scalars['UUID']['output'];
  deleteEducationRecord: Scalars['Boolean']['output'];
  deleteEmploymentRecord: Scalars['Boolean']['output'];
  deleteResume: Scalars['Boolean']['output'];
  deleteSummary: Scalars['Boolean']['output'];
  importSummary: Scalars['Boolean']['output'];
  insertEducationRecordIntoResume: Scalars['Boolean']['output'];
  insertEmploymentRecordIntoResume: Scalars['Boolean']['output'];
  login: LoginResponse;
  newEducationRecord: Scalars['UUID']['output'];
  newEmploymentRecord: Scalars['UUID']['output'];
  newResume: Scalars['String']['output'];
  newSummary: Scalars['UUID']['output'];
  registerUser?: Maybe<LoggedInUser>;
  updateEducationRecord: Scalars['Boolean']['output'];
  updateEmploymentRecord: Scalars['Boolean']['output'];
  updateResumeInfo: Scalars['Boolean']['output'];
  updateSummary: Scalars['Boolean']['output'];
}


export interface MutationCopyResumeArgs {
  resumeId: Scalars['UUID']['input'];
}


export interface MutationDeleteEducationRecordArgs {
  id: Scalars['UUID']['input'];
}


export interface MutationDeleteEmploymentRecordArgs {
  id: Scalars['UUID']['input'];
}


export interface MutationDeleteResumeArgs {
  resumeId: Scalars['UUID']['input'];
}


export interface MutationDeleteSummaryArgs {
  id: Scalars['UUID']['input'];
}


export interface MutationImportSummaryArgs {
  resumeId: Scalars['UUID']['input'];
  summaryId: Scalars['UUID']['input'];
}


export interface MutationInsertEducationRecordIntoResumeArgs {
  employmentId: Scalars['UUID']['input'];
  resumeId: Scalars['UUID']['input'];
}


export interface MutationInsertEmploymentRecordIntoResumeArgs {
  employmentId: Scalars['UUID']['input'];
  resumeId: Scalars['UUID']['input'];
}


export interface MutationLoginArgs {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
}


export interface MutationNewEducationRecordArgs {
  description: Scalars['String']['input'];
}


export interface MutationNewEmploymentRecordArgs {
  description: Scalars['String']['input'];
}


export interface MutationNewResumeArgs {
  description: Scalars['String']['input'];
}


export interface MutationNewSummaryArgs {
  description: Scalars['String']['input'];
}


export interface MutationRegisterUserArgs {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
}


export interface MutationUpdateEducationRecordArgs {
  id: Scalars['UUID']['input'];
  record: UpdateUniversityRecordInput;
}


export interface MutationUpdateEmploymentRecordArgs {
  id: Scalars['UUID']['input'];
  record: UpdateEmploymentRecordInput;
}


export interface MutationUpdateResumeInfoArgs {
  id: Scalars['String']['input'];
  request: UpdateResumeInfoInput;
}


export interface MutationUpdateSummaryArgs {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  summaryText?: InputMaybe<Scalars['String']['input']>;
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

export interface RenameSectionInput {
  index: Scalars['Int']['input'];
  newName: Scalars['String']['input'];
}

export interface Resume {
  currentResume: ResumeData;
  description: Scalars['String']['output'];
  lastModified: Scalars['Int']['output'];
  resumeId: Scalars['UUID']['output'];
  userId?: Maybe<Scalars['String']['output']>;
}

export interface ResumeData {
  attributes: Array<Address | Email | PhoneNumber>;
  name: Scalars['String']['output'];
  sections: Array<CustomSection | EducationRecords | EmploymentRecords>;
  summary: Scalars['String']['output'];
}

export interface ResumePersonAttribute {
  name: AttributeType;
  value: Scalars['String']['output'];
}

export interface ResumeSection {
  getTypstString: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updateTitle: CustomSection | EducationRecords | EmploymentRecords;
}


export interface ResumeSectionUpdateTitleArgs {
  newTitle: Scalars['String']['input'];
}

export interface ResumeSummary {
  description: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  summaryText: Scalars['String']['output'];
}

export interface Subscription {
  getAvailableResumes: Array<AvailableResume>;
  getEducationRecords: Array<EducationComponent>;
  getEmploymentRecords: Array<WorkHistoryComponent>;
  getSummaries: Array<ResumeSummary>;
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
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  updateSections?: InputMaybe<UpdateSectionsInput>;
}

export interface UpdateSectionsInput {
  addEmploymentRecord?: InputMaybe<Scalars['Boolean']['input']>;
  addUniversityRecord?: InputMaybe<Scalars['Boolean']['input']>;
  deleteEmploymentRecord?: InputMaybe<Scalars['Int']['input']>;
  deleteSection?: InputMaybe<Scalars['Int']['input']>;
  deleteUniversityRecord?: InputMaybe<Scalars['Int']['input']>;
  moveSections?: InputMaybe<MoveSectionsInput>;
  renameSection?: InputMaybe<RenameSectionInput>;
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

export interface WorkHistoryComponent {
  description: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  record: EmploymentRecord;
}
