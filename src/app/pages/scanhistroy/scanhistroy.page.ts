import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
// import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-scanhistroy',
  templateUrl: './scanhistroy.page.html',
  styleUrls: ['./scanhistroy.page.scss'],
})
export class ScanhistroyPage implements OnInit {

  public noRecord: boolean = false;
  public scanHistroyJson: any = [];
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private loadService: LoaderService,
  ) { }

  ngOnInit() {
    this.getScanHistroyData();
  }

  getScanHistroyData() {
    this.loadService.present('Loading...', 'circular');

    const bodyValues = {
      "MobileNo": localStorage.getItem('mobileno')
    };

    console.log(bodyValues);

    let url = this.config.configURL + 'api/Values/Scanhistory';
    this.http.post(url, bodyValues).subscribe(data => {
      console.log(data);
      let response: any = data;


      if (response.data.length === 0) {
        this.noRecord = true;
      } else {
        this.noRecord = false;
        this.scanHistroyJson = response.data;
      }

      console.log(response.data);

      this.loadService.dismiss();
    }, error => {
      this.loadService.dismiss();
      console.log(error);
    });
  }

}
