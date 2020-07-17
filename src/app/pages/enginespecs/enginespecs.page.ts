import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-enginespecs',
  templateUrl: './enginespecs.page.html',
  styleUrls: ['./enginespecs.page.scss'],
})
export class EnginespecsPage implements OnInit {

  public segment: string;
  public make: string;
  // public model: string;
  // public engineCode: string;
  public noRecord: boolean = false;
  public engineSpecsJson: any = [];
  public engineCodeObj: any = [];

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
    // this.model = this.activatedRoute.snapshot.paramMap.get('model');
    // this.engineCode = this.activatedRoute.snapshot.paramMap.get('enginecode');
    // console.log(JSON.stringify(this.engineCode));

    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.engineCodeObj) {
        this.engineCodeObj = JSON.parse(params.engineCodeObj);
        console.log(JSON.parse(params.engineCodeObj));
        this.getEngineSpecsCodeFn(this.segment, this.make, this.engineCodeObj);
      }
    });

  }

  gotoProductDetails(obj) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        engineCodeObj: JSON.stringify(this.engineCodeObj),
        engineSpecsObj: JSON.stringify(obj),
      }
    };
    this.router.navigate([`productdetails/${this.segment}/${this.make}/`], navigationExtras);
    // this.router.navigate(['enginespecs/'], navigationExtras);
  }

  getEngineSpecsCodeFn(segment, make, obj) {
    this.loadService.present('Please Wait ...', 'circular');
    const url = this.config.configURL + `api/Values/Otherlist`;
    const bodyValues = {
      "Segment": segment,
      "Make": make,
      "Model": obj.Model,
      "Modelcode": obj.Modelcode,
      "Enginecode": obj.Enginecode,
      "YearFrom": obj.YearFrom,
      "YearTill": obj.YearTill,
    };

    this.http.post(url, bodyValues).subscribe(result => {
      console.log(result);
      const response: any = result;


      if (response.result === 'Success') {
        this.engineSpecsJson = response.data;
        this.loadService.dismiss();
      } else if (response.result === 'No Record') {
        this.noRecord = true;
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

}
