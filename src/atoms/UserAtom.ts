import { atomWithStorage } from "jotai/utils";

export interface UserAtomValue {
    username: string;
    token: string;
}

export const UserAtom = atomWithStorage<UserAtomValue | null>("user", null);
