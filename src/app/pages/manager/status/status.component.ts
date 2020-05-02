import { Component, OnInit } from '@angular/core';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private statusService: StatusService) {
    this.getStatus()
  }

  ngOnInit(): void {
  }

  status: any = {
    name: '',
    id: 0
  }

  statusEdit: any = {
    name: '',
    id: 0
  }

  statuss: any = [];

  getStatus() {
    this.statusService.getStatus().subscribe(data => {
      console.log(data);
      this.statuss = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  findStatus(id: string) {
    for (const status of this.statuss) {
      if (status.id === id) {
        this.statusEdit = status;
      }
    }
  }

  deleteStatus() {
    this.statusService.deleteStatus(this.statusEdit.id).subscribe(data => {
      let res: any;
      res = data;
      console.log(data);
      if (res.code === '1') {
        this.getStatus();
      } else if (res.code === '2') {
        console.log('No se pudo eliminar');
      }
    });
  }

  editStatus() {
    this.statusEdit = {
      action: 'update',
      ...this.statusEdit,
    };

    const postObject = new FormData();

    postObject.append('action', this.statusEdit.action);
    postObject.append('name', this.statusEdit.name);
    postObject.append('id', this.statusEdit.id);

    this.statusService.editStatus(postObject).subscribe(data => {
      let res: any;
      res = data;
      if (res.code === '1') {
        this.getStatus();
      } else if (res.code === '2') {
        console.log('No se pudo actualizar');
      }
    });
  }

  saveStatus() {
    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('name', this.status.name);
    postObject.append('id', this.status.id);

    console.log(this.status);

    this.statusService.saveStatus(postObject).subscribe(data => {
      let res: any;
      res = data;
      if (res.code == '1') {
        console.log('se pudo registrar');
        this.getStatus();
      } else if (res.code === '2') {
        console.log('no se pudo registrar');
      }
    });
  }

}
