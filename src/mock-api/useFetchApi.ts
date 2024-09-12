import { IUser, IParams } from '../types/userType';
import { usersData } from './data.json'

export const fetchUsers = function(params: IParams): Promise<IUser[]>{
   return new Promise((resolve) => {
      setTimeout(() => {
         const pageVal: number = params.page * params.pageCount
         resolve(usersData.slice((pageVal - params.pageCount), pageVal));
      }, 2000);
   })
}