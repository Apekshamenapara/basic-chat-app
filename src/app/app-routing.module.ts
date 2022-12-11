import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './utils/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "chat",
    component: ChatAreaComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
