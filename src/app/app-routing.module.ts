import { EditComponent } from './home/edit/edit.component';
import { ViewComponent } from './home/view/view.component';
import { CreateComponent } from './home/create/create.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'home',
		children: [
			{
				path: '',
				component: HomeComponent
			},
			{
				path: 'create',
				component: CreateComponent
			},
      {
        path:'post/view/:id',
        component:ViewComponent
      },
      {
        path:'post/edit/:id',
        component:EditComponent
      }
		]
	},
	{
		path: 'register',
		component: RegisterComponent
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
		path: '**',
		redirectTo: 'home',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
