import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModelUsuario } from './../interfaces/User';
import { HelperService } from './helper.service';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    user: any = {};

    url = 'http://localhost/ProyectoFinalBackend/Controller/Users/CtlUser.php';
    constructor(private http: HttpClient, private helperService: HelperService) { }

    getUser() {
        return this.http.get<ModelUsuario>(this.url + '?action=list&token=' +
            this.helperService.generarToken());
    }

    saveUser(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    editUser(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    deleteUser(id: any) {
        return this.http.delete(this.url + '?action=delete&id=' + id + '&token=' +
            this.helperService.generarToken());
    }
}