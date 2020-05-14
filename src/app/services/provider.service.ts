import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModelProvider } from './../interfaces/Provider';
import { HelperService } from './helper.service';

@Injectable({
    providedIn: 'root'
})

export class ProviderService {

    url = 'http://localhost/ProyectoFinalBackend/Controller/Providers/CtlProvider.php';
    constructor(private http: HttpClient, private helperService: HelperService) { }

    getProvider() {
        return this.http.get<ModelProvider>(this.url + '?action=list&token=' + this.helperService.generarToken());
    }

    saveProvider(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    editProvider(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    deleteProvider(id: any) {
        return this.http.delete(this.url + '?action=delete&id=' + id + '&token=' +
            this.helperService.generarToken());
    }
}

