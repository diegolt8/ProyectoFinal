import { Component, OnInit } from '@angular/core';
import $ from "jquery";
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.hiddenNavbar = true;
  }

}
