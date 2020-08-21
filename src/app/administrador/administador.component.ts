import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-administador',
  templateUrl: './administador.component.html',
  styleUrls: ['./administador.component.css']
})
export class AdministadorComponent implements OnInit {
  user: any;

  constructor(private router: Router, private storageService: StorageService, private loginService: LoginService) {
    loginService.hiddenNavbar = true;
    this.user = this.storageService.getCurrentSession();
  }

  ngOnInit(): void {
    this.user = this.storageService.getCurrentSession();
    if (this.user !== null) {
      this.router.navigate(['administrador']);
    } else {
      this.router.navigate(['home']);
    }
  }

  goToUser() {
    this.router.navigate(['usuario']);
  }

  goToCity() {
    this.router.navigate(['ciudad']);
  }

  goToDepartment() {
    this.router.navigate(['departamento']);
  }

  goToPharmacy() {
    this.router.navigate(['farmacia']);
  }

  goToInventory() {
    this.router.navigate(['inventario']);
  }

  goToLaboratory() {
    this.router.navigate(['laboratorio']);
  }

  goToProvider() {
    this.router.navigate(['proveedor']);
  }

  goToShelf() {
    this.router.navigate(['estante']);
  }

  goToRol() {
    this.router.navigate(['rol']);
  }

  goToStatus() {
    this.router.navigate(['estado']);
  }

  goToTypeProduct() {
    this.router.navigate(['tipo producto']);
  }

}
