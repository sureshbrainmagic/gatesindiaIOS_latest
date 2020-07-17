import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { LogService } from 'src/app/services/log/log.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.page.html',
  styleUrls: ['./productdetails.page.scss'],
})
export class ProductdetailsPage implements OnInit {

  public segment: string;
  public make: string;
  public engineCodeObj;
  public engineSpecsObj;
  public productDetailsJson = [];
  public noRecord: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private loadService: LoaderService,
    public config: ConfigService,
    private router: Router,
    private log: LogService
  ) { }

  ngOnInit() {
    this.segment = this.activatedRoute.snapshot.paramMap.get('segment');
    this.make = this.activatedRoute.snapshot.paramMap.get('make');
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      if (params && params.engineCodeObj) {
        console.log(JSON.parse(params.engineCodeObj));
        this.engineCodeObj = JSON.parse(params.engineCodeObj);
      }
      if (params && params.engineSpecsObj) {
        console.log(JSON.parse(params.engineSpecsObj));
        this.engineSpecsObj = JSON.parse(params.engineSpecsObj);

      }
      this.getProductDetailsFn(this.segment, this.make, this.engineCodeObj, this.engineSpecsObj);
    });

  }

  gotoMoreDetails(obj) {
    const tempObj = {
      "Segment": this.config.productFunc(this.segment),
      "Make": this.make,
      "Model": this.engineCodeObj.Model,
      "Modelcode": this.engineCodeObj.Modelcode,
      "Enginecode": this.engineCodeObj.Enginecode,
      "YearFrom": this.engineCodeObj.YearFrom,
      "YearTill": this.engineCodeObj.YearTill,
      "CC": this.engineSpecsObj.CC,
      "KW": this.engineSpecsObj.KW,
      "Stroke": this.engineSpecsObj.Stroke,
      "Level1" : obj.Level1,
      "Article" : obj.Article
    };
    console.log(tempObj);

    // this.log.postLogDetails(this.segment, this.engineCodeObj.Model, obj.Article);

    const navigationExtras: NavigationExtras = {
      queryParams: {
        // productDetailObj: JSON.stringify(obj)
        productDetailObj: JSON.stringify(tempObj)
      }
    };
    this.router.navigate([`moredetails/prodDetails`], navigationExtras);
  }


  getProductDetailsFn(segment, make, engCodeObj, engSpecObj) {
    this.loadService.present('Please Wait ...', 'circular');
    const url = this.config.configURL + `api/Values/GetenginecodeFilter`;
    const bodyValues = {
      "Segment": segment,
      "Make": make,
      "Model": engCodeObj.Model,
      "Modelcode": engCodeObj.Modelcode,
      "Enginecode": engCodeObj.Enginecode,
      "YearFrom": engCodeObj.YearFrom,
      "YearTill": engCodeObj.YearTill,
      "stroke": engSpecObj.Stroke,
      "cc": engSpecObj.CC,
      "kw": engSpecObj.KW,
      "Level1": engSpecObj.Level1
    };

    this.http.post(url, bodyValues).subscribe(result => {
      console.log(result);
      const response: any = result;
      if (response.result === 'Success') {
        this.productDetailsJson = response.data;
        // this.productDetailsJson = this.removeDuplicateObjectFromArray(response.data, 'Article');
        // console.log(response.data);
        // console.log(this.removeDuplicateObjectFromArray(response.data, 'Article'));
        // this.productDetailsJson = response.data;
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

  // removeDuplicateObjectFromArray(array, key) {
  //   const check = {};
  //   const res = [];
  //   for (let i = 0; i < array.length; i++) {
  //     if (!check[array[i][key]]) {
  //       check[array[i][key]] = true;
  //       res.push(array[i]);
  //     }
  //   }
  //   return res;
  // }

}
