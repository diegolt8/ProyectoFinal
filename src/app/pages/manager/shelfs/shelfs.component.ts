import { Component, OnInit } from '@angular/core';
import { shelfService } from 'src/app/services/shelf.service';

@Component({
  selector: 'app-shelfs',
  templateUrl: './shelfs.component.html',
  styleUrls: ['./shelfs.component.css']
})
export class ShelfsComponent implements OnInit {

  constructor(private shelfService: shelfService) {
    this.getShelfs();
  }

  ngOnInit(): void {
  }

  shelf: any = {
    name: '',
    description: '',
    id: 0
  }

  shelfEdit: any = {
    name: '',
    description: '',
    id: 0
  }

  shelfs: any = [];

  getShelfs() {
    this.shelfService.getShelf().subscribe(data => {
      this.shelfs = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  findShelf(id: string) {
    for (const shelf of this.shelfs) {
      if (shelf.id === id) {
        this.shelfEdit = shelf;
      }
    }
  }

  deleteShelf() {
    this.shelfService.deleteShelf(this.shelfEdit.id).subscribe(data => {
      let res: any;
      res = data;
      console.log(data);
      if (res.code === '1') {
        this.getShelfs();
      } else if (res.code === '2') {
        console.log('No se pudo eliminar');
      }
    });
  }

  editShelf() {
    this.shelfEdit = {
      action: 'update',
      ...this.shelfEdit,
    };

    const postObject = new FormData();

    postObject.append('action', this.shelfEdit.action);
    postObject.append('name', this.shelfEdit.name);
    postObject.append('description', this.shelfEdit.description);
    postObject.append('id', this.shelfEdit.id);

    this.shelfService.editShelf(postObject).subscribe(data => {
      let res: any;
      res = data;
      if (res.code === '1') {
        this.getShelfs();
      } else if (res.code === '2') {
        console.log('No se pudo actualizar');
      }
    });
  }

  saveShelf() {
    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('name', this.shelf.name);
    postObject.append('description', this.shelf.description);
    postObject.append('id', this.shelf.id);

    this.shelfService.saveShelf(postObject).subscribe(data => {
      let res: any;
      res = data;
      if (res.code == '1') {
        console.log('se pudo registrar');
        this.getShelfs();
      } else if (res.code === '2') {
        console.log('no se pudo registrar');
      }
    });
  }

}
