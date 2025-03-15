export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
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

export interface Mutation {
  newResume: Scalars['String']['output'];
  updateResumeInfo: Scalars['Boolean']['output'];
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
  hello: Scalars['String']['output'];
}

export interface ResumePersonAttribute {
  name: AttributeType;
  value: Scalars['String']['output'];
}

export interface Subscription {
  counter: Scalars['Int']['output'];
  resume: BuildResumeRequest;
}


export interface SubscriptionResumeArgs {
  id: Scalars['String']['input'];
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
