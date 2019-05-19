import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IFriend } from "./IFriend";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends: IFriend[] = []
  friendsFound: IFriend[] = []
  search: string = ""
  friendsKeys: string[] = ['name', 'email', 'contact']

  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    this.friendsFound = this.friends.filter(friend => {
      if(friend['name'].includes(this.search.toUpperCase())){
        return friend
      }
    })
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contact: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
  })

  get name() {
    return this.form.get('name')
  }

  get email() {
    return this.form.get('email')
  }

  get contact() {
    return this.form.get('contact')
  }

  onSubmit() {
    if (this.name.valid && this.email.valid && this.contact.valid) {
      let newFriend: IFriend = {
        name: this.name.value.toUpperCase(),
        email: this.email.value,
        contact: this.contact.value
      }
      this.name.reset()
      this.email.reset()
      this.contact.reset()

      this.friends = [...this.friends, newFriend]
      this.friendsFound = [...this.friends]
    }
  }
}
