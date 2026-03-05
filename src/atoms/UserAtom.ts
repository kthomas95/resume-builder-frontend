import {atom} from "jotai";

export interface UserAtomValue {
    username: string;
    token: string;
    photoUrl?: string | null;
    name?: string | null;
}

export const UserAtom = atom<UserAtomValue | null>(null);
