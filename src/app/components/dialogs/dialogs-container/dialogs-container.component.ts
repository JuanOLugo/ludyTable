import { Component, inject } from '@angular/core';
import { DialogsContainerService } from './service/dialogService/dialogs-container.service';
import { TableComponentService } from '../../table/services/TableComponentService/table-component-service.service';

import { DialogstateService } from './service/DialogStateService/dialogstate.service';
import { DialogInfoComponent } from '../dialog-info/dialog-info.component';
import { DialogEdituserComponent } from '../dialog-edituser/dialog-edituser.component';


@Component({
  selector: 'app-dialogs-container',
  imports: [DialogInfoComponent,  DialogEdituserComponent],
  templateUrl: './dialogs-container.component.html',

})
export class DialogsContainerComponent {

  dialogContainerService = inject(DialogsContainerService)
  tableComponentService = inject(TableComponentService)
  dialogStateService = inject(DialogstateService)
  

}
