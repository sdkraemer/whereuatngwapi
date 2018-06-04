export interface IFriend {
  id: string;
  name: string;
  email: string;
}

export class Friend implements IFriend {
  id: string;
  name: string;
  email: string;

  constructor(params: IFriend) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
  }
}
