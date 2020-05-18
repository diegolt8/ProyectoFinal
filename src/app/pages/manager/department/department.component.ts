import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  @ViewChild('modalSave', { static: false }) private closeModal: ElementRef;

  constructor(private departmentService: DepartmentService,
    private storageService: StorageService,
    private router: Router) {
    this.getDepartments();
  }

  user: any;

  ngOnInit(): void {
    this.user = this.storageService.getCurrentSession();
    if (this.user != null) {
      this.getDepartments();
    } else {
      this.router.navigate(['home']);
    }
  }

  FilterPipe: any = '';

  actualPage = 1;

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

  async getDepartments() {
    const department = await this.departmentService.getDepartment().toPromise();
    this.departments = JSON.parse(department.data);
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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se eliminó satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.getDepartments();
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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se editó satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.getDepartments();
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
    this.closeModal.nativeElement.click();
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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se registro satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.getDepartments();
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
