import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component'; 
import { TableComponentService } from '../../table/services/TableComponentService/table-component-service.service';
import { DialogsContainerComponent } from '../../dialogs/dialogs-container/dialogs-container.component';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-layout-table',
  imports: [RouterOutlet, NavbarComponent, DialogsContainerComponent, ToastModule],
  templateUrl: './layout-table.component.html',
})
export class LayoutTableComponent {
  tableService = inject(TableComponentService)
}
