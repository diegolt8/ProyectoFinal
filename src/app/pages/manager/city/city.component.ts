import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  constructor(private cityService: CityService, private departmentService: DepartmentService) {
    this.getCitys();
    this.getDepartments();
  }

  ngOnInit(): void {

  }

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
      console.log(data);
      if (res.code === '1') {
        this.getCitys();
      } else if (res.code === '2') {
        console.log('No se pudo eliminar');
      }
    });
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
    console.log(this.cityEdit);

    this.cityService.editCity(postObject).subscribe(data => {
      let res: any;
      res = data;
      if (res.code === '1') {
        this.getCitys();
      } else if (res.code === '2') {
        console.log('no se pudo actualizar');
      }
    });
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
    console.log(this.city);
    this.cityService.saveCity(postObject).subscribe(data => {
      let res: any;
      res = data;

      if (res.code === '1') {
        console.log('se pudo registrar');
        this.getCitys();
      } else if (res.code === '2') {
        console.log('no se pudo registrar');
      }
    });
  }
}
