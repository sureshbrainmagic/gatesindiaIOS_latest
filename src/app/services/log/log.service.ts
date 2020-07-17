import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  postLogDetails(segment, model, partno) {

    let mobileno;
    let usertype;
    let name;

    // const mobileno = localStorage.getItem('mobileno');
    // const usertype = localStorage.getItem('usertype');
    // const name = localStorage.getItem('name');

    if (
      localStorage.getItem('mobileno') === null ||
      localStorage.getItem('mobileno') === undefined ||
      localStorage.getItem('mobileno') === ''
    ) {
      mobileno = 'NA';
    } else {
      mobileno = localStorage.getItem('mobileno');
    }

    if (
      localStorage.getItem('usertype') === null ||
      localStorage.getItem('usertype') === undefined ||
      localStorage.getItem('usertype') === ''
    ) {
      usertype = 'NA';
    } else {
      usertype = localStorage.getItem('usertype');
    }

    if (
      localStorage.getItem('name') === null ||
      localStorage.getItem('name') === undefined ||
      localStorage.getItem('name') === ''
    ) {
      name = 'NA';
    } else {
      name = localStorage.getItem('name');
    }

    console.log(mobileno);
    console.log(usertype);
    console.log(name);

    const url = `${this.config.configURL}/api/values/LogDetailNew`;
    const lsLogDetails: any = JSON.parse(localStorage.getItem('lsLogDetails'));

    console.log('lsAddress', lsLogDetails);

    const bodyValues = {
      'Segment': this.productFunc(segment),
      'Name': name,
      'VehicleModel': model,
      'partno': partno,
      'Mobileno': mobileno,
      'Usertype': usertype,
      'State': lsLogDetails.State,
      'City': lsLogDetails.City,
      'Zipcode': lsLogDetails.Zipcode,
      'Location': lsLogDetails.address,
      'Devicetype': 'IOS'
    };

    console.log(bodyValues);

    this.http.post(url, bodyValues).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });

  }

  productFunc(makeMode) {
    if (makeMode === 'Passenger Car & Light Commercial') {
      return 'Passenger Car & Light Commercial';
      // } else if (makeMode === 'Heavy Commerical') {
    } else if (makeMode === 'Heavy Commercial') {
       return 'Heavy Commercial';
      // return 'Heavy Commercial';
    } else if (makeMode === '2 Wheeler') {
      return '2 Wheeler';
    }  else if (makeMode === 'Passenger Car') {
      return 'Passenger Car & Light Commercial';
    } else {
      return makeMode;
    }
  }

}
