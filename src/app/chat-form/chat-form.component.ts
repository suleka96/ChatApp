import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message: string;

  //dependency injection
  constructor(private chat: ChatService) { }

  ngOnInit() {
  }

  //calling sendMessage method in the ChatService
  send(){
    this.chat.sendMessage(this.message);
  }

  handelSubmit(event){
    //checking if the enter button was pressed
    if(event.keyCode == 13){
      this.send();
    }
  }

}
