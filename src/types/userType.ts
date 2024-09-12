export enum Sex {
   Male = "мужской",
   Female = "женский"
}

export interface IUser {
   id: number,
   name: string,
   email: string,
   sex: Sex | string
}

export interface IParams {
   page: number,
   pageCount: number
}