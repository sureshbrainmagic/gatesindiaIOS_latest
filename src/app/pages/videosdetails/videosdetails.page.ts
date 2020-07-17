import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-videosdetails',
  templateUrl: './videosdetails.page.html',
  styleUrls: ['./videosdetails.page.scss'],
})
export class VideosdetailsPage implements OnInit {

  public VideoCatagoryname;
  public videosDetailsJson: any = [];
  public showData: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private config: ConfigService,
    private loadService: LoaderService,
    private iab: InAppBrowser,
  ) { }

  ngOnInit() {
    this.VideoCatagoryname = this.activatedRoute.snapshot.paramMap.get('VideoCatagoryname');
    this.getTrainingVideosFn(this.VideoCatagoryname);
  }

  openExternalURL(url) {
    this.iab.create(url, '_system');
  }

  getTrainingVideosFn(videoCatName) {
    const bodyValues = {
      'VideoCatagoryname': videoCatName
    };

    this.loadService.present('Loading...', 'circular');
    const url = `${this.config.configURL}api/Values/postvideo`;
    this.http.post(url, bodyValues).subscribe(data => {
      console.log(data);
      const response: any = data;
      if (response.result === 'Success') {
        this.videosDetailsJson = response.data;
        this.showData = true;
        this.loadService.dismiss();
      }
      this.loadService.dismiss();
    }, error => {
      this.loadService.dismiss();
      console.log(error);
    });

  }

}
