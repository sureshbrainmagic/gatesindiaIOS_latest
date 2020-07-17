import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-whatsnew',
  templateUrl: './whatsnew.page.html',
  styleUrls: ['./whatsnew.page.scss'],
})
export class WhatsnewPage implements OnInit {

  public whatsNewsJson;
  public showData: boolean = false;
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private loadService: LoaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getWhatsnewsFn();
  }

  getWhatsnewsFn() {
    this.loadService.present('Loading...', 'circular');
    const url = `${this.config.configURL}api/Values/Getwhatsnew`;
    this.http.get(url).subscribe(data => {
      console.log(data);
      const response: any = data;
      if (response.result === 'Success') {
        this.whatsNewsJson = response.data;
        this.showData = true;
        this.loadService.dismiss();
      }
      this.loadService.dismiss();
    }, error => {
      this.loadService.dismiss();
      console.log(error);
      // alert(error.message);
    });

  }

  goToMoreDetailsFn(obj) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        productDetailObj: JSON.stringify(obj)
      }
    };
    this.router.navigate([`moredetails/whatsnew`], navigationExtras);
  }

}
