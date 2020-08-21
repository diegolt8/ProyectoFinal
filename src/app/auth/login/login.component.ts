import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CityService } from 'src/app/services/city.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('modalSave', { static: false }) private closeModal: ElementRef;

  constructor(private loginService: LoginService, private cityService: CityService,
    private userService: UserService,
    private storageService: StorageService,
    private router: Router) {
    this.loginService.hiddenNavbar = false;

  }

  ngOnInit(): void {
    this.getCities();
    this.getUsers();
  }

  loginUser: any = {
    documentnumber: '',
    password: ''
  };

  users: any = [];

  roles: any = [];

  failLogin = false;

  getUsers() {
    this.userService.getUser().subscribe(data => {
      this.users = JSON.parse(JSON.parse(JSON.stringify(data)).data);
      this.users.forEach(user => {
        this.cities.forEach(ciudad => {
          if (user.city_id === ciudad.id) {
            user.city_id = ciudad.name;
          }
        });
        this.roles.forEach(rol => {
          if (user.rol_id === rol.id) {
            user.rol_id = rol.name;
          }
        });
      });
    });
  }

  userRegister: any = {
    name: '',
    lastname: '',
    documenttype: '1',
    documentnumber: '',
    gender: '1',
    age: 0,
    birthdate: '',
    points: 0,
    password: '',
    rol_id: 3,
    city_id: 1,
    admissiondate: '',
    id: 0
  };

  cities: any = [];

  signUp() {
    this.users.forEach(async element => {
      if (element.documentnumber === this.loginUser.documentnumber) {
        Object.assign(element, { passwordLogin: this.loginUser.password, ...element });
        const pass = await this.userService.login(element);
        if (pass) {
          this.failLogin = true;
          this.storageService.login = true;
          this.loginService.user = element;
          this.storageService.setCurrentSession(element);
          if (element.rol_id === '2') {
            this.router.navigate(['administrador']);
          } else if (element.rol_id === '1') {
            this.router.navigate(['empleado']);
          } else{
            this.router.navigate(['home']);
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Revisa de nuevo tus credenciales!',
          });
        }
      }
    });
  }

  getCities() {
    this.cityService.getCity().subscribe(data => {
      this.cities = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  saveUser() {

    this.cities.forEach(element => {
      if (element.name === this.userRegister.city_id) {
        this.userRegister.city_id = element.id;
      }
    });

    this.roles.forEach(element => {
      if (element.name === this.userRegister.rol_id) {
        this.userRegister.rol_id = element.id;
      }
    });

    const dateNow = new Date();
    const dd = String(dateNow.getDate()).padStart(2, '0');
    const mm = String(dateNow.getMonth() + 1).padStart(2, '0');
    const yyyy = dateNow.getFullYear();

    const today = yyyy + '-' + mm + '-' + dd;

    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('name', this.userRegister.name);
    postObject.append('lastname', this.userRegister.lastname);
    postObject.append('documenttype', this.userRegister.documenttype);
    postObject.append('documentnumber', this.userRegister.documentnumber);
    postObject.append('gender', this.userRegister.gender);
    postObject.append('age', this.userRegister.age);
    postObject.append('birthdate', this.userRegister.birthdate);
    postObject.append('points', '0');
    postObject.append('password', this.userRegister.password);
    postObject.append('rol_id', this.userRegister.rol_id);
    postObject.append('city_id', this.userRegister.city_id);
    postObject.append('admissiondate', today);
    postObject.append('id', this.userRegister.id);
    this.userService.saveUser(postObject).subscribe(data => {
      let res: any;
      res = data;
      if (res.code === '1') {
        this.getUsers();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se registro satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        });
      } else if (res.code === '2') {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops! no se pudo registrar',
          showConfirmButton: false,
          timer: 1500
        });
      } else if (res.code === '3') {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Oops! resulto un problema',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  clear() {
    this.userRegister = {
      name: '',
      lastname: '',
      documenttype: 1,
      documentnumber: '',
      gender: 1,
      age: 0,
      birthdate: '',
      points: 0,
      password: '',
      rol_id: 1,
      city_id: 1,
      admissiondate: '',
    }
  }
}
