import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private http: HttpClient,
    private config: ConfigService

    ) { }

  uploadFile(formData) {
    // return this.http.post('https://finder.gates.com/gatesproduction/api/Values/gatesImage', formData);
    // const url = `${this.config.configURL}api/Upload/PostUserImage`;
    const url = `http://Kalbrojson.brainmagicllc.com/api/Upload/PostUserImage`;
    return this.http.post(url, formData);
  }

}
