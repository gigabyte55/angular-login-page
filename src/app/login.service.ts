import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoginSuccessful: boolean = false;

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    if (email === 'teszt@gmail.com' && password === '123456') {
      this.isLoginSuccessful = true;
      const expireDuration = 20000;
      const localStorageItem = {
        value: true,
        expiry: new Date().getTime() + expireDuration,
      };
      localStorage.setItem('token', JSON.stringify(localStorageItem));
      this.autoLogout(expireDuration);
    } else {
      this.isLoginSuccessful = false;
    }
    return this.isLoginSuccessful;
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return (
        JSON.parse(localStorage.getItem('token')!).expiry > new Date().getTime()
      );
    }
    return false;
  }

  autoLogout(expireDuration: number): void {
    setTimeout(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, expireDuration);
  }
}
