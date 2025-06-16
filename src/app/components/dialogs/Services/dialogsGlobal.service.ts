import { inject, Injectable, signal } from '@angular/core';
import { isEmail } from '../../utils/VerifyFuntions/IsEmail';
import { DialogEditUserComponentService } from '../dialog-edituser/service/DialogEditUserComponent/dialog-edit-user-component.service';
import { IUser } from '../../table/interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class DialogsGlobalService {
  constructor() {}

  //Services
  users = localStorage.getItem("users")
  user = signal<any>({
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
  });
  
  ErrorManager = {
    name: '',
    email: '',
    phone: '',
    username: '',
    website: '',
    city: '',
    street: '',
    suite: '',
    bs: '',
    catchPhrase: '',
    Companyname: '',
    slogan: '',
  };


  dialogErrorMessage = '';

  setError(item: string, message: string) {
    this.dialogErrorMessage = message;
    this.ErrorManager[item as keyof typeof this.ErrorManager] = message;
    setTimeout(() => {
      this.dialogErrorMessage = '';
      this.ErrorManager[item as keyof typeof this.ErrorManager] = '';
    }, 5000);
  }

  verifyCamps() {
    const userItems = Object.keys(this.user()).map((u) => u);
    for (let items of userItems) {
      if (this.user()[items].length < 3) {
        this.setError(items, 'falta por rellenar este campo');
        throw new Error('Campos faltantes' + items);
      }
    }

    if (isEmail(this.user().email)) {
      const phoneNumber = this.user().phone;
      if (!/[a-zA-Z]/.test(phoneNumber)) {
        if (phoneNumber.length != 10) {
          this.setError(
            'phone',
            phoneNumber.length > 10
              ? 'Just 10 Numbers'
              : 'Are 10 numbers'
          );
          throw new Error(
            phoneNumber.length > 10
              ? 'Just 10 Numbers'
              : 'Are 10 numbers'
          );
        } else {
          return this.user();
        }
      } else {
        this.setError('phone', 'That not a number phone ' + this.user().phone);
        throw new Error('That not a number phone ' + this.user().phone);
      }
    } else {
      this.setError('email', 'No es un email ' + this.user().email);
      throw new Error('No es un email ' + this.user().email);
    }
  }
}
