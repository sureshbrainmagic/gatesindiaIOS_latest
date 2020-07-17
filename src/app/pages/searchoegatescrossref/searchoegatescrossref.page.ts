import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-searchoegatescrossref',
  templateUrl: './searchoegatescrossref.page.html',
  styleUrls: ['./searchoegatescrossref.page.scss'],
})
export class SearchoegatescrossrefPage implements OnInit {

  public oeNo;
  public partNoJson;
  public showData: boolean;
  public noRecord: boolean = false;
  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private http: HttpClient,
    private config: ConfigService,
    private loadService: LoaderService,
  ) { }

  ngOnInit() {
  }

  getPartNoFn() {
    this.loadService.present('Loading...', 'circular');
    const url = `${this.config.configURL}api/Values/getpartsearch`;
    const bodyValues = {
      "Oenumber" : this.oeNo
    };
    this.http.post(url, bodyValues).subscribe(data => {
      console.log(data);
      const response: any = data;
      if (response.result === 'Success') {
        this.partNoJson = response.data;
        this.showData = true;
        this.noRecord = false;
        this.loadService.dismiss();
      } else if (response.result === 'No Record') {
        this.showData = false;
        this.noRecord = true;
        this.loadService.dismiss();
      }
      this.loadService.dismiss();
    }, error => {
      this.loadService.dismiss();
      console.log(error);
    });
  }

  goToSearchDetails(partno) {
    this.router.navigate([`searchdetails/${partno}`]);
  }

  async alterMsgFn() {
    const msg = `For general reference only. Check catalog for correct application.
    Any use of this interchange to determine application is done at the installers risk`;
    const alert = await this.alertCtrl.create({
      header: 'GATES INDIA',
      message: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            // navigator['app'].exitApp();
          }
        }
      ]

    });

    await alert.present();
  }

}
