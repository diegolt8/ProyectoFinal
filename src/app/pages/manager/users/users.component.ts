import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { CityService } from 'src/app/services/city.service';
import { RolService } from 'src/app/services/rol.service';
import { runInThisContext } from 'vm';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('modalSave', { static: false }) private closeModal: ElementRef;

  constructor(private userService: UserService,
    private cityService: CityService,
    private rolService: RolService,
    private storageService: StorageService,
    private router: Router) {
  }

  use: any;

  ngOnInit(): void {
    this.use = this.storageService.getCurrentSession();
    if (this.use != null) {
      this.getCities();
      this.getRol();
      this.getUsers();
    } else {
      this.router.navigate(['home']);
    }
  }

  user: any = {
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
  };

  userEdit: any = {
    name: '',
    lastname: '',
    documenttype: '',
    documentnumber: '',
    gender: '',
    age: 0,
    birthdate: '',
    points: 0,
    password: '',
    rol_id: 1,
    city_id: 1,
    admissiondate: '',
    id: 0
  };

  cities: any = [];
  users: any = [];
  roles: any = [];

  actualPage = 1;

  FilterPipe: any = '';

  getCities() {
    this.cityService.getCity().subscribe(data => {
      this.cities = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  findUser(id: string) {
    for (const u of this.users) {
      if (u.id === id) {
        this.userEdit = u;
      }
    }
  }

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

  getRol() {
    this.rolService.getRol().subscribe(data => {
      this.roles = JSON.parse(JSON.parse(JSON.stringify(data)).data);
      this.users.forEach(user => {
        this.roles.forEach(rol => {
          if (user.rol_id === rol.id) {
            user.rol_id = rol.name;
          }
        });
      });
    });
  }


  saveUser() {
    const postObject = new FormData();

    this.cities.forEach(element => {
      if (element.name === this.user.city_id) {
        this.user.city_id = element.id;
      }
    });

    this.roles.forEach(element => {
      if (element.name === this.user.rol_id) {
        this.user.rol_id = element.id;
      }
    });

    postObject.append('action', 'save');
    postObject.append('name', this.user.name);
    postObject.append('lastname', this.user.lastname);
    postObject.append('documenttype', this.user.documenttype);
    postObject.append('documentnumber', this.user.documentnumber);
    postObject.append('gender', this.user.gender);
    postObject.append('age', this.user.age);
    postObject.append('birthdate', this.user.birthdate);
    postObject.append('points', this.user.points);
    postObject.append('password', this.user.password);
    postObject.append('rol_id', this.user.rol_id);
    postObject.append('city_id', this.user.city_id);
    postObject.append('admissiondate', this.user.admissiondate);
    postObject.append('id', this.user.id);
    this.userService.saveUser(postObject).subscribe(data => {
      let res: any;
      res = data;
      console.log(this.user);
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

  deleteUser() {
    this.userService.deleteUser(this.userEdit.id).subscribe(data => {
      let res: any;
      res = data;
      console.log(data);
      if (res.code === '1') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se eliminó satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.getUsers();
      } else if (res.code === '2') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Oops! no se pudo eliminar',
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

  editUser() {
    const postObject = new FormData();

    this.cities.forEach(element => {
      if (element.name === this.userEdit.city_id) {
        this.userEdit.city_id = element.id;
      }
    });

    postObject.append('action', 'update');
    postObject.append('name', this.userEdit.name);
    postObject.append('lastname', this.userEdit.lastname);
    postObject.append('documenttype', this.userEdit.documenttype);
    postObject.append('documentnumber', this.userEdit.documentnumber);
    postObject.append('gender', this.userEdit.gender);
    postObject.append('age', this.userEdit.age);
    postObject.append('birthdate', this.userEdit.birthdate);
    postObject.append('points', this.userEdit.points);
    postObject.append('password', this.userEdit.password);
    postObject.append('rol_id', this.userEdit.rol_id);
    postObject.append('city_id', this.userEdit.city_id);
    postObject.append('admissiondate', this.userEdit.admissiondate);
    postObject.append('id', this.userEdit.id);
    this.userService.editUser(postObject).subscribe(data => {
      let res: any;
      res = data;
      console.log(this.user);
      if (res.code === '1') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se editó satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (res.code === '2') {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops! no se pudo editar',
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
