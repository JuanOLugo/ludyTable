import { Component, ElementRef, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  AnimItemIn(item: HTMLElement){
    item.classList.add("top-5")
    item.classList.remove("-top-96")
  }

   AnimItemOut(item: HTMLElement){
    item.classList.add("-top-96")
    item.classList.remove("top-5")
  }

}
