import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-enginecode',
  templateUrl: './enginecode.page.html',
  styleUrls: ['./enginecode.page.scss'],
})
export class EnginecodePage implements OnInit {

  public segment: string;
  public make: string;
  public model: string;
  public showData: boolean = false;
  public getFromYearValue = 'All';

  public engineCodeJSON = [];
  public fullData = [];
  public searchData = [];
  public yearFrom = [];
  public yearTill = [];
  public noRecord: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private loadService: LoaderService,
    public config: ConfigService,
    private router: Router
  ) { }

  ngOnInit() {
    this.segment = this.activatedRoute.snapshot.paramMap.get('segment');
    this.make = this.activatedRoute.snapshot.paramMap.get('make');
    this.model = this.activatedRoute.snapshot.paramMap.get('model');
    this.getEngineCodeFn(this.segment, this.make, this.model);
  }

  gotoEngineSpecs(obj) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        engineCodeObj: JSON.stringify(obj)
      }
    };
    this.router.navigate([`enginespecs/${this.segment}/${this.make}/`], navigationExtras);
    // this.router.navigate(['enginespecs/'], navigationExtras);
  }

  getEngineCodeFn(segment, make, model) {
    this.loadService.present('Please Wait ...', 'circular');
    const url = this.config.configURL + `api/Values/getenginecode`;
    const bodyValues = {
      "Segment": segment,
      "Make": make,
      "model": model
    };

    this.http.post(url, bodyValues).subscribe(result => {
      console.log(result);
      const response: any = result;
      // console.log(response.data1.YearFrom);
      if (response.result === 'Success') {
        this.engineCodeJSON = response.data;
        this.fullData = response.data;
        this.yearFrom = response.data1.YearFrom;
        this.yearTill = response.data1.YearTill;
        this.showData = true;
        this.loadService.dismiss();
      }

      if (response.data.length === 0) {
        this.noRecord = true;
      } else {
        this.noRecord = false;
      }
      this.loadService.dismiss();
    }, error => {
      this.loadService.dismiss();
      console.log(error);
    });
  }


  searchOnYearFrom(event) {
    // console.log(event);
    console.log(event.value);
    const searchTxt = event.value;
    this.searchData = this.engineCodeJSON;
    if (searchTxt === 'All') {
      this.engineCodeJSON = this.fullData;
      console.log(this.engineCodeJSON);
    } else {
      this.engineCodeJSON = this.fullData.filter((item) => {
        return item.YearFrom.toLowerCase().includes(searchTxt.toLowerCase());
      });
    }
  }

  searchOnYearTill(event) {
    // console.log(event);
    console.log(event.value);

    const searchTxt = event.value;
    this.searchData = this.engineCodeJSON;

    if (searchTxt === 'All') {
      this.engineCodeJSON = this.fullData;
      console.log(this.engineCodeJSON);
    } else {
      this.engineCodeJSON = this.fullData.filter((item: any) => {
        return item.YearFrom >= this.getFromYearValue &&
          item.YearTill <= searchTxt;
      });
      // this.engineCodeJSON = this.fullData.filter((item) => {
      //   return item.YearTill.toLowerCase().includes(searchTxt.toLowerCase());
      // });
    }
  }

}
