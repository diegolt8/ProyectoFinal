import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  constructor(private rolService: RolService) {
    this.getRoles();
  }

  ngOnInit(): void {
  }

  FilterPipe: any = '';

  actualPage = 1;

  rol: any = {
    name: '',
    description: '',
    id: 0
  }

  rolEdit: any = {
    name: '',
    description: '',
    id: 0
  }

  roles: any = [];

  getRoles() {
    this.rolService.getRol().subscribe(data => {
      this.roles = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  findRol(id: string) {
    for (const rol of this.roles) {
      if (rol.id === id) {
        this.rolEdit = rol;
      }
    }
  }

  deleteRol() {
    this.rolService.deleteRol(this.rolEdit.id).subscribe(data => {
      let res: any;
      res = data;
      if (res.code === '1') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se eliminó satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.getRoles();
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
  }

  editRol() {
    this.rolEdit = {
      action: 'update',
      ...this.rolEdit,
    };

    const postObject = new FormData();

    postObject.append('action', this.rolEdit.action);
    postObject.append('name', this.rolEdit.name);
    postObject.append('description', this.rolEdit.description);
    postObject.append('id', this.rolEdit.id);

    this.rolService.editRol(postObject).subscribe(data => {
      let res: any;
      res = data;
      console.log(data);
      if (res.code === '1') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se editó satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.getRoles();
      } else if (res.code === '2') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
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
  }

  saveRol() {
    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('name', this.rol.name);
    postObject.append('description', this.rol.description);
    postObject.append('id', this.rol.id);

    console.log(this.rol);

    this.rolService.saveRol(postObject).subscribe(data => {
      let res: any;
      res = data;
      if (res.code === '1') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se registro satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.getRoles();
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
  }
}
