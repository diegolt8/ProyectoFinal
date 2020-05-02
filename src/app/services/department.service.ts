import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { ModelDepartment } from '../interfaces/Department';

@Injectable({
    providedIn: 'root'
})

export class DepartmentService {
    department: any = {};

    url = 'http://localhost/ProyectoFinalBackend/Controller/Departments/CtlDepartment.php';
    constructor(private http: HttpClient, private helperService: HelperService) { }

    getDepartment() {
        return this.http.get<ModelDepartment>(this.url + '?action=list&token=' +
            this.helperService.generarToken());
    }

    saveDepartment(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    editDepartment(postData: any) {
        postData.append('token', this.helperService.generarToken());
        return this.http.post(this.url, postData);
    }

    deleteDepartment(id: any) {
        return this.http.delete(this.url + '?action=delete&id=' + id + '&token=' +
            this.helperService.generarToken());
    }

}