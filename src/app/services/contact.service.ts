import { Injectable } from '@angular/core';
import { IContact } from "../pages/contactus/IContact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: IContact[] = []

  constructor() { }

  getContacts(): IContact[] {
    return this.contacts
  }

  addContact(contact: IContact): IContact[] {
    this.contacts = [...this.contacts, contact]
    return this.contacts
  }
}
