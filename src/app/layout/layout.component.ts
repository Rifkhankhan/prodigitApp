import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../Service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private authService:AuthService,private router : Router) { }
	authSub: Subscription = new Subscription();

  ngOnInit(): void {
  }

  logout()
  {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
