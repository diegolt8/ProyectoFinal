import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { CityService } from 'src/app/services/city.service';
import { RolService } from 'src/app/services/rol.service';
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

  newPassword: any = '';

  cities: any = [];
  users: any = [];
  roles: any = [];

  actualPage = 1;

  FilterPipeUser: any = '';

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
        this.users.forEach(rol => {
          if (user.rol_id === rol.id) {
            user.rol_id = rol.name;
          }
        })
      })
    });
  }


  saveUser() {
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

    const dateNow = new Date();
    const dd = String(dateNow.getDate()).padStart(2, '0');
    const mm = String(dateNow.getMonth() + 1).padStart(2, '0');
    const yyyy = dateNow.getFullYear();

    const today = yyyy + '-' + mm + '-' + dd;

    const postObject = new FormData();

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
    postObject.append('admissiondate', today);
    postObject.append('id', this.user.id);
    this.userService.saveUser(postObject).subscribe(data => {
      let res: any;
      res = data;
      if (res.code === '1') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Se registró satisfactoriamente'
        })
        this.getUsers();
      } else if (res.code === '2') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'No se pudo registrar'
        })
      } else if (res.code === '3') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Oops! resulto un problema'
        })
      }
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.userEdit.id).subscribe(data => {
      let res: any;
      res = data;
      if (res.code === '1') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Se eliminó satisfactoriamente'
        })
        this.getUsers();
      } else if (res.code === '2') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'No se pudo eliminar'
        })
      } else if (res.code === '3') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Oops! resulto un problema'
        })
      }
    });
  }

  editUser() {
    const postObject = new FormData();

    this.cities.forEach(element => {
      if (element.name === this.userEdit.city_id) {
        this.userEdit.city_id = element.id;
      }
    });

    this.roles.forEach(element => {
      if (element.name === this.userEdit.rol_id) {
        this.userEdit.rol_id = element.id;
      }
    });

    let modifica = false;

    if (this.newPassword !== '') {
      modifica = true;
      this.userEdit.password = this.newPassword;
    }

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
    postObject.append('modifica', modifica.toString());

    this.userService.editUser(postObject).subscribe(data => {
      let res: any;
      res = data;
      console.log(this.user);
      if (res.code === '1') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Se editó satisfactoriamente'
        })
        this.getUsers();
      } else if (res.code === '2') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'No se pudo editar'
        })
      } else if (res.code === '3') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Oops! resulto un problema'
        })
      }
    });
  }

  clear() {
    this.user = {
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
