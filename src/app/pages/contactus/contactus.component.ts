import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IContact } from './IContact'

import { ContactService } from "../../services/contact.service";

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  contacts: IContact[] = []

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  })

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts()
  }

  get name() {
    return this.form.get('name')
  }

  get email() {
    return this.form.get('email')
  }

  get message() {
    return this.form.get('message')
  }

  onSubmit() {
    if (this.name.valid && this.email.valid && this.message.valid) {
      let newContact: IContact = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value,
      }
      this.name.reset()
      this.email.reset()
      this.message.reset()

      this.contacts = this.contactService.addContact(newContact)
    } else {
      this.name.markAsTouched()
      this.email.markAsTouched()
      this.message.markAsTouched()
    }
  }

}
