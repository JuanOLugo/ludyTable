import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { UserAddress, UserCompany } from '../../table/interfaces/IUser';
import { TableModule } from 'primeng/table';
import { DialogstateService } from '../../dialogs/dialogs-container/service/DialogStateService/dialogstate.service';
@Component({
  selector: 'app-dialog-info',
  imports: [DialogModule, TableModule],
  templateUrl: './dialog-info.component.html',
})
export class DialogInfoComponent {
  @Input() InfoUserAddress: UserAddress | null = null;
  @Input() InfoUserCompany: UserCompany | null = null;
  @Input() visible = true;
  @Output() changeVisibleEmmiter = new EventEmitter();

  dialogStateService = inject(DialogstateService)

  OnChangeVisible() {
      this.changeVisibleEmmiter.emit();
      this.dialogStateService.closeInfo()
      console.log(this.visible);
  }

  manualDialogClose() {
    if(this.visible){
     this.visible = false;
    }
  }
}
