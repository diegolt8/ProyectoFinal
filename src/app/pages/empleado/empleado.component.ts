import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  constructor(private router: Router, private storageService: StorageService, private loginService: LoginService) {
    loginService.hiddenNavbar = true;
    this.user = this.storageService.getCurrentSession();
  }
  user: any;
  ngOnInit(): void {
    this.user = this.storageService.getCurrentSession();
    if (this.user !== null) {
      this.router.navigate(['empleado']);
    } else {
      this.router.navigate(['home']);
    }
  }

  goToUser() {
    this.router.navigate(['usuario']);
  }

  goToInventory() {
    this.router.navigate(['inventario']);
  }

  goToSale() {
    this.router.navigate(['venta']);
  }

}
