import { Injectable } from '@angular/core';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import {AuthService} from '../services/auth.service';


import {ChatMessage} from '../models/chat-message.model';

@Injectable()
export class ChatService {

  constructor() { }

}
