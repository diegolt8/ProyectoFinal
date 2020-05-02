import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { ModelStatus } from '../interfaces/Status';

@Injectable({
    providedIn: 'root'
})

export class StatusService {
    status: any = {};

    url = 'http://localhost/ProyectoFinalBackend/Controller/Status/CtlStatus.php';
    constructor(private http: HttpClient, private helperService: HelperService) { }

    getStatus() {
        return this.http.get<ModelStatus>(this.url + '?action=list&token=' +
            this.helperService.generarToken());
    }

    saveStatus(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    editStatus(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    deleteStatus(id: any) {
        return this.http.delete(this.url + '?action=delete&id=' + id + '&token=' +
            this.helperService.generarToken());
    }

}