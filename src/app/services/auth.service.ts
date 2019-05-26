import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from '@angular/router';
import decode from "jwt-decode";

import { ICredential } from "../pages/home/ICredential";
import { FriendService } from "./friend.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURI = 'http://localhost:8000'

  private jwt: string
  private user: ICredential | null

  constructor(private router: Router, private http: Http, private friendService: FriendService) { }

  getUser({ username, password }: ICredential) {
    return new Promise((resolve, reject) => {
      let apiEndpoint = 'login'
      this.http
        .post(`${this.apiURI}/${apiEndpoint}`, {
          username,
          password
        })
        .subscribe(response => {
          const data = response.json()
          if (data.found) {
            resolve(data.token)
          } else {
            reject(null)
          }
        })
    })
  }

  decodeUser(): any {
    this.user = (this.isLoggedIn()) ? decode(localStorage.getItem('authToken')) : null
    return this.user
  }

  login(credential: ICredential): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let shouldValid: boolean
      try {
        let jwt = await this.getUser(credential)
        this.jwt = jwt.toString()
        localStorage.setItem('authToken', this.jwt);
        shouldValid = true;
        resolve(shouldValid)
      } catch (error) {
        shouldValid = false
        reject(shouldValid)
      }
    })
  }

  isLoggedIn(): boolean {
    let isLoggedIn = (localStorage.getItem('authToken')) ? true : false
    return isLoggedIn
  }

  logout() {
    localStorage.removeItem('authToken');
    this.friendService.deleteFriends()
    this.router.navigate(['/home']);
  }
}
