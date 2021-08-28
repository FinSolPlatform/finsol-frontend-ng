import { User } from "./user";

export interface Community {
    id: number,
    name? : string,
    slogan? : string,
    logo? : string,
    description? : string,
    foundationDate? : string,
    creationDate? : string,
    founders? : string
    email? : string,
    website? : string,
    createdBy? : string,
    domain? : string,
    member? : User[]
}