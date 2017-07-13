import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(private _authServ: AuthService) {

  }

  ngOnInit() {
  }

}