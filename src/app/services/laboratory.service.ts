import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { ModelLaboratory } from '../interfaces/Laboratory';

@Injectable({
    providedIn: 'root'
})

export class LaboratoryService {
    laboratory: any = {};

    url = 'http://localhost/ProyectoFinalBackend/Controller/laboratories/CtlLaboratory.php';
    constructor(private http: HttpClient, private helperService: HelperService) { }

    getLaboratory() {
        return this.http.get<any>(this.url + '?action=list&token=' +
            this.helperService.generarToken());
    }

    saveLaboratory(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    editLaboratory(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    deleteLaboratory(id: any) {
        return this.http.delete(this.url + '?action=delete&id=' + id + '&token=' +
            this.helperService.generarToken());
    }

}