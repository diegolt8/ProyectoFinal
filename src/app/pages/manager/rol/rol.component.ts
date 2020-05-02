import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/services/rol.service';

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
        this.getRoles();
      } else if (res.code === '2') {
        console.log('No se pudo eliminar');
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
        this.getRoles();
      } else if (res.code === '2') {
        console.log('No se pudo actualizar');
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
        console.log('se pudo registrar');
        this.getRoles();
      } else if (res.code === '2') {
        console.log('no se pudo registrar');
      }
    });
  }
}
