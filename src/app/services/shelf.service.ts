import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { ModelShelf } from '../interfaces/Shelf';

@Injectable({
    providedIn: 'root'
})

export class shelfService {
    shelf: any = {};

    url = 'http://localhost/ProyectoFinalBackend/Controller/Shelfs/CtlShelf.php';
    constructor(private http: HttpClient, private helperService: HelperService) { }

    getShelf() {
        return this.http.get<ModelShelf>(this.url + '?action=list&token=' +
            this.helperService.generarToken());
    }

    saveShelf(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    editShelf(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    deleteShelf(id: any) {
        return this.http.delete(this.url + '?action=delete&id=' + id + '&token=' +
            this.helperService.generarToken());
    }

}