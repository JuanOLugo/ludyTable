import { inject, Injectable, signal } from '@angular/core';
import { TableService } from '../table/table.service';
import { ConfirmationService } from 'primeng/api';
import { DialogsContainerService } from '../../../dialogs/dialogs-container/service/dialogService/dialogs-container.service';
import { DialogstateService } from '../../../dialogs/dialogs-container/service/DialogStateService/dialogstate.service';

@Injectable({
  providedIn: 'root',
})
export class TableComponentService {
  constructor() {}

  tableService = inject(TableService);
  confirmServicePopup = inject(ConfirmationService);
  dialogStateService = inject(DialogstateService);
  //User select by id to info dialog
  userSelect = signal(-1);


  SearchUsername = '';

  ChangeDialogInfo(item: string, userId: number) {
    this.userSelect.set(userId);
    const user = this.usersTable.find(u => u.id === userId)
    if (item === 'address')
      this.dialogStateService.InfoAddress.update((prev) => ({
        ...prev,
        action: true,
        user: userId,
        InfoAddress: user?.address
      }));
    else if (item === 'company')
      this.dialogStateService.InfoCompany.update((prev) => ({
        ...prev,
        action: true,
        user: userId,
        InfoCompany: user?.company
      }));
    else {
      this.dialogStateService.InfoCompany.update((prev) => ({
        ...prev,
        action: false,
        user: -1,
      }));
      this.dialogStateService.InfoAddress.update((prev) => ({
        ...prev,
        action: false,
        user: -1,
      }));
    }
  }

  //visibleEditDialog
  visibleEditDialog = false;

  onChangeDialogEdit() {
    if (this.visibleEditDialog) {
      this.visibleEditDialog = false;
    } else {
      this.visibleEditDialog = true;
    }
  }

  //Edit options
  // user select by id to edit
  userToEdit = signal<number>(-1);

  onEditUser(userId: number) {
    this.userToEdit.update((prev) => userId);
  }

  changeEditUserDialog(userId: number) {
    this.userToEdit.update((prev) => userId);
    this.dialogStateService.EditUser.set({
      action: true,
      user: userId
    })
    console.log(this.userToEdit());
  }

  closeDialogEdit() {
    this.userToEdit.update((prev) => -1);
    this.visibleEditDialog = false;
  }

  //Sorting
  SortNames = false;

  sortChange() {
    this.SortNames = !this.SortNames;
    this.tableService.sortByFirtsName(this.SortNames);
  }

  usersTable = this.tableService.users();

  SearchUserHandler(event: Event) {
    this.SearchUsername = (event.target as HTMLInputElement).value;
    if (this.SearchUsername.length > 0) {
      this.usersTable = this.tableService.sortByname(this.SearchUsername);
    } else {
      this.usersTable = this.tableService.users();
    }
  }

  clearInputSearchUser() {
    this.SearchUsername = '';
    this.usersTable = this.tableService.users();
  }

  onDeleteUser(userId: number, e: Event) {
    this.confirmServicePopup.confirm({
      target: e.target as HTMLElement,
      message: 'You want delete this user?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      closable: true,
      position: 'right',
      accept: () => {
        this.tableService.users.update((prev) =>
          prev.filter((u) => u.id != userId)
        );

        localStorage.setItem(
          'users',
          JSON.stringify(this.tableService.users())
        );
        this.confirmServicePopup.close();
      },
      reject: () => {
        this.confirmServicePopup.close();
      },
    });
  }
}
