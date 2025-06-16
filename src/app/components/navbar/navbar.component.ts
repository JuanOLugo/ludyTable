import {
  Component,
  ElementRef,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavbarcontentComponent } from './components/navbarcontent/navbarcontent.component';
import { DialogModule } from 'primeng/dialog';
import { NavbarcontentService } from './components/navbarcontent/services/VavbarContentServices/navbarcontent.service';
import { DialogCreateuserComponent } from '../dialogs/dialog-createuser/dialog-createuser.component'; 

@Component({
  selector: 'app-navbar',
  imports: [NavbarcontentComponent, DialogModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  //View childs
  @ViewChild('globalContent') globalContent!: ElementRef;
  @ViewChild('dialogContainer', { read: ViewContainerRef })
  dialogContainerRef!: ViewContainerRef;

  //Services
  navbarContentService = inject(NavbarcontentService);

  //Props
  stateNavbar = false;
  DialogToOpen = '';


  //Change the navbar state remove a add class
  onChangeStateNavbar() {
    this.stateNavbar = !this.stateNavbar;
    if (this.stateNavbar) {
      this.globalContent.nativeElement.classList.add('left-0');
      this.globalContent.nativeElement.classList.remove('-left-[100%]');
    } else {
      this.globalContent.nativeElement.classList.add('-left-[100%]');
      this.globalContent.nativeElement.classList.remove('left-0');
    }

  }

  //Laod a dialog component in a dialog container
  loadDialog(component: any){
    this.dialogContainerRef.clear() //Clear the dialog container to create new
    const componentRef = this.dialogContainerRef.createComponent(component) //create a new componenet in the container
    const subscription = (componentRef.instance as DialogCreateuserComponent).CloseNavbarEmitter.subscribe(() => {
        this.onChangeStateNavbar() //execute onChangeStateNavbar to close the navbar
        subscription.unsubscribe(); // unsuscribe that for to avoid a while
    })
  }


}
