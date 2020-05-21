import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';

@Injectable({
    providedIn: 'root'
})

export class PharmacyService {
    pharmacy: any = {};

    url = 'http://localhost/ProyectoFinalBackend/Controller/Pharmacies/CtlPharmacy.php';
    constructor(private http: HttpClient, private helperService: HelperService) { }

    getPharmacy() {
        return this.http.get<any>(this.url + '?action=list&token=' +
            this.helperService.generarToken());
    }

    savePharmacy(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    editPharmacy(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    deletePharmacy(id: any, img:any) {
        return this.http.delete(this.url + '?action=delete&nameImg=' + img + '&id=' + id + '&token=' +
            this.helperService.generarToken());
    }

}