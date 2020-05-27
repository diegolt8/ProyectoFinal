import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModelCity } from './../interfaces/City';
import { HelperService } from './helper.service';

@Injectable({
    providedIn: 'root'
})

export class SaleService {
    sale: any = {};

    url = 'http://localhost/ProyectoFinalBackend/Controller/Sales/CtlSale.php';
    constructor(private http: HttpClient, private helperService: HelperService) { }

    getSale() {
        return this.http.get<any>(this.url + '?action=list&token=' +
            this.helperService.generarToken());
    }

    saveSale(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    editSale(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    deleteSale(id: any) {
        return this.http.delete(this.url + '?action=delete&id=' + id + '&token=' +
            this.helperService.generarToken());
    }
}