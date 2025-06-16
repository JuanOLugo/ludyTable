import { Component, inject, OnInit, signal, effect, OnDestroy } from '@angular/core';
import { TableService } from './services/table/table.service';
import { IUser } from './interfaces/IUser';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TableComponentService } from './services/TableComponentService/table-component-service.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PaginatorModule } from 'primeng/paginator';
import { TablelgComponent } from './components/tablelg/tablelg.component';
import { fromEvent } from 'rxjs';
import { DefaultItemsService } from '../utils/DefaultItems/default-items.service';

@Component({
  selector: 'app-table',
  imports: [
    TableModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    ConfirmPopupModule,
    PaginatorModule,
    TablelgComponent,
],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {

  windowWidth = signal(window.innerWidth)

  constructor() {

    fromEvent(window, "resize").subscribe(() => {
      this.windowWidth.set(window.innerWidth)
      
    })

    effect(() => {
      this.tableComponentService.usersTable = this.tableService.users()
    });

  }
  
  tableComponentService = inject(TableComponentService)
  tableService = inject(TableService);
  ConfirmServicePopUp = inject(ConfirmationService);
  deafaultItemsService = inject(DefaultItemsService)
  GetUsers(){
    this.tableService.getUsers().subscribe({
        next: (data: IUser[]) => {
          if (!data) console.log('error no data');
          this.tableService.users.set(data);
          const userToString = JSON.stringify(data);
          localStorage.setItem('users', userToString);
        },
        error: (err) => console.log(err),
      });
  }


  ngOnInit(): void {
    
    const users = localStorage.getItem('users');
    if (users) {
      try {
        if(JSON.parse(users ?? "[]").length > 0){ 
        this.tableService.setUserStringify(users)
      }else{
        this.GetUsers()
      }
      } catch (error) {
        alert("A incorrect item in localstorage")
        localStorage.removeItem("users")
        window.location.reload()
      }
    } else {
      this.GetUsers()
    }
  }

  

  


}
