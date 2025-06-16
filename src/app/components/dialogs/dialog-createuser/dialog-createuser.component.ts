import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';

import { DialogsGlobalService } from '../Services/dialogsGlobal.service';

import { DefaultItemsService } from '../../utils/DefaultItems/default-items.service';
import { DialogCreateUserComponentService } from './services/DialogCreateUserService/dialog-create-user-component.service';

@Component({
  selector: 'app-dialog-createuser',
  imports: [
    DialogModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
  ],
  templateUrl: './dialog-createuser.component.html',
  providers: [MessageService],
})
export class DialogCreateuserComponent implements OnInit {
  @Output() CloseNavbarEmitter = new EventEmitter();

  ngOnInit(): void {
    this.CloseNavbarEmitter.emit();
  }
  fb = inject(FormBuilder);

  //Services
  defaultItemsService = inject(DefaultItemsService);

  dialogServiceComponent = inject(DialogCreateUserComponentService);
  globalDialogService = inject(DialogsGlobalService);

  //Props requeries
  visible = true;

  // Close dialog
  setClose() {
    if (this.visible) {
      this.visible = false;
      this.globalDialogService.user.set(this.defaultItemsService.userDefault);
    }
  }

  //Create user in LocalStorage and edit Global user prop

  createUser(event: SubmitEvent) {
    this.dialogServiceComponent.createUser(event);
    this.visible = false;
  }
}
