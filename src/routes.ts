import {Routes} from '@angular/router';
import {SignUpComponent} from './app/sign-up/sign-up.component';
import {LogInComponent} from './app/log-in/log-in.component';
import {ChatRoomComponent} from './app/chat-room/chat-room.component';

export const appRoutes: Routes = [
    {path: 'signup', component: SignUpComponent},
    {path: 'login', component: LogInComponent},
    {path: 'chat', component: ChatRoomComponent},
    {path: '', redirectTo: '/login', pathMatch:'full'},
];