import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

 logout() {
  localStorage.setItem('user', null);
  this.router.navigate(['/login']);
 }

 gotoRestaurent() {
  this.router.navigate(['/restaurent']);
 }

 gotoDashboard(){
  this.router.navigate(['/dashboard']);
 }

}
