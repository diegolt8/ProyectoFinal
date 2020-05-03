import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CityService } from 'src/app/services/city.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('modalSave', {static: false}) private closeModal: ElementRef;

  constructor(private loginService: LoginService, private cityService: CityService, private userService: UserService) {
    this.loginService.hiddenNavbar = false;
    this.getCities();
  }

  ngOnInit(): void {
  }

  userRegister: any = {
    name: '',
    lastname: '',
    documenttype: '',
    documentnumber: '',
    gender: '',
    age: 0,
    birthdate: '',
    points: 0,
    password: '',
    rol_id: 0,
    city_id: 0,
    admissiondate: '',
    id: 0
}

  cities: any = [];

  getCities() {
    this.cityService.getCity().subscribe(data => {
      this.cities = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  saveUser() {
    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('name', this.userRegister.name);
    postObject.append('lastname', this.userRegister.lastname);
    postObject.append('documenttype', this.userRegister.documenttype);
    postObject.append('documentnumber', this.userRegister.documentnumber);
    postObject.append('gender', this.userRegister.gender);
    postObject.append('age', this.userRegister.age);
    postObject.append('birthdate', this.userRegister.birthdate);
    postObject.append('points', this.userRegister.points);
    postObject.append('password', this.userRegister.password);
    postObject.append('rol_id', this.userRegister.rol_id);
    postObject.append('city_id', this.userRegister.city_id);
    postObject.append('admissiondate', this.userRegister.admissiondate);
    postObject.append('id', this.userRegister.id);
    this.userService.saveUser(postObject).subscribe(data => {
      let res: any;
      res = data;
      console.log(this.userRegister);
      if (res.code === '1') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se registro satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (res.code === '2') {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops! no se pudo registrar',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (res.code === '3') {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Oops! resulto un problema',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
    this.closeModal.nativeElement.click();
  }
}
