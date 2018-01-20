import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import {AuthService} from '../services/auth.service';

import {ChatMessage} from '../models/chat-message.model';

@Injectable()
export class ChatService {

  chatMessages: FirebaseListObservable<ChatMessage[]>;
  chatMessage: ChatMessage;
  userName: Observable<string>;
  user: any;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { 
    this.afAuth.authState.subscribe(auth =>{
      if(auth !== undefined &&  auth !== null){
        this.user = auth;
      }


      const userId = this.user.uid;
      const path = `users/${userId}`;
      this.db.object(path).subscribe( a =>{
      this.userName = a.displayName;
      });

    });   
   
  }

  getUsers() {
    const path = 'users';
    return this.db.list(path);
  }
  
  sendMessage(msg: string){
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push(
      {
        message: msg,
        timeSent: timestamp,
        userName: this.userName,
        email: email

      });

      console.log('called sendMessage()!');
  }

  getTimeStamp(){
    const now = new Date();
    const date = now.getUTCFullYear()+'/'+(now.getUTCMonth()+1)+'/'+now.getUTCDay();
    const time = now.getUTCHours()+':'+now.getUTCMinutes()+':'+now.getUTCSeconds();
    return (date+' '+time);
  }

  getMessages() : FirebaseListObservable<ChatMessage[]>{
    return this.db.list('messages',{
      query: {
        limitToLast: 25,
        orderByKey: true
      }
    });
  }

}
