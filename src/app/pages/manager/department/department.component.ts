import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(private departmentService: DepartmentService) {
    this.getDepartments();
  }

  ngOnInit(): void {
  }

  department: any = {
    name: '',
    description: '',
    id: 0
  }

  departmentEdit: any = {
    name: '',
    description: '',
    id: 0
  }

  departments: any = [];

  getDepartments() {
    this.departmentService.getDepartment().subscribe(data => {
      this.departments = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  findDepartment(id: string) {
    for (const department of this.departments) {
      if (department.id === id) {
        this.departmentEdit = department;
      }
    }
  }

  deleteDepartment() {
    this.departmentService.deleteDepartment(this.departmentEdit.id).subscribe(data => {
      let res: any;
      res = data;
      if (res.code === '1') {
        this.getDepartments();
      } else if (res.code === '2') {
        console.log('No se pudo eliminar');
      }
    });
  }

  editDepartment() {
    this.departmentEdit = {
      action: 'update',
      ...this.departmentEdit,
    };

    const postObject = new FormData();

    postObject.append('action', this.departmentEdit.action);
    postObject.append('name', this.departmentEdit.name);
    postObject.append('description', this.departmentEdit.description);
    postObject.append('id', this.departmentEdit.id);

    this.departmentService.editDepartment(postObject).subscribe(data => {
      let res: any;
      res = data;

      if (res.code === '1') {
        this.getDepartments();
      } else if (res.code === '2') {
        console.log('No se pudo actualizar');
      }
    });
  }

  saveDepartment() {
    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('name', this.department.name);
    postObject.append('description', this.department.description);
    postObject.append('id', this.department.id);

    this.departmentService.saveDepartment(postObject).subscribe(data => {
      let res: any;
      res = data;

      if (res.code == '1') {
        console.log('se pudo registrar');
        this.getDepartments();
      } else if (res.code === '2') {
        console.log('no se pudo registrar');
      }
    });
  }

}
