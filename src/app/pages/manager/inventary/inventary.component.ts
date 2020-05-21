import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { shelfService } from 'src/app/services/shelf.service';
import { TypeProductService } from 'src/app/services/typeproduct.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import { StatusService } from 'src/app/services/status.service';
import { InventoryService } from 'src/app/services/inventory.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

const { MICROSERVICE_URL } = environment;

@Component({
  selector: 'app-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./inventary.component.css']
})
export class InventaryComponent implements OnInit {

  @ViewChild('modalSave', { static: false }) private closeModal: ElementRef;

  constructor(private providerService: ProviderService,
    private shelfService: shelfService,
    private typeProductService: TypeProductService,
    private laboratoryService: LaboratoryService,
    private statusService: StatusService,
    private inventoryService: InventoryService,
    private storageService: StorageService,
    private router: Router) {
    this.getInventories();
    this.getProviders();
    this.getShelfs();
    this.getTypeProducts();
    this.getLaboratories();
    this.getStatus();
  }

  urlImage = `${MICROSERVICE_URL}/ProyectoFinalBackend/`;

  user: any;

  ngOnInit(): void {
    this.user = this.storageService.getCurrentSession();
    if (this.user != null) {
      this.getInventories();
    } else {
      this.router.navigate(['home']);
    }
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
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


  inventory: any = {
    milligrams: 0,
    name: '',
    description: '',
    admissiondate: '',
    expirationdate: '',
    lotecode: '',
    quantity: 0,
    price: '',
    provider_id: 0,
    shelf_id: 0,
    typeproduct_id: 0,
    laboratory_id: 0,
    status_id: 0,
    imagen: '',
    id: 0
  }

  inventoryEdit: any = {
    milligrams: 0,
    name: '',
    description: '',
    admissiondate: '',
    expirationdate: '',
    lotecode: '',
    quantity: 0,
    price: '',
    provider_id: 1,
    shelf_id: 1,
    typeproduct_id: 1,
    laboratory_id: 1,
    status_id: 1,
    imagen: '',
    id: 0
  }

  image: any = null;

  providers: any = [];
  shelfs: any = [];
  typeproducts: any = [];
  laboratories: any = [];
  status: any = [];
  inventories: any = [];

  async getInventories() {
    const invent = await this.inventoryService.getInventory().toPromise();
    if (invent.res !== 'NotInfo') {
      this.inventories = JSON.parse(invent.data);
      this.inventories.forEach(inventory => {
        const url = this.urlImage + inventory.imagen;
        inventory.imagen = url;
        this.providers.forEach(provider => {
          if (inventory.provider_id === provider.id) {
            inventory.provider_id = provider.name;
          }
          this.shelfs.forEach(shelf => {
            if (inventory.shelf_id === shelf.id) {
              inventory.shelf_id = shelf.name;
            }
            this.laboratories.forEach(laboratory => {
              if (inventory.laboratory_id === laboratory.id) {
                inventory.laboratory_id = laboratory.name;
              }
              this.status.forEach(status => {
                if (inventory.status_id === status.id) {
                  inventory.status_id = status.name;
                }
                this.typeproducts.forEach(type => {
                  if (inventory.typeproduct_id === type.id) {
                    inventory.typeproduct_id = type.name;
                  }
                })
              });
            });
          });
        });
      });
    } else {
      this.inventories = [];
    }

  }

  findProduct(id: string) {
    for (const i of this.inventories) {
      if (i.id === id) {
        this.inventoryEdit = i;
      }
    }
  }

  async getProviders() {
    const provider = await this.providerService.getProvider().toPromise();
    this.providers = JSON.parse(provider.data);
    this.providerService.getProvider().subscribe(data => {
      this.providers = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  async getShelfs() {
    const shelf = await this.shelfService.getShelf().toPromise();
    this.shelfs = JSON.parse(shelf.data);
    this.shelfService.getShelf().subscribe(data => {
      this.shelfs = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  async getTypeProducts() {
    const type = await this.typeProductService.getTypeProduct().toPromise();
    this.typeproducts = JSON.parse(type.data);
    this.typeProductService.getTypeProduct().subscribe(data => {
      this.typeproducts = JSON.parse(JSON.parse(JSON.stringify(data)).data)
    });
  }

  async getLaboratories() {
    const laboratory = await this.laboratoryService.getLaboratory().toPromise();
    this.laboratories = JSON.parse(laboratory.data);
    this.laboratoryService.getLaboratory().subscribe(data => {
      this.laboratories = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  async getStatus() {
    const status = await this.statusService.getStatus().toPromise();
    this.status = JSON.parse(status.data);
    this.statusService.getStatus().subscribe(data => {
      this.status = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }


  saveInventory() {

    const url = this.inventory.imagen.substr(12, this.inventory.imagen.length);

    if (this.image !== null) {
      this.inventory.imagen = this.image.replace('data:image/;base64,', '');
    }

    this.providers.forEach(element => {
      if (element.name === this.inventory.provider_id) {
        this.inventory.provider_id = element.id;
      }
    });
    this.shelfs.forEach(element => {
      if (element.name === this.inventory.shelf_id) {
        this.inventory.shelf_id = element.id;
      }
    });
    this.typeproducts.forEach(element => {
      if (element.name === this.inventory.typeproduct_id) {
        this.inventory.typeproduct_id = element.id;
      }
    });
    this.laboratories.forEach(element => {
      if (element.name === this.inventory.laboratory_id) {
        this.inventory.laboratory_id = element.id;
      }
    });
    this.status.forEach(element => {
      if (element.name === this.inventory.status_id) {
        this.inventory.status_id = element.id;
      }
    });


    const dateNow = new Date();
    const dd = String(dateNow.getDate()).padStart(2, '0');
    const mm = String(dateNow.getMonth() + 1).padStart(2, '0');
    const yyyy = dateNow.getFullYear();

    const today = yyyy + '-' + mm + '-' + dd;

    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('milligrams', this.inventory.milligrams);
    postObject.append('name', this.inventory.name);
    postObject.append('description', this.inventory.description);
    postObject.append('admissiondate', today);
    postObject.append('expirationdate', this.inventory.expirationdate);
    postObject.append('lotecode', this.inventory.lotecode);
    postObject.append('quantity', this.inventory.quantity);
    postObject.append('price', this.inventory.price);
    postObject.append('provider_id', this.inventory.provider_id);
    postObject.append('shelf_id', this.inventory.shelf_id);
    postObject.append('typeproduct_id', this.inventory.typeproduct_id);
    postObject.append('laboratory_id', this.inventory.laboratory_id);
    postObject.append('status_id', this.inventory.status_id);
    postObject.append('imagen', this.inventory.imagen);
    postObject.append('nameImg', url);
    postObject.append('id', this.inventory.id);
    postObject.append('edit', 'true');

    this.image = null;

    this.inventoryService.saveInventory(postObject).subscribe(data => {
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
        this.getInventories();
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

  editInventory() {

    let edit = false;
    let url = '';

    if (this.image !== null) {
      url = this.imgOld.substr(12, this.imgOld.length);
      this.inventoryEdit.imagen = this.image.replace('data:image/;base64,', '');
      edit = true;
    } else {
      url = this.inventoryEdit.imagen.substr(61, this.inventoryEdit.imagen.length);
      const array = this.inventoryEdit.imagen.split('/');
      this.inventoryEdit.imagen = array[4] + '/' + array[5] + '/' + array[6] + '/' + array[7];
    }

    this.providers.forEach(element => {
      if (element.name === this.inventoryEdit.provider_id) {
        this.inventoryEdit.provider_id = element.id;
      }
    });
    this.typeproducts.forEach(element => {
      if (element.name === this.inventoryEdit.typeproduct_id) {
        this.inventoryEdit.typeproduct_id = element.id;
      }
    });
    this.shelfs.forEach(element => {
      if (element.name === this.inventoryEdit.shelf_id) {
        this.inventoryEdit.shelf_id = element.id;
      }
    });
    this.laboratories.forEach(element => {
      if (element.name === this.inventoryEdit.laboratory_id) {
        this.inventoryEdit.laboratory_id = element.id;
      }
    });
    this.status.forEach(element => {
      if (element.name === this.inventoryEdit.status_id) {
        this.inventoryEdit.status_id = element.id;
      }
    });
    const postObject = new FormData();

    postObject.append('action', 'update');
    postObject.append('milligrams', this.inventoryEdit.milligrams);
    postObject.append('name', this.inventoryEdit.name);
    postObject.append('description', this.inventoryEdit.description);
    postObject.append('admissiondate', this.inventoryEdit.admissiondate);
    postObject.append('expirationdate', this.inventoryEdit.expirationdate);
    postObject.append('lotecode', this.inventoryEdit.lotecode);
    postObject.append('quantity', this.inventoryEdit.quantity);
    postObject.append('price', this.inventoryEdit.price);
    postObject.append('provider_id', this.inventoryEdit.provider_id);
    postObject.append('shelf_id', this.inventoryEdit.shelf_id);
    postObject.append('typeproduct_id', this.inventoryEdit.typeproduct_id);
    postObject.append('laboratory_id', this.inventoryEdit.laboratory_id);
    postObject.append('status_id', this.inventoryEdit.status_id);
    postObject.append('imagen', this.inventoryEdit.imagen);
    postObject.append('nameImg', url);
    postObject.append('id', this.inventoryEdit.id);
    postObject.append('edit', edit.toString());


    this.inventoryService.editInventory(postObject).subscribe(data => {
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
        this.getInventories();
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

  deleteInventory() {

    const nameImg = (this.inventoryEdit.imagen).split('/');

    this.inventoryService.deleteInventory(this.inventoryEdit.id, nameImg[6]).subscribe(data => {
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
        this.getInventories();
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
    this.clear();
  }

  clear() {
    this.inventory = {
      milligrams: 0,
      name: [null],
      description: [null],
      admissiondate: [null],
      expirationdate: [null],
      lotecode: [null],
      quantity: 0,
      price: [null],
      provider_id: 1,
      shelf_id: 1,
      typeproduct_id: 1,
      laboratory_id: 1,
      status_id: 1,
      imagen: [null],
    };
  }
}
