import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwt: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJBQkMifQ.5v2YwEGKWpIKPOMYcZkxPex3TDIcabbdFRFoGJmHLaM';

  constructor(private router: Router) { }

  login(credential, isValid): boolean {
    const { username, password } = credential;
    if (username === 'ABC' && password === '123') {
      localStorage.setItem('authToken', this.jwt);
      isValid = true;
    }
    return isValid;
  }

  isLoggedIn() {
    return localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/home']);
  }
}
