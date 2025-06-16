import {
  Component,
  EventEmitter,
  inject,
  Output,
  viewChild,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NavbarcontentService } from './services/VavbarContentServices/navbarcontent.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbarcontent',
  imports: [ButtonModule, RouterLink],
  templateUrl: './navbarcontent.component.html',
  styleUrl: './navbarcontent.component.css',
})
export class NavbarcontentComponent {
  navbarContentService = inject(NavbarcontentService);
  @Output() stateNavbar = new EventEmitter();
  @Output() itemsEmmiter = new EventEmitter<any>();

  //Emmit a state to navbar for close 
  onChangeNavbarState() {
    this.stateNavbar.emit();
    
  }


  //Emmit a component to parent component to this create the element
  onEmmitDialogOption(option: string) {
    for (let item of this.navbarContentService.NavbarItems) {
      if (item.minus === option) {
        this.itemsEmmiter.emit(item.component);
        console.log("entra")
      }
    }
  }
}
