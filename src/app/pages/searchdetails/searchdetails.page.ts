import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { LogService } from 'src/app/services/log/log.service';

@Component({
  selector: 'app-searchdetails',
  templateUrl: './searchdetails.page.html',
  styleUrls: ['./searchdetails.page.scss'],
})
export class SearchdetailsPage implements OnInit {

  public oeno;
  public suitsTheseModelArr: any = [];
  public imgRecord: boolean = true;
  public videoPdfRecord: boolean = false;
  public noRecord: boolean = false;
  public showData: boolean = false;
  type: string = 'productSpecs';
  public detailsJson: any = [];
  public productSpecs: any = [];
  public gatesPartNo;
  public partDesc;
  public imgArray: any = [];
  public pdfArray: any = [];
  public videoArray: any = [];
  public queryString: any = [];
  public mode: string;
  // public mrp;


  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private loadService: LoaderService,
    public config: ConfigService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private log: LogService
  ) { }

  ngOnInit() {
    this.oeno = this.activatedRoute.snapshot.paramMap.get('oeno');
    this.getMoreDetailsDataFn(this.oeno);
  }


  getMoreDetailsDataFn(oeNumber) {
    this.loadService.present('Please Wait ...', 'circular');
    const url = this.config.configURL + `api/Values/OEdetailsmore`;

    const bodyValues = {
      'OEnumber': oeNumber
    };

    this.http.post(url, bodyValues).subscribe(result => {
      console.log(result);
      const response: any = result;
      if (response.result === 'Success') {
        console.log(response.data);
        // console.log(response.data.result);

        if (response.img.length !== 0) {

          //  this.gatesPartNo = response.img[0].partnumber;

          this.createImgArrFn(response.img[0]);
          this.createVideoPdfArrFn(response.img[0], 'video');
          this.createVideoPdfArrFn(response.img[0], 'pdf');

          console.log(response.img[0].URLtype1);

          if (
            (response.img[0].URL1 === '' || response.img[0].URL1 === null) &&
            (response.img[0].URL2 === '' || response.img[0].URL2 === null) &&
            (response.img[0].URL3 === '' || response.img[0].URL3 === null) &&
            (response.img[0].URL4 === '' || response.img[0].URL4 === null) ) {
            this.videoPdfRecord = true;
          } else {
            this.videoPdfRecord = false;
          }

          console.log(this.videoPdfRecord);


          this.imgRecord = true;
        } else {
          this.videoPdfRecord = true;
          this.imgRecord = false;
        }

        this.detailsJson = response;
        this.suitsTheseModelArr = response.data;

        // this.mrp = this.suitsTheseModelArr[0].modelList[0].produSpec[0].MRP;


        if (response.product[0] !== 0) {
          this.productSpecs = response.product[0];
          console.log(this.productSpecs);
        }


        console.log(this.suitsTheseModelArr[0].modelList[0].model);
        console.log(this.suitsTheseModelArr[0].modelList[0].produSpec[0].Segment);
        console.log(this.productSpecs.Article);

        const segment = this.suitsTheseModelArr[0].modelList[0].produSpec[0].Segment;
        const model = this.suitsTheseModelArr[0].modelList[0].model;
        const partno = this.productSpecs.Article;

        this.log.postLogDetails(segment, model, partno);

        this.showData = true;
        this.loadService.dismiss();
      } else if (response.result === 'No Record') {
        this.alertFn(`No Record Found for this Part Number  ${oeNumber}`);
      }
      this.loadService.dismiss();
    }, error => {
      this.loadService.dismiss();
      console.log(error);
    });
  }

  createImgArrFn(arr) {
    const tempArr: Array<string> = [];

    if (arr.ProductthumbURL1 !== '' && arr.ProductthumbURL1 !== undefined) {
      tempArr.push(arr.ProductthumbURL1);
    }
    if (arr.ProductthumbURL2 !== '') {
      tempArr.push(arr.ProductthumbURL2);
    }

    if (arr.ProductthumbURL3 !== '') {
      tempArr.push(arr.ProductthumbURL3);
    }

    if (arr.ProductthumbURL4 !== '') {
      tempArr.push(arr.ProductthumbURL4);
    }

    if (arr.ProductthumbURL5 !== '') {
      tempArr.push(arr.ProductthumbURL5);
    }

    if (arr.ProductthumbURL6 !== '') {
      tempArr.push(arr.ProductthumbURL6);
    }

    if (arr.ProductthumbURL7 !== '') {
      tempArr.push(arr.ProductthumbURL7);
    }

    if (arr.ProductthumbURL8 !== '') {
      tempArr.push(arr.ProductthumbURL8);
    }

    if (arr.ProductthumbURL9 !== '') {
      tempArr.push(arr.ProductthumbURL8);
    }

    if (arr.ProductthumbURL10 !== '') {
      tempArr.push(arr.ProductthumbURL10);
    }

    if (arr.ProductthumbURL11 !== '') {
      tempArr.push(arr.ProductthumbURL11);
    }

    if (arr.ProductthumbURL12 !== '') {
      tempArr.push(arr.ProductthumbURL12);
    }

    if (arr.ProductthumbURL13 !== '') {
      tempArr.push(arr.ProductthumbURL13);
    }

    if (arr.ProductthumbURL14 !== '') {
      tempArr.push(arr.ProductthumbURL14);
    }

    if (arr.ProductthumbURL15 !== '') {
      tempArr.push(arr.ProductthumbURL15);
    }

    if (arr.ProductthumbURL16 !== '') {
      tempArr.push(arr.ProductthumbURL16);
    }

    if (arr.ProductthumbURL17 !== '') {
      tempArr.push(arr.ProductthumbURL17);
    }

    if (arr.ProductthumbURL18 !== '') {
      tempArr.push(arr.ProductthumbURL18);
    }

    if (arr.ProductthumbURL19 !== '') {
      tempArr.push(arr.ProductthumbURL19);
    }

    if (arr.ProductthumbURL20 !== '') {
      tempArr.push(arr.ProductthumbURL20);
    }

    this.imgArray = tempArr;
  }

  createVideoPdfArrFn(arr, mode) {
    const tempVideoPdfArr: Array<string> = [];

    if (mode === 'video') {
      if (arr.URLtype1 === 'Video') {
        tempVideoPdfArr.push(arr.URL1);
      }
      if (arr.URLtype2 === 'Video') {
        tempVideoPdfArr.push(arr.URL2);
      }
      if (arr.URLtype3 === 'Video') {
        tempVideoPdfArr.push(arr.URL3);
      }
      if (arr.URLtype4 === 'Video') {
        tempVideoPdfArr.push(arr.URL4);
      }

      this.videoArray = tempVideoPdfArr;
      console.log(this.videoArray);

    } else if (mode === 'pdf') {
      if (arr.URLtype1 === 'pdf') {
        tempVideoPdfArr.push(arr.URL1);
      }
      if (arr.URLtype2 === 'pdf') {
        tempVideoPdfArr.push(arr.URL2);
      }
      if (arr.URLtype3 === 'pdf') {
        tempVideoPdfArr.push(arr.URL3);
      }
      if (arr.URLtype4 === 'pdf') {
        tempVideoPdfArr.push(arr.URL4);
      }

      this.pdfArray = tempVideoPdfArr;
      console.log(this.pdfArray);
    }

  }


  async alertFn(msg) {
    const alert = await this.alertCtrl.create({
      header: `GATES INDIA`,
      message: msg,
      buttons: [
        {
          text: 'OKAY',
          handler: () => {
            this.navCtrl.back();
            // navigator['app'].exitApp();
          }
        }
      ]

    });

    await alert.present();
  }


}
