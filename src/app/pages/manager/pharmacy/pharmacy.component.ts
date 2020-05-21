import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import Swal from 'sweetalert2';

const { MICROSERVICE_URL } = environment;

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})

export class PharmacyComponent implements OnInit {

  constructor(private storageService: StorageService,
    private router: Router,
    private pharmacyService: PharmacyService) { this.getPharmacies(); }

  urlImage = `${MICROSERVICE_URL}/ProyectoFinalBackend/`;

  user: any;

  ngOnInit(): void {
    this.user = this.storageService.getCurrentSession();
    if (this.user != null) {
      this.getPharmacies();
    } else {
      this.router.navigate(['home']);
    }
  }

  changeListener($event): void {
    this.readthis($event.target);
  }

  readthis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

  FilterPipe: any = '';

  actualPage = 1;

  imgOld = '';

  image: any = null;

  pharmacy: any = {
    name: '',
    imagen: '',
    nit: '',
    id: 0
  };

  pharmacyEdit: any = {
    name: '',
    imagen: '',
    nit: '',
    id: 0
  };

  pharmacies: any = [];


  getPharmacies() {
    this.pharmacyService.getPharmacy().subscribe(data => {
      if (data.res != 'NotInfo') {
        this.pharmacies = JSON.parse(JSON.parse(JSON.stringify(data)).data);
        this.pharmacies.forEach(element => {
          const url = this.urlImage + element.imagen;
          element.imagen = url;
        });
      } else {
        this.pharmacies = [];
      }
    })
  }

  findPharmacy(id: string) {
    for (const p of this.pharmacies) {
      if (p.id === id) {
        this.pharmacyEdit = p
      }
    }
  }

  savePharmacy() {

    const url = this.pharmacy.imagen.substr(12, this.pharmacy.imagen.length);

    if (this.image !== null) {
      this.pharmacy.imagen = this.image.replace('data:image/;base64,', '');
    }

    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('name', this.pharmacy.name);
    postObject.append('imagen', this.pharmacy.imagen);
    postObject.append('nameImg', url);
    postObject.append('nit', this.pharmacy.nit);
    postObject.append('id', this.pharmacy.id);
    postObject.append('edit', 'true');

    this.image = null;

    this.pharmacyService.savePharmacy(postObject).subscribe(data => {
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
          title: 'Se eliminó satisfactoriamente'
        })
        this.getPharmacies();
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
  }

  editPharmacy() {
    let edit = false;
    let url = '';

    if (this.image !== null) {
      url = this.imgOld.substr(12, this.imgOld.length);
      this.pharmacyEdit.imagen = this.image.replace('data:image/;base64,', '');
      edit = true;
    } else {
      url = this.pharmacyEdit.imagen.substr(61, this.pharmacyEdit.imagen.length);
      const array = this.pharmacyEdit.imagen.split('/');
      this.pharmacyEdit.imagen = array[4] + '/' + array[5] + '/' + array[6] + '/' + array[7];
    }
    const postObject = new FormData();

    postObject.append('action', 'update');
    postObject.append('name', this.pharmacyEdit.name);
    postObject.append('imagen', this.pharmacyEdit.imagen);
    postObject.append('nameImg', url);
    postObject.append('nit', this.pharmacyEdit.nit);
    postObject.append('id', this.pharmacyEdit.id);
    postObject.append('edit', edit.toString());

    this.pharmacyService.editPharmacy(postObject).subscribe(data => {
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
        this.getPharmacies();
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
  }

  deletePharmacy() {
    const nameImg = (this.pharmacyEdit.imagen).split('/');

    this.pharmacyService.deletePharmacy(this.pharmacyEdit.id, nameImg[6]).subscribe(data => {
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
          title: 'Se eliminó satisfactoriamente'
        })
        this.getPharmacies();
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
  }

  clear() {
    this.pharmacy = {
      name: [null],
      imagen: [null],
      nit: [null],
    }
  }
}
