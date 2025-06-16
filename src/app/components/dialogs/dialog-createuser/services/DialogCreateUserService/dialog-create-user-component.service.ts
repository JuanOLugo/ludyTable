import { inject, Injectable } from '@angular/core';
import { DialogsGlobalService } from '../../../Services/dialogsGlobal.service';
import { IUser } from '../../../../table/interfaces/IUser';
import { TableService } from '../../../../table/services/table/table.service';
import { DefaultItemsService } from '../../../../utils/DefaultItems/default-items.service'; 

@Injectable({
  providedIn: 'root',
})
export class DialogCreateUserComponentService {
  constructor() {}
  dialogGlobalService = inject(DialogsGlobalService)
  tableService = inject(TableService)
  defaultItemService = inject(DefaultItemsService)
  onChangeUser(e: Event) {
    const eventInput = e.target as HTMLInputElement;
    this.dialogGlobalService.user.update((prev) => {
      return { ...prev, [eventInput.name]: eventInput.value };
    });
  }

  onChangeSpecific(e: Event, SpecificKey: 'address' | 'company') {
    const eventInput = e.target as HTMLInputElement;
    if (SpecificKey === 'address') {
      this.dialogGlobalService.user.update((prev) => {
        return {
          ...prev,
          address: {
            ...prev.address,
            [eventInput.name]: eventInput.value,
          },
        };
      });
    } else {
      this.dialogGlobalService.user.update((prev) => {
        return {
          ...prev,
          company: {
            ...prev.company,
            [eventInput.name]: eventInput.value,
          },
        };
      });
    }
  }


  createUser(event: SubmitEvent) {
      event.preventDefault();
      console.log("here")
      if (!this.dialogGlobalService.users) throw new Error('No users jet');
      this.dialogGlobalService.verifyCamps();
      const usersParse: IUser[] = JSON.parse(this.dialogGlobalService.users);
      usersParse.push(this.dialogGlobalService.user());
      localStorage.setItem('users', JSON.stringify(usersParse));
      this.tableService.users.update((prev) => {
        return [...prev, this.dialogGlobalService.user()];
      });
      this.dialogGlobalService.user.set(this.defaultItemService.userDefault);
      alert("User created")
      return true
    }
}
