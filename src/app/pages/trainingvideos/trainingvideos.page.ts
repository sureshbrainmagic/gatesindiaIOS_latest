import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-trainingvideos',
  templateUrl: './trainingvideos.page.html',
  styleUrls: ['./trainingvideos.page.scss'],
})
export class TrainingvideosPage implements OnInit {

  public noRecord: boolean = false;
  public videosJson;
  public showData: boolean = false;
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private loadService: LoaderService,
  ) { }

  ngOnInit() {
    this.getTrainingVideosFn();
  }

  getTrainingVideosFn() {
    this.loadService.present('Loading...', 'circular');
    const url = `${this.config.configURL}api/Values/Trainingvideos`;
    this.http.get(url).subscribe(data => {
      console.log(data);
      const response: any = data;
      if (response.result === 'Success') {
        this.videosJson = response.data;
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
