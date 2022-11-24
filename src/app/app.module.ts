import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './home/create/create.component';
import { EditComponent } from './profile/edit/edit.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { LayoutComponent } from './layout/layout.component';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		AppComponent,
		RegisterComponent,
		HomeComponent,
		CreateComponent,
		EditComponent,
    ProfileComponent,
    ChangePasswordComponent,
    LayoutComponent
	],
	imports: [
    CommonModule,
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,

	],
	providers: [],
	bootstrap: [AppComponent],
  
})
export class AppModule {}
