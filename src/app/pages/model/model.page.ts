import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.page.html',
  styleUrls: ['./model.page.scss'],
})
export class ModelPage implements OnInit {

  public segment: string;
  public make: string;
  public modelJSON = [];
  public noRecord: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private loadService: LoaderService,
    public config: ConfigService
  ) { }

  ngOnInit() {
    this.segment = this.activatedRoute.snapshot.paramMap.get('segment');
    this.make = this.activatedRoute.snapshot.paramMap.get('make');
    // alert(makeMode);
    // alert(modelMode);
    this.getModelDataByModeFn(this.segment, this.make);
  }

  getModelDataByModeFn(segment, make) {
    this.loadService.present('Please Wait ...', 'circular');
    const url = this.config.configURL + `api/Values/getmodel`;

    const bodyValues = {
      "Segment": segment,
      "Make": make
    };

    this.http.post(url, bodyValues).subscribe(result => {
      console.log(result);

      let response: any = result;

      if (response.result === 'Success') {
        this.modelJSON = response.data;
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
