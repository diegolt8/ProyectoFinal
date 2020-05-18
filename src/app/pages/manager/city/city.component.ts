import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { DepartmentService } from 'src/app/services/department.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  constructor(private cityService: CityService,
              private departmentService: DepartmentService,
              private storageService: StorageService,
              private router: Router) {
    this.getCitys();
    this.getDepartments();
  }

  user: any;

  @ViewChild('modalSave', { static: false }) private closeModal: ElementRef;

  ngOnInit(): void {
    this.user = this.storageService.getCurrentSession();
    if (this.user != null) {
      this.getCitys();
    } else {
      this.router.navigate(['home']);
    }
  }

  FilterPipe: any = '';

  actualPage = 1;

  city: any = {
    name: '',
    description: '',
    department_id: 1,
    id: 0
  }

  cityEdit: any = {
    name: '',
    description: '',
    department_id: 1,
    id: 0
  }

  cities: any = [];

  departments: any = [];

  getCitys() {
    this.cityService.getCity().subscribe(data => {
      this.cities = JSON.parse(JSON.parse(JSON.stringify(data)).data);
      this.cities.forEach(city => {
        this.departments.forEach(department => {
          if (city.department_id === department.id) {
            city.department_id = department.name;
          }
        })
      });
    });
  }

  findCity(id: string) {
    for (const c of this.cities) {
      if (c.id === id) {
        this.cityEdit = c;
      }
    }
  }

  deleteCity() {
    this.cityService.deleteCity(this.cityEdit.id).subscribe(data => {
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
        this.getCitys();
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

  getDepartments() {
    this.departmentService.getDepartment().subscribe(data => {
      this.departments = JSON.parse(JSON.parse(JSON.stringify(data)).data);
      this.cities.forEach(city => {
        this.departments.forEach(department => {
          if (city.department_id === department.id) {
            city.department_id = department.name;
          }
        })
      });
    });
  }

  editCity() {
    this.departments.forEach(element => {
      if (element.name === this.cityEdit.department_id) {
        this.cityEdit.department_id = element.id;
      }
    });
    const postObject = new FormData();
    postObject.append('action', 'update');
    postObject.append('name', this.cityEdit.name);
    postObject.append('description', this.cityEdit.description);
    postObject.append('department_id', this.cityEdit.department_id);
    postObject.append('id', this.cityEdit.id);

    this.cityService.editCity(postObject).subscribe(data => {
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
        this.getCitys();
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

  saveCity() {
    this.departments.forEach(element => {
      if (element.name === this.city.department_id) {
        this.city.department_id = element.id;
      }
    });
    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('name', this.city.name);
    postObject.append('description', this.city.description);
    postObject.append('department_id', this.city.department_id);
    postObject.append('id', this.city.id);

    this.cityService.saveCity(postObject).subscribe(data => {
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
        this.getCitys();
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
