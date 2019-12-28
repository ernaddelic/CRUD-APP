import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoggedInGuard } from './logged-in.guard';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
  {path: "", 
  redirectTo: localStorage.getItem('auth') !== null ? 'user-list' : 'login', 
  pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "user-list", component: UsersComponent, canActivate: [LoggedInGuard]},
  {path: "add-user", component: AddUserComponent},
  {path: "edit-user", component: EditUserComponent},
  {path: "signup", component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
