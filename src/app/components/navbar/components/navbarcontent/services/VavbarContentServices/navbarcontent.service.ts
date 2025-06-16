import { EventEmitter, Injectable, Output } from '@angular/core';
import { INavbarItem } from '../../interfaces/Inavbar';
import { DialogCreateuserComponent } from '../../../../../dialogs/dialog-createuser/dialog-createuser.component';



@Injectable({
  providedIn: 'root'
})
export class NavbarcontentService {

  constructor() { }

  NavbarItems:INavbarItem[] = [
    {
      itemName: "Crear Usuario",
      minus: "createuser",
      component: DialogCreateuserComponent
    }
  ]
}
