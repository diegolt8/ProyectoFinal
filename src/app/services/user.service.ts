import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    user: any = {};

    url = 'http://localhost/ProyectoFinalBackend/Controller/Users/CtlUser.php';
    urlLogin = 'http://localhost/ProyectoFinalBackend/Controller/Login/Login.php'
    constructor(private http: HttpClient, private helperService: HelperService) { }

    getUser() {
        return this.http.get<any>(this.url + '?action=list&token=' +
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

    login(user: any) {
        return this.http.post(this.urlLogin, JSON.stringify(user)).toPromise();
    }
}