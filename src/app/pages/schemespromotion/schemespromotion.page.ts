import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
@Component({
  selector: 'app-schemespromotion',
  templateUrl: './schemespromotion.page.html',
  styleUrls: ['./schemespromotion.page.scss'],
})
export class SchemespromotionPage implements OnInit {
  public schemesJson: any = [];
  public noRecord: boolean = false;
  public showData: boolean = false;
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private loadService: LoaderService,
  ) { }

  ngOnInit() {
    const userType = localStorage.getItem('usertype');
    this.getSchemesDataFn(userType);
  }

  getSchemesDataFn(userType) {
    this.loadService.present('Loading...', 'circular');
    const url = `${this.config.configURL}api/Values/Getschemes`;
    const body = {
      "Usertype": userType
    };
    this.http.post(url, body).subscribe(data => {
      console.log(data);
      const response: any = data;
      if (response.result === 'Success') {
        this.schemesJson = response.data;
        this.showData = true;
        this.loadService.dismiss();
      } else if (response.result === 'No Record') {
        this.noRecord = true;
      }
      // if (response.data.length === 0) {
      //   this.noRecord = true;
      // } else {
      //   this.noRecord = false;
      // }
      this.loadService.dismiss();
    }, error => {
      this.loadService.dismiss();
      console.log(error);
    });

  }


}
