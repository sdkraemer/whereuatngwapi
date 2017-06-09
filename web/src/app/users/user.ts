export interface IUser{
    id: string;
    name: string;
    email: string;
    picture: string;
    authIds: string[];
};

export class User implements IUser {
    id: string;
    name: string;
    email: string;
    picture: string;
    authIds: string[];

    constructor(params: IUser) {
        this.id = params.id;
        this.name = params.name;
        this.email = params.email;
        this.picture = params.picture;
        this.authIds = params.authIds;
    }
}