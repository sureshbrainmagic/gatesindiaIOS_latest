import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  public notificationJson;
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private loadService: LoaderService,
  ) { }

  ngOnInit() {
    this.getNotificationFn();
  }

  getNotificationFn() {
    this.loadService.present('Loading...', 'circular');
    let url = this.config.configURL + 'api/Values/notification';
    this.http.get(url).subscribe(data => {
      console.log(data);
      let response: any = data;
      if (response.result === 'Success') {
        this.notificationJson = response.data;
        this.loadService.dismiss();
      }
      this.loadService.dismiss();
    }, error => {
      this.loadService.dismiss();
      console.log(error);
    });

  }

}
