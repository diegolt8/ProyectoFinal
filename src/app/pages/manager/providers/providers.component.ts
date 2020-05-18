import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { ProviderService } from 'src/app/services/provider.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  @ViewChild('modalSave', { static: false }) private closeModal: ElementRef;

  constructor(private cityService: CityService,
    private providerService: ProviderService,
    private storageService: StorageService,
    private router: Router
  ) { this.getCitys(); }


  user: any;

  ngOnInit(): void {
    this.user = this.storageService.getCurrentSession();
    if (this.user != null) {
      this.getProviders();
      this.getCitys();
    } else {
      this.router.navigate(['home']);
    }
  }

  FilterPipe: any = '';

  actualPage = 1;

  provider: any = {
    name: '',
    nit: '',
    address: '',
    city_id: 1,
    id: 0
  }

  providerEdit: any = {
    name: '',
    nit: '',
    address: '',
    city_id: 1,
    id: 0
  }


  cities: any = [];

  providers: any = [];


  getCitys() {
    this.cityService.getCity().subscribe(data => {
      this.cities = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  getProviders() {
    this.providerService.getProvider().subscribe(data => {
      this.providers = JSON.parse(JSON.parse(JSON.stringify(data)).data);
      this.providers.forEach(provider => {
        this.cities.forEach(city => {
          if (provider.city_id === city.id) {
            provider.city_id = city.name;
          }
        });;
      });
    });
  }

  findProvider(id: string) {
    for (const p of this.providers) {
      if (p.id === id) {
        this.providerEdit = p;
      }
    }
  }

  saveProvider() {
    this.cities.forEach(element => {
      if (element.name === this.provider.city_id) {
        this.provider.city_id = element.id;
      }
    });
    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('name', this.provider.name);
    postObject.append('nit', this.provider.nit);
    postObject.append('address', this.provider.address);
    postObject.append('city_id', this.provider.city_id);
    postObject.append('id', this.provider.id);

    this.providerService.saveProvider(postObject).subscribe(data => {
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
        this.getProviders();
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

  editProvider() {
    this.cities.forEach(element => {
      if (element.name === this.providerEdit.city_id) {
        this.providerEdit.city_id = element.id;
      }
    });
    const postObject = new FormData();
    postObject.append('action', 'update');
    postObject.append('name', this.providerEdit.name);
    postObject.append('nit', this.providerEdit.nit);
    postObject.append('address', this.providerEdit.address);
    postObject.append('city_id', this.providerEdit.city_id);
    postObject.append('id', this.providerEdit.id);

    this.providerService.editProvider(postObject).subscribe(data => {
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
        this.getProviders();
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

  deleteProvider() {
    this.providerService.deleteProvider(this.providerEdit.id).subscribe(data => {
      let res: any;
      res = data;
      console.log(data);
      if (res.code === '1') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se eliminó satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.getProviders();
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
}
