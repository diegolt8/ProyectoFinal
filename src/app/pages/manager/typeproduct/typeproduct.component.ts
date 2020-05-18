import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TypeProductService } from 'src/app/services/typeproduct.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-typeproduct',
  templateUrl: './typeproduct.component.html',
  styleUrls: ['./typeproduct.component.css']
})
export class TypeproductComponent implements OnInit {

  @ViewChild('modalSave', { static: false }) private closeModal: ElementRef;

  constructor(private typeProductService: TypeProductService,
    private storageService: StorageService,
    private router: Router) { }

  FilterPipe: any = '';

  actualPage = 1;

  user: any;
  ngOnInit(): void {
    this.user = this.storageService.getCurrentSession();
    if (this.user != null) {
      this.getTypeProducts();
    } else {
      this.router.navigate(['home']);
    }
  }

  typeProduct: any = {
    name: '',
    description: '',
    id: 0
  }

  typeProductEdit: any = {
    name: '',
    description: '',
    id: 0
  }

  typeProducts: any = [];

  getTypeProducts() {
    this.typeProductService.getTypeProduct().subscribe(data => {
      this.typeProducts = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  findTypeProduct(id: string) {
    for (const typeProduct of this.typeProducts) {
      if (typeProduct.id === id) {
        this.typeProductEdit = typeProduct;
      }
    }
  }

  deleteTypeProduct() {
    this.typeProductService.deleteTypeProduct(this.typeProductEdit.id).subscribe(data => {
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
        this.getTypeProducts();
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

  editTypeProduct() {
    this.typeProductEdit = {
      action: 'update',
      ...this.typeProductEdit,
    };

    const postObject = new FormData();

    postObject.append('action', this.typeProductEdit.action);
    postObject.append('name', this.typeProductEdit.name);
    postObject.append('description', this.typeProductEdit.description);
    postObject.append('id', this.typeProductEdit.id);

    this.typeProductService.editTypeProduct(postObject).subscribe(data => {
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
        this.getTypeProducts();
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

  saveTypeProduct() {
    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('name', this.typeProduct.name);
    postObject.append('description', this.typeProduct.description);
    postObject.append('id', this.typeProduct.id);

    console.log(this.typeProduct);

    this.typeProductService.saveTypeProduct(postObject).subscribe(data => {
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
        this.getTypeProducts();
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

}
