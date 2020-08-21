import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-laboratories',
  templateUrl: './laboratories.component.html',
  styleUrls: ['./laboratories.component.css']
})
export class LaboratoriesComponent implements OnInit {

  @ViewChild('modalSave', { static: false }) private closeModal: ElementRef;

  constructor(private laboratoryService: LaboratoryService,
    private storageService: StorageService,
    private router: Router) {
  }

  user: any;
  ngOnInit(): void {
    this.user = this.storageService.getCurrentSession();
    if (this.user != null) {
      this.getlaboratories();
    } else {
      this.router.navigate(['home']);
    }
    this.getlaboratories();
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

  async getlaboratories() {
    const laboratory = await this.laboratoryService.getLaboratory().toPromise();
    this.laboratories = JSON.parse(laboratory.data);
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
        this.getlaboratories();
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

  savelaboratory() {
    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('name', this.laboratory.name);
    postObject.append('description', this.laboratory.description);
    postObject.append('id', this.laboratory.id);

    this.laboratoryService.saveLaboratory(postObject).subscribe(data => {
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
          title: 'Se registró satisfactoriamente'
        })
        this.getlaboratories();
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
    this.laboratory = {
      name: '',
      description: ''
    }
  }
}