import { Injectable } from '@angular/core';
import { IUser } from '../../table/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class DefaultItemsService {

  constructor() { }


  //User
  userDefault: IUser = {
    id: new Date().getTime() * 2,
    name: '',
    email: '',
    phone: '',
    username: '',
    website: '',
    address: {
      city: '',
      street: '',
      suite: '',
    },
    company: {
      bs: '',
      catchPhrase: '',
      name: '',
    },
  }
}
