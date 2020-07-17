import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
@Component({
  selector: 'app-networkdetails',
  templateUrl: './networkdetails.page.html',
  styleUrls: ['./networkdetails.page.scss'],
})
export class NetworkdetailsPage implements OnInit {

  public distributorDetailsJson: any = [];
  public countryJson: any = [];
  public stateJson: any = [];
  public cityJson: any = [];
  public noRecord: boolean = false;
  public countryValue: string = 'All';
  public stateValue: string = 'All';
  public cityValue: string = 'All';
  constructor(
    private queryString: ActivatedRoute,
    private loadService: LoaderService,
    private http: HttpClient,
    private config: ConfigService,
    private launchNavigator: LaunchNavigator,
  ) { }

  ngOnInit() {
    const DistributorKey = this.queryString.snapshot.paramMap.get('DistributorKey');
    console.log(DistributorKey);
    this.getCountryDataFn();
    this.getDistributorDetailsFn(DistributorKey);
  }

  getDistributorDetailsFn(disKey) {
    const bodyValues = {
      "DistributorKey": disKey
    };
    this.loadService.present('Please Wait...', 'circular');
    const url = `${this.config.configURL}api/Values/Distributordetail`;
    this.http.post(url, bodyValues).subscribe(data => {
      console.log(data);
      const response: any = data;
      if (response.result === 'Success') {
        this.distributorDetailsJson = response.data;
        this.noRecord = false;
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

  getCountryDataFn() {
    const url = `${this.config.configURL}api/Values/GetCountry`;
    this.http.get(url).subscribe(data => {
      console.log(data);
      const response: any = data;
      if (response.result === 'Success') {
        this.countryJson = response.data;
      }
    }, error => {
      // this.loadService.dismiss();
      console.log(error);
    });
  }

  searchCountry(event) {
    // console.log(event);
    this.cityJson = [];
    console.log(event.value);
    const url = `${this.config.configURL}api/Values/GetState`;
    const bodyValue = {
      "CountryName": event.value
    };
    this.getData(url, bodyValue, 'state');
    this.getDistributorSearchData();

  }

  getData(url, bodyValues, mode) {
    // this.loadService.present('Loading ...', 'circular');
    this.http.post(url, bodyValues).subscribe(data => {
      const response: any = data;
      if (response.result === 'Success') {
        if (mode === 'state') {
          this.stateJson = response.data;
        } else if (mode === 'city') {
          this.cityJson = response.data;
        }
      }
    }, error => {
      console.log(error);
    });

  }

  searchState(event) {
    this.cityJson = [];
    console.log(this.countryValue);
    const url = `${this.config.configURL}api/Values/GetCity`;
    const bodyValue = {
      "CountryName": this.countryValue,
      "State": event.value
    };
    this.getData(url, bodyValue, 'city');
    this.getDistributorSearchData();
  }

  searchCity(event) {
    console.log(event);
    this.getDistributorSearchData();
  }

  getDistributorSearchData() {
    const url = `${this.config.configURL}api/Values/Distributorsearch`;
    const searchBody = {
      "Country": this.countryValue,
      "State": this.stateValue,
      "City": this.cityValue
    };

    this.loadService.present('Loading ...', 'circular');


    this.http.post(url, searchBody).subscribe(data => {
      const response: any = data;
      if (response.result === 'Success') {
        this.distributorDetailsJson = response.data;
        this.loadService.dismiss();
        this.noRecord = false;
      } else {
        this.noRecord = true;
      }
      this.loadService.dismiss();

    }, error => {
      console.log(error);
      this.loadService.dismiss();
    });

  }

  openLocation(obj) {

    const address: any = `${obj.Address}, ${obj.City}, ${obj.State}, ${obj.Country}, ${obj.Pincode}`;

    console.log(address);

    this.launchNavigator.navigate(address)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }


}
