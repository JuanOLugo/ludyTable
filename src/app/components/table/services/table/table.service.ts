import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor() {}
  
  httpClient = inject(HttpClient);
  users = signal<IUser[]>([]);
  userQuantity = 20
  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(
      'https://jsonplaceholder.typicode.com/users/'
    );
  }

  setUserStringify(users: string){
    const usersParse = JSON.parse(users);
    this.users.set(usersParse);

  }

  findUser(userId: number) {
    return this.users().find((u) => u.id === userId);
  }

  sortByFirtsName(sort: boolean) {
    if(sort){
      this.users.update((prev) =>
      prev.sort(function (a, b) {
        var nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB)
          return -1;
        if (nameA > nameB) return 1;
        return 0; 
      })
    );
    }else{
      this.users.set(JSON.parse(localStorage.getItem("users") ?? "[]"))
    }
  }

  sortByname(username: string){
    return this.users().filter(u => u.name.toLowerCase().includes(username.toLowerCase()) || u.username.toLowerCase().includes(username.toLowerCase()) )
  }
}
