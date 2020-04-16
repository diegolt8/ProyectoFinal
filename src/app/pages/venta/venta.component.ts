import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewCarrito() {
    this.router.navigate(['carrito']);
  }
}
