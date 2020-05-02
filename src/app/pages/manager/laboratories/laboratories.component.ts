import { Component, OnInit } from '@angular/core';
import { LaboratoryService } from 'src/app/services/laboratory.service';

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
        this.getlaboratories();
      } else if (res.code === '2') {
        console.log('No se pudo eliminar');
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
        this.getlaboratories();
      } else if (res.code === '2') {
        console.log('No se pudo actualizar');
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
        console.log('se pudo registrar');
        this.getlaboratories();
      } else if (res.code === '2') {
        console.log('no se pudo registrar');
      }
    });
  }

}
