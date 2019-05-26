import { Injectable } from '@angular/core';
import { IFriend } from "../pages/friends/IFriend";

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  friends: IFriend[] = []

  constructor() { }

  getFriends(): IFriend[] {
    return this.friends
  }

  addFriend(friend: IFriend): IFriend[] {
    console.log("tess")
    this.friends = [...this.friends, friend]
    return this.friends
  }

  deleteFriends() {
    this.friends = []
  }
}
