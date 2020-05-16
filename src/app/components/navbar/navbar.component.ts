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

  constructor(private router: Router, public storageService: StorageService) {
    this.user = storageService.getCurrentSession();
    if (this.user !== null) {
      this.getMenus(this.user.rol_id);
    }
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

  logout() {
    this.storageService.logout();
  }

  getMenus(user) {
    if (user === '2') {
      this.menus.push('ciudad',
        'departamento',
        'inventario',
        'laboratorio',
        'proveedor',
        'rol',
        'estante',
        'estado',
        'tipoProducto',
        'usuario');
    } else if ('1') {
      this.menus.push(
        'inventario',
        'usuario');
    }
  }

}
