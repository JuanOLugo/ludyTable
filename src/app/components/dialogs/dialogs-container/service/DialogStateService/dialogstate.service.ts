import { Injectable, signal } from '@angular/core';
import { IinfoDialog } from '../../interface/IInfoDialog';

@Injectable({
  providedIn: 'root'
})
export class DialogstateService {

  constructor() { }

   InfoAddress = signal<IinfoDialog>({
    action: false,
    user: -1,
    InfoAddress: {
      street: '',
      suite: '',
      city: '',
    },
  });

  InfoCompany = signal<IinfoDialog>({
    action: false,
    user: -1,
    InfoCompany: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  });

  EditUser = signal({
    action: false,
    user: -1,
  });

  //Close actions

  closeInfo() {
    this.InfoAddress.set({
      action: false,
      user: -1,
      InfoAddress: {
        street: '',
        suite: '',
        city: '',
      },
    });
    this.InfoCompany.set({
      action: false,
      user: -1,
      InfoCompany: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    });
  }

  closeEditUser() {
    this.EditUser.set({
      action: false,
      user: -1
    });
  }

  
  


}
