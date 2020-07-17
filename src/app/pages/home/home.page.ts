import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private storage: Storage,
    private router: Router,
    private menuCtrl: MenuController,
    private http: HttpClient,
    private config: ConfigService,
    private loadService: LoaderService,
    private toast: ToastService,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
  ) {
    this.getCurrentLocation();
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
    // console.log(localStorage.getItem('lsLogDetails'));
    // console.log(localStorage.getItem('name'));
  }


  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.getUserAddress(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  getUserAddress(lat, long) {
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lat, long, options).then((result: NativeGeocoderResult[]) => {
      // alert(JSON.stringify(result[0]));
      const addfrmGPS = this.generateAddress(result[0]);

      const lsLogDetails = {
        "State": result[0].administrativeArea,
        "City": result[0].subAdministrativeArea,
        "Zipcode": result[0].postalCode,
        "address": addfrmGPS,
        "Devicetype": "IOS"
      };

      localStorage.setItem('lsLogDetails', JSON.stringify(lsLogDetails));

      console.log(JSON.stringify(result[0]));
    }).catch((error: any) => {
      console.log(JSON.stringify(error));
      console.log(error);
    });
  }

  generateAddress(addressObj) {
    const obj = [];
    let address = '';
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }

  chkUserFn() {

    const chkUserType = localStorage.getItem('usertype');

    if (chkUserType === 'Others') {
      this.alertFn('You are not Authorized to Scan');
    } else {

      this.loadService.present('Loading...', 'circular');

      const bodyValues = {
        "MobileNo": localStorage.getItem('mobileno'),
        "usertype": localStorage.getItem('usertype')
      };

      // const bodyValues = {
      //   "MobileNo": 5469871325,
      //   "usertype": 'others'
      // };

      console.log(bodyValues);

      const url = this.config.configURL + 'api/Values/ValidateOTP';
      this.http.post(url, bodyValues).subscribe(data => {
        console.log(data);
        const response: any = data;
        if (response.result === 'Verified') {
          this.loadService.dismiss();
          this.router.navigate(['scan']);
        } else if (response.result === 'NotVerified') {
          // alert('ask');
          this.toast.toastFn(`You are not Authorized`, 'bottom');
          this.alertFn('You are not Authorized');
        }
        this.loadService.dismiss();
      }, error => {
        this.loadService.dismiss();
        console.log(error);
      });

    }


  }


  async alertFn(msg) {
    const alert = await this.alertCtrl.create({
      header: `GATES INDIA`,
      message: msg,
      buttons: [
        {
          text: 'OKAY',
          handler: () => {
            // navigator['app'].exitApp();
          }
        }
      ]

    });

    await alert.present();
  }

  logoutFn() {
    this.authService.logout();
    localStorage.clear();
    this.storage.clear().then(() => {
      console.log('all keys are cleared');
    });
    this.router.navigateByUrl('/register');
  }

}
