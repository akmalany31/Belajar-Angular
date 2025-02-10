import { InjectionToken } from '@angular/core';

export const localStorageToken = new InjectionToken<any>('LocalStorage', {
  //service ini hanya akan diinstansiasi jika memang diperlukan
  providedIn: 'root',
  //factory ini akan mengembalikan nilai dari localStorage
  factory () {
    return localStorage;
    //kalau mau pake session storage
    //return sessionStorage
  },
});
