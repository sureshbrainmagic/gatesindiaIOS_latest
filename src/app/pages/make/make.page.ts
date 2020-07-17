import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-make',
  templateUrl: './make.page.html',
  styleUrls: ['./make.page.scss'],
})
export class MakePage implements OnInit {

  public makeArray: any = [];
  public segment: string;
  public noRecord:boolean = false;
  public heading: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private loadService: LoaderService,
    private config: ConfigService
  ) { }

  ngOnInit() {
    this.segment = this.activatedRoute.snapshot.paramMap.get('segment');
    // alert(makeMode);
    this.heading = this.config.productFunc(this.segment);
    this.getMakeDataByModeFn(this.segment);
  }

  getMakeDataByModeFn(mode) {
    this.loadService.present('Please Wait ...', 'circular');
    const url = this.config.configURL + `api/Values/getmake`;

    const bodyValues = {
      "Segment" : mode
    };

    this.http.post(url, bodyValues).subscribe(result => {
      console.log(result);

      let response: any = result;

      if (response.result === 'Success') {
        this.makeArray = response.data;
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
