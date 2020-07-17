import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';


@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
})
export class NetworkPage implements OnInit {

  public noRecord: boolean = false;
  public distributorNetworkJson: any = [];
  public showData: boolean = false;
  public pagemode: string;
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private loadService: LoaderService,

  ) { }

  ngOnInit() {
    this.getDistributorNetworkDataFn();
  }

  getDistributorNetworkDataFn() {
    this.loadService.present('Loading...', 'circular');
    const url = `${this.config.configURL}api/Values/Distributorname`;
    this.http.get(url).subscribe(data => {
      console.log(data);
      const response: any = data;
      if (response.result === 'Success') {
        this.distributorNetworkJson = response.data;
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
