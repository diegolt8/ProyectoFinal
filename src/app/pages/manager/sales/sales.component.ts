import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { environment } from './../../../../environments/environment';
import { ProviderService } from 'src/app/services/provider.service';
import { shelfService } from 'src/app/services/shelf.service';
import { TypeProductService } from 'src/app/services/typeproduct.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import { StatusService } from 'src/app/services/status.service';
import { StorageService } from 'src/app/services/storage.service';
import { element } from 'protractor';

const { MICROSERVICE_URL } = environment;

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(private providerService: ProviderService,
    private shelfService: shelfService,
    private typeProductService: TypeProductService,
    private laboratoryService: LaboratoryService,
    private statusService: StatusService,
    private inventoryService: InventoryService,
    private storageService: StorageService) { }


  urlImage = `${MICROSERVICE_URL}/ProyectoFinalBackend/`;

  products: any = [];
  listproducts: any = [];
  providers: any = [];
  shelfs: any = [];
  typeproducts: any = [];
  laboratories: any = [];
  status: any = [];

  imgOld = '';

  image: any = null;

  ngOnInit(): void {
    this.getInventories();
    this.getProviders();
    this.getShelfs();
    this.getTypeProducts();
    this.getLaboratories();
    this.getStatus();
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

  add = true;

  addList(inventory) {
    this.listproducts.push(inventory);
  }

  async getInventories() {
    const invent = await this.inventoryService.getInventory().toPromise();
    if (invent.res !== 'NotInfo') {
      this.products = JSON.parse(invent.data);
      this.products.forEach(inventory => {
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
      this.products = [];
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

}
