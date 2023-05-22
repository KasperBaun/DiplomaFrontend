import { User } from "@models/User";

export type AuthState = {
    user: User;
    expiration: string;
    claims?: Claim[];
}

class Claim {
    constructor(public type: string, public value: string) { }
}