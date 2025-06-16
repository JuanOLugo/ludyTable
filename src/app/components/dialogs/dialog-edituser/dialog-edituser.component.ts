import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableService } from '../../table/services/table/table.service';
import { DefaultItemsService } from '../../utils/DefaultItems/default-items.service';
import { DialogEditUserComponentService } from './service/DialogEditUserComponent/dialog-edit-user-component.service';
import { ToastModule } from 'primeng/toast';
import { DialogsGlobalService } from '../Services/dialogsGlobal.service';


@Component({
  selector: 'app-dialog-edituser',
  imports: [
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ToastModule,
  ],
  templateUrl: './dialog-edituser.component.html',
})
export class DialogEdituserComponent implements OnInit {
  @Output() closeDialogEmmiter = new EventEmitter();
  @Input() userId: number = -1;

  defaultItemsService = inject(DefaultItemsService);
  tableService = inject(TableService);

  //Servicio del componente
  dialogComponentService = inject(DialogEditUserComponentService);

  //Servicio global
  dialogGlobalService  =inject(DialogsGlobalService)
  visible = true;

  ngOnInit(): void {
    const userToEdit = this.tableService.findUser(this.userId);
    if (!userToEdit) throw new Error('No user jet');
    this.dialogGlobalService.user.set(userToEdit);
  }

  //Emmiters
  onCloseDialog() {
    this.closeDialogEmmiter.emit();
  }

  EditUser(event: SubmitEvent) {
    this.dialogComponentService.EditUser(event, this.userId)
    this.userId = -1
    this.visible = false
  }

  setClose() {
    this.onCloseDialog();
    this.dialogGlobalService.user.set(this.defaultItemsService.userDefault);
  }



  manualSetClose() {
    this.setClose();
  }

  
}
