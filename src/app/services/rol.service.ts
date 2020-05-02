import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { ModelRol } from '../interfaces/Rol';

@Injectable({
    providedIn: 'root'
})

export class RolService {
    rol: any = {};

    url = 'http://localhost/ProyectoFinalBackend/Controller/Roles/CtlRol.php';
    constructor(private http: HttpClient, private helperService: HelperService) { }

    getRol() {
        return this.http.get<ModelRol>(this.url + '?action=list&token=' +
            this.helperService.generarToken());
    }

    saveRol(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    editRol(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    deleteRol(id: any) {
        return this.http.delete(this.url + '?action=delete&id=' + id + '&token=' +
            this.helperService.generarToken());
    }

}