import { inject, Injectable } from '@angular/core';
import { DialogsGlobalService } from '../../../Services/dialogsGlobal.service';
import { TableService } from '../../../../table/services/table/table.service';
import { DefaultItemsService } from '../../../../utils/DefaultItems/default-items.service';

@Injectable({
  providedIn: 'root',
})
export class DialogEditUserComponentService {
  constructor() {}
  defaultItemsService = inject(DefaultItemsService)
  tableService = inject(TableService);
  dialogGlobalService = inject(DialogsGlobalService);

  users = localStorage.getItem('users');
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

  EditUser(event: SubmitEvent, userId: number) {
    event.preventDefault();
    if (!this.users) throw new Error('No users jet');

    this.tableService.users.update((prev) => {
      return prev.map((u) => {
        if (u.id === userId) {
          return this.dialogGlobalService.verifyCamps();
        } else return u;
      });
    });
    
    //verification
    localStorage.setItem('users', JSON.stringify(this.tableService.users()));
    this.dialogGlobalService.user.set(this.defaultItemsService.userDefault);
    alert('User Edit');
  }
}
