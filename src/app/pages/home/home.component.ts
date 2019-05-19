import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICredential } from "./ICredential";
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isValid: boolean = false
  isSubmitted = false

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
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
      this.isValid = this.authService.login(credential, this.isValid)
      this.isSubmitted = true
      if (this.isValid) {
        this.router.navigate(['/friends'])
      }
    }
  }

}
