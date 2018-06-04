export interface ILocation {
  id: string;
  user_id: string;
  time: Date;
  city?: string;
  country?: string;
  long: number;
  lat: number;
  message: string;
  twitterUrl: string;
}

export class Location implements ILocation {
  id: string;
  user_id: string;
  time: Date;
  city?: string;
  country?: string;
  long: number;
  lat: number;
  message: string;
  twitterUrl: string;

  constructor(params: ILocation) {
    this.id = params.id;
    this.user_id = params.user_id;
    this.time = params.time;
    this.city = params.city;
    this.country = params.country;
    this.long = params.long;
    this.lat = params.lat;
    this.message = params.message;
    this.twitterUrl = params.twitterUrl;
  }
}

// export interface IMoment extends ILocation {
//   twitter
// }

// export class Moment extends Location implements IMoment {
//   constructor(options: IMoment) {
//     super(options);
//   }
// }
