import { Component, OnInit } from '@angular/core';
import { TypeProductService } from 'src/app/services/typeproduct.service';

@Component({
  selector: 'app-typeproduct',
  templateUrl: './typeproduct.component.html',
  styleUrls: ['./typeproduct.component.css']
})
export class TypeproductComponent implements OnInit {

  constructor(private typeProductService: TypeProductService) { 
    this.getTypeProducts();
  }

  ngOnInit(): void {
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
        this.getTypeProducts();
      } else if (res.code === '2') {
        console.log('No se pudo eliminar');
      }
    });
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
        this.getTypeProducts();
      } else if (res.code === '2') {
        console.log('No se pudo actualizar');
      }
    });
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
        console.log('se pudo registrar');
        this.getTypeProducts();
      } else if (res.code === '2') {
        console.log('no se pudo registrar');
      }
    });
  }

}
