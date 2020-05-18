import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { ModelStatus} from '../interfaces/Status';

@Injectable({
    providedIn: 'root'
})

export class TypeProductService {
    department: any = {};

    url = 'http://localhost/ProyectoFinalBackend/Controller/TypeProducts/CtlTypeProduct.php';
    constructor(private http: HttpClient, private helperService: HelperService) { }

    getTypeProduct() {
        return this.http.get<any>(this.url + '?action=list&token=' +
            this.helperService.generarToken());
    }

    saveTypeProduct(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    editTypeProduct(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    deleteTypeProduct(id: any) {
        return this.http.delete(this.url + '?action=delete&id=' + id + '&token=' +
            this.helperService.generarToken());
    }

}