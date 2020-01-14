import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,

})

export class RegisterComponent implements OnInit {

  Roles: any = ['Admin', 'Author', 'Reader'];
  selected:any = [];


  constructor() { }

  ngOnInit() {
  }

}
