import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { shelfService } from 'src/app/services/shelf.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shelfs',
  templateUrl: './shelfs.component.html',
  styleUrls: ['./shelfs.component.css']
})
export class ShelfsComponent implements OnInit {

  @ViewChild('modalSave', { static: false }) private closeModal: ElementRef;

  constructor(private shelfService: shelfService, private storageService: StorageService, private router: Router) {

  }

  FilterPipe: any = '';

  actualPage = 1;

  user: any;

  ngOnInit(): void {
    this.user = this.storageService.getCurrentSession();
    if (this.user != null) {
      this.getShelfs();
    } else {
      this.router.navigate(['home']);
    }
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
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Se eliminó satisfactoriamente'
        })
        this.getShelfs();
      } else if (res.code === '2') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'No se pudo eliminar'
        })
      } else if (res.code === '3') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Oops! resulto un problema'
        })
      }
    });
    this.closeModal.nativeElement.click();
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
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Se editó satisfactoriamente'
        })
        this.getShelfs();
      } else if (res.code === '2') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'No se pudo editar'
        })
      } else if (res.code === '3') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Oops! resulto un problema'
        })
      }
    });
    this.closeModal.nativeElement.click();
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
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Se registró satisfactoriamente'
        })
        this.getShelfs();
      } else if (res.code === '2') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'No se pudo registrar'
        })
      } else if (res.code === '3') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Oops! resulto un problema'
        })
      }
    });
    this.closeModal.nativeElement.click();
  }

  clear() {
    this.shelf = {
      name: [null],
      description: [null],
    }
  }
}
