import { Component, OnInit } from '@angular/core';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-laboratories',
  templateUrl: './laboratories.component.html',
  styleUrls: ['./laboratories.component.css']
})
export class LaboratoriesComponent implements OnInit {

  constructor(private laboratoryService: LaboratoryService) {
    this.getlaboratories();
  }

  ngOnInit(): void {
  }

  
  FilterPipe: any = '';

  actualPage = 1;

  laboratory: any = {
    name: '',
    description: '',
    id: 0
  }

  laboratoryEdit: any = {
    name: '',
    description: '',
    id: 0
  }

  laboratories: any = [];

  getlaboratories() {
    this.laboratoryService.getLaboratory().subscribe(data => {
      this.laboratories = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  findLaboratory(id: string) {
    for (const laboratory of this.laboratories) {
      if (laboratory.id === id) {
        this.laboratoryEdit = laboratory;
      }
    }
  }

  deletelaboratory() {
    this.laboratoryService.deleteLaboratory(this.laboratoryEdit.id).subscribe(data => {
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
        this.getlaboratories();
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

  editlaboratory() {
    this.laboratoryEdit = {
      action: 'update',
      ...this.laboratoryEdit,
    };

    const postObject = new FormData();

    postObject.append('action', this.laboratoryEdit.action);
    postObject.append('name', this.laboratoryEdit.name);
    postObject.append('description', this.laboratoryEdit.description);
    postObject.append('id', this.laboratoryEdit.id);

    this.laboratoryService.editLaboratory(postObject).subscribe(data => {
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
        this.getlaboratories();
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

  savelaboratory() {
    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('name', this.laboratory.name);
    postObject.append('description', this.laboratory.description);
    postObject.append('id', this.laboratory.id);

    console.log(this.laboratory);

    this.laboratoryService.saveLaboratory(postObject).subscribe(data => {
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
        this.getlaboratories();
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