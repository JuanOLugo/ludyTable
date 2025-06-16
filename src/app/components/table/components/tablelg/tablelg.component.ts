import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TableComponentService } from '../../services/TableComponentService/table-component-service.service';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-tablelg',
  imports: [TableModule, ButtonModule, ConfirmPopupModule, ],
  templateUrl: './tablelg.component.html',
  styleUrl: './tablelg.component.css'
})
export class TablelgComponent {
  tableComponentService = inject(TableComponentService)

}
