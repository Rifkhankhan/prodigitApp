import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",redirectTo:'home',pathMatch:'full'
 },
 {
   path:'login',
   component:LoginComponent
 },
 {
   path:'home',
   component:HomeComponent,
 },
 {
  path:'register',
  component:RegisterComponent,
},

//  {
//    path:'dashboard',
//    component:DashboardComponent,
//    children:[

//      {
//        path:'dashboard1',
//        component:Dashboard1Component
//      },
//      {
//        path:'dashboard2',
//        component:Dashboard2Component
//      }
//    ]
//  }

 {
   path:"**",redirectTo:"home",pathMatch:'full'
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
