import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { shelfService } from 'src/app/services/shelf.service';
import { TypeProductService } from 'src/app/services/typeproduct.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import { StatusService } from 'src/app/services/status.service';
import { InventoryService } from 'src/app/services/inventory.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

const { MICROSERVICE_URL } = environment;

@Component({
  selector: 'app-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./inventary.component.css']
})
export class InventaryComponent implements OnInit {

  constructor(private providerService: ProviderService,
    private shelfService: shelfService,
    private typeProductService: TypeProductService,
    private laboratoryService: LaboratoryService,
    private statusService: StatusService,
    private inventoryService: InventoryService) {}

    urlImage = `${MICROSERVICE_URL}/ProyectoFinalBackend/`;

  ngOnInit(): void {
    this.getStatus();
    this.getTypeProducts();
    this.getShelfs();
    this.getProviders();
    this.getInventories();
    this.getLaboratories();
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
    this.inventories = JSON.parse(invent.data);
    this.inventoryService.getInventory().subscribe(data => {
      this.inventories = JSON.parse(JSON.parse(JSON.stringify(data)).data);
      this.inventories.forEach(inventory => {
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
    });
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

  getShelfs() {
    this.shelfService.getShelf().subscribe(data => {
      this.shelfs = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  getTypeProducts() {
    this.typeProductService.getTypeProduct().subscribe(data => {
      this.typeproducts = JSON.parse(JSON.parse(JSON.stringify(data)).data)
    });
  }

  getLaboratories() {
    this.laboratoryService.getLaboratory().subscribe(data => {
      this.laboratories = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  getStatus() {
    this.statusService.getStatus().subscribe(data => {
      this.status = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }


  saveInventory() {
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
    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('milligrams', this.inventory.milligrams);
    postObject.append('name', this.inventory.name);
    postObject.append('description', this.inventory.description);
    postObject.append('admissiondate', this.inventory.admissiondate);
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
    postObject.append('id', this.inventory.id);


    this.inventoryService.saveInventory(postObject).subscribe(data => {
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
        this.getInventories();
      } else if (res.code === '2') {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops! no se pudo registrar',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (res.code === '3') {
        console.log(data);
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

  editInventory() {
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

    postObject.append('action', 'save');
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
    postObject.append('id', this.inventoryEdit.id);

    console.log(postObject);

    this.inventoryService.editInventory(postObject).subscribe(data => {
      let res: any;
      res = data;
      if (res.code === '1') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se editó satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.getInventories();
      } else if (res.code === '2') {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops! no se pudo editar',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (res.code === '3') {
        console.log(data);
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

  deleteInventory() {
    this.inventoryService.deleteInventory(this.inventoryEdit.id).subscribe(data => {
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
        this.getInventories();
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
}
