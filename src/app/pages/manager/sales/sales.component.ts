import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { environment } from './../../../../environments/environment';
import { ProviderService } from 'src/app/services/provider.service';
import { shelfService } from 'src/app/services/shelf.service';
import { TypeProductService } from 'src/app/services/typeproduct.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import { StatusService } from 'src/app/services/status.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { SaleService } from 'src/app/services/sales.service';

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
    private userService: UserService,
    private saleService: SaleService) { }


  urlImage = `${MICROSERVICE_URL}/ProyectoFinalBackend/`;

  products: any = [];
  listproducts: any = [];
  providers: any = [];
  shelfs: any = [];
  typeproducts: any = [];
  laboratories: any = [];
  status: any = [];
  employees: any = [];
  clients: any = [];

  imgOld = '';

  total = 0;

  image: any = null;

  ngOnInit(): void {
    this.getInventories();
    this.getProviders();
    this.getShelfs();
    this.getTypeProducts();
    this.getLaboratories();
    this.getStatus();
    this.getEmployee();
    this.getclient();
  }

  dateNow = new Date();
  dd = String(this.dateNow.getDate()).padStart(2, '0');
  mm = String(this.dateNow.getMonth() + 1).padStart(2, '0');
  yyyy = this.dateNow.getFullYear();

  today = this.yyyy + '-' + this.mm + '-' + this.dd;

  sale: any = {
    saledate: this.today,
    saletotal: 0,
    client_id: 0,
    employee_id: 0,
    id: 0
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

  totalSale() {
    this.listproducts.forEach(element => {
      this.sale.saletotal = this.sale.saletotal + (element.quantity * element.price);
    });
  }

  addList(inventory) {
    this.total = 0;
    let add = false;
    this.listproducts.forEach(element => {
      if (element.id === inventory.id) {
        add = true;
        if (inventory.quantity !== element.quantity) {
          element.quantity = inventory.quantity;
        }
      }
    });
    if (!add) {
      this.listproducts.push(inventory);
    }
    this.totalSale();
  }

  getEmployee() {
    this.userService.getEmployee().subscribe(data => {
      this.employees = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  getclient() {
    this.userService.getClient().subscribe(data => {
      this.clients = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
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


  saveSale() {

    this.clients.forEach(element => {
      if (element.name === this.sale.client_id) {
        this.sale.client_id = element.id;
      }
    });

    this.employees.forEach(element => {
      if (element.name === this.sale.employee_id) {
        this.sale.employee_id = element.id;
      }
    });

    const dateNow = new Date();
    const dd = String(dateNow.getDate()).padStart(2, '0');
    const mm = String(dateNow.getMonth() + 1).padStart(2, '0');
    const yyyy = dateNow.getFullYear();

    const today = yyyy + '-' + mm + '-' + dd;

    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('saledate', today);
    postObject.append('saletotal', this.sale.saletotal);
    postObject.append('client_id', this.sale.client_id);
    postObject.append('employee_id', this.sale.employee_id);
    postObject.append('id', '0');

    this.saleService.saveSale(postObject).subscribe(data => {
      this.listproducts.forEach(async element => {
        await this.inventoryService.updateQuantity(element.id, element.quantity);
      })
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

  clear() {
    this.sale = {
      saledate: [null],
      saletotal: 0,
      client_id: 1,
      employee_id: 1
    }
  }

}
