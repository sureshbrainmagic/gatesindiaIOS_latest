import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listotherlinks',
  templateUrl: './listotherlinks.page.html',
  styleUrls: ['./listotherlinks.page.scss'],
})
export class ListotherlinksPage implements OnInit {

  public noRecord: boolean = false;
  public otherLinksJson: any = [];
  public productInfoJson: any = [];
  public showData: boolean = false;
  public pagemode: string;
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private loadService: LoaderService,
    private iab: InAppBrowser,
    private querystring: ActivatedRoute
  ) { }

  ngOnInit() {
    this.pagemode = this.querystring.snapshot.paramMap.get('pagemode');
    if (this.pagemode === 'Other Links') {
      this.getOtherLinksDataFn();
    } else if (this.pagemode === 'Product Info') {
      this.getProductInfoDataFn();
    }

  }

  openExternalURL(url) {
    this.iab.create(url, '_system');
  }

  getOtherLinksDataFn() {
    this.loadService.present('Loading...', 'circular');
    const url = `${this.config.configURL}api/Values/Otherlinks`;
    this.http.get(url).subscribe(data => {
      console.log(data);
      const response: any = data;
      if (response.result === 'Success') {
        this.otherLinksJson = response.data;
        this.showData = true;
        this.loadService.dismiss();
      } else {
        this.noRecord = true;
      }
      this.loadService.dismiss();
    }, error => {
      this.loadService.dismiss();
      console.log(error);
    });

  }


  getProductInfoDataFn() {
    this.loadService.present('Loading...', 'circular');
    const url = `${this.config.configURL}api/Values/OtherlinkPDF`;
    this.http.get(url).subscribe(data => {
      console.log(data);
      const response: any = data;
      if (response.result === 'Success') {
        this.productInfoJson = response.data;
        this.showData = true;
        this.loadService.dismiss();
      } else {
        this.noRecord = true;
      }
      this.loadService.dismiss();
    }, error => {
      this.loadService.dismiss();
      console.log(error);
    });

  }


}
