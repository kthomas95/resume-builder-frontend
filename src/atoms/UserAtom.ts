import { atomWithStorage } from "jotai/utils";

export interface UserAtomValue {
    username: string;
    token: string;
    photoUrl?: string | null;
    name?: string | null;
}

export const UserAtom = atomWithStorage<UserAtomValue | null>("user", null);
