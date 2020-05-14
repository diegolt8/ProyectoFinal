import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any = {};

  constructor(private router: Router, private storageService: StorageService) { 
    this.user = storageService.getCurrentSession();
    this.getMenus(this.user.rol_id);
   }

  menus: any = [];

  ngOnInit() {
    $(window).scroll(function () {
      if ($(document).scrollTop() > 50) {
        $('.nav').addClass('affix');
        console.log("OK");
      } else {
        $('.nav').removeClass('affix');
      }
    });
  }

  login() {
    this.router.navigate(['login']);
  }

  getMenus(user) {
    if (user === '2') {
      this.menus.push('city',
        'department',
        'detailsale',
        'inventory',
        'invoice',
        'laboratory',
        'provider',
        'rol',
        'sale',
        'shelf',
        'state',
        'typeproduct',
        'user');
    } else if ('1') {
      this.menus.push(
      'inventory',
      'user');
    }
    console.log(this.menus);
  }

}
