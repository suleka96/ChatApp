import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';

@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  private authState: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) 
    {
      this.user=afAuth.authState;
     }

    signUp(email: string, password:string, displayName:string){
      return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      .then((user) => {
        this.authState = user;
        const status : string ='online'
        this.setUserData(email, displayName, status);
        this.router.navigate(['chat']);
      }).catch(error => console.log(error));
    }
    
    setUserData(email: string, displayName: string, status: string){
      const path = `users/${this.currentUserId}`;
      const data = {
        email: email,
        displayName : displayName,
        status : status
      };
      this.db.object(path).update(data)
      .catch(error => console.log(error));
    }

    get currentUserId() : string{
      return this.authState !== null ? this.authState.uid : '';
    }

    login (email: string, password: string){
      return this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then((user) => {
        this.authState = user;
        const status ='online';
        this.setUserStatus(status,user);
        this.router.navigate(['chat']);
      });
    }

    setUserStatus(status: string,user: any){
        const path = `users/${user.uid}`;
        const data = {
          status : status
        };
      this.db.object(path).update(data)
      .catch(error => console.log(error));
      
    }

    authUser(){
      return this.user;
    }

    logOut(){
      const status : string ='offline'
      this.setOffline(status);
      this.afAuth.auth.signOut();
      this.router.navigate(['login']);
    }

    setOffline(status : string){      
      const path = `users/${this.currentUserId}`;
        const data = {
          status : status
        };
      this.db.object(path).update(data)
      .catch(error => console.log(error));
    }

}
