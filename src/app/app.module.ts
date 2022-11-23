import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './home/create/create.component';
import { ViewComponent } from './home/view/view.component';
import { EditComponent } from './home/edit/edit.component';

@NgModule({
	declarations: [AppComponent, RegisterComponent, HomeComponent, CreateComponent, ViewComponent, EditComponent],
	imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule,HttpClientModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
