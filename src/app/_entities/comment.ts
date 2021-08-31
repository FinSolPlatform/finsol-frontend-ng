import { Project } from "./project";

export interface Comment {
    id: number,
    message: string,
    creationDate: string,
    replyTo: string,
    username: string,
    project: Project,
    userPrettyName: string,
    userLogo: string,
}