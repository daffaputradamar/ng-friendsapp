import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICredential } from "./ICredential";
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isValid: boolean = false
  isSubmitted: boolean = false
  user: Observable<any>

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.decodeUser()
  }

  get username() {
    return this.form.get('username')
  }

  get password() {
    return this.form.get('password')
  }

  onClick() {
    this.authService.logout()
  }

  onSubmit() {
    if (this.username.valid && this.password.valid) {
      let credential: ICredential = {
        username: this.username.value,
        password: this.password.value
      }
      this.authService.login(credential)
        .then(isValid => {
          this.isValid = isValid
          this.isSubmitted = true
          if (this.isValid) {
            this.router.navigate(['friends'])
          }
        })
        .catch(isValid => this.isSubmitted = true)
    } else {
      this.username.markAsTouched()
      this.password.markAsTouched()
    }
  }

}
