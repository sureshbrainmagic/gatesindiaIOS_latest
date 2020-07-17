import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ErrormsgService } from 'src/app/services/errormsg/errormsg.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config/config.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public getOTP;
  public getDeviceID: string = '';
  public strLat;
  public strLong;

  public btnOTPString: string = 'Generate OTP';
  public enableOTP: boolean = false;
  // public enableDisableElement: boolean = false;
  public enableGST: boolean = false;
  public isOTPVerified: boolean = false;
  public chkNewUser: boolean = false;
  validationsForm: FormGroup;
  constructor(
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    public errorMSG: ErrormsgService,
    private http: HttpClient,
    private config: ConfigService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private loadService: LoaderService,
    private uniqueDeviceID: UniqueDeviceID,
    private authService: AuthenticationService,
    private router: Router,
    private toast: ToastService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {
    this.getCurrentLocation();
   }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.validationsForm = this.formBuilder.group({
      mobileNo: new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])),
      name: new FormControl(''),
      email: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      businessname: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      usertype: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      Gstin: new FormControl('', Validators.compose([
        // Validators.required,
      ])),
      ShopName: new FormControl('', Validators.compose([
        // Validators.required,
      ])),
      State: new FormControl('', Validators.compose([
        // Validators.required,
      ])),
      City: new FormControl('', Validators.compose([
        // Validators.required,
      ])),
      Zipcode: new FormControl('', Validators.compose([
        // Validators.required,
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });

    this.uniqueDeviceID.get().then((uuid: any) => {
      this.getDeviceID = uuid;
      // alert(uuid);
      console.log(uuid);
    }).catch((error: any) => {
      console.log(error);
    });

  }


  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.strLat = resp.coords.latitude;
      this.strLong = resp.coords.longitude;
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
      this.validationsForm.controls['address'].setValue(addfrmGPS);
      this.validationsForm.controls['State'].setValue(result[0].administrativeArea);
      this.validationsForm.controls['City'].setValue(result[0].subAdministrativeArea);
      this.validationsForm.controls['Zipcode'].setValue(result[0].postalCode);

      // const lsLogDetails = {
      //   "State" : result[0].administrativeArea,
      //   "City" : result[0].subAdministrativeArea,
      //   "Zipcode" : result[0].postalCode,
      //   "address" : addfrmGPS,
      //   "Devicetype" : "IOS"
      // };

      // localStorage.setItem('lsLogDetails', JSON.stringify(lsLogDetails));

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


  mobileNoOnChange(event) {
    if (event.target.value.length === 10) {
      this.checkUserExistFn(event.target.value);
      this.getCurrentLocation();
    }
  }

  async checkUserExistFn(mobNo) {



    // console.log(mobNo);
    this.loadService.present('Please Wait ...', 'circular');
    const url = this.config.configURL + `api/Values/CheckReg`;
    const values = {
      "MobileNo": mobNo
    };
    this.http.post(url, values).subscribe(result => {
      // console.log(response.result);

      console.log(result);

      const response: any = result;

      if (response.result === 'Success') {
        console.log(response.data.name);
        this.chkNewUser = false;


        localStorage.setItem('id', response.data.id);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('mobileno', response.data.mobileno);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('usertype', response.data.usertype);
        localStorage.setItem('businessname', response.data.BusinessName);

        this.enableGST = false;
        if (response.data.OTPStatus === 'Verified') {
          this.isOTPVerified = true;
        } else if (response.data.OTPStatus === 'NotVerified') {
          // this.enableGSTDetails = true;
          this.isOTPVerified = false;
          // this.enableOTP = true;
        }

        // this.enableDisableElement = true;

        this.validationsForm.controls['Gstin'].clearValidators();
        this.validationsForm.controls['Gstin'].updateValueAndValidity();

        this.validationsForm.controls['ShopName'].clearValidators();
        this.validationsForm.controls['ShopName'].updateValueAndValidity();


        this.validationsForm.controls['name'].setValue(response.data.name);
        this.validationsForm.controls['email'].setValue(response.data.email);
        if (response.data.BusinessName !== '' || response.data.BusinessName !== undefined || response.data.BusinessName != null) {
          this.validationsForm.controls['businessname'].setValue(response.data.BusinessName);
        }
        this.validationsForm.controls['usertype'].setValue(response.data.usertype);
        //  this.enableDisableUserType = true;

        this.validationsForm.controls['name'].disable();
        this.validationsForm.controls['email'].disable();
        this.validationsForm.controls['businessname'].disable();
        this.validationsForm.controls['usertype'].disable();


        this.loadService.dismiss();
      } else if (response.result === 'No Record') {
        this.chkNewUser = true;
        // this.enableOTP = true;
        console.log('new user');
        this.validationsForm.controls['name'].enable();
        this.validationsForm.controls['email'].enable();
        this.validationsForm.controls['businessname'].enable();
        this.validationsForm.controls['usertype'].enable();

        this.validationsForm.controls['name'].setValue('');
        this.validationsForm.controls['email'].setValue('');
        this.validationsForm.controls['businessname'].setValue('');
        this.validationsForm.controls['usertype'].setValue('');
        // this.enableDisableUserType = false;
        // this.chkNewUser = true;
      }


      this.loadService.dismiss();
    }, error => {
      this.loadService.dismiss();
      console.log(error);
      // alert(error.message);
    });

  }


  chkBoxOnChanged(event) {
    console.log(event.detail.checked);

    if (event.detail.checked) {
      this.validationsForm.controls['Gstin'].clearValidators();
      this.validationsForm.controls['Gstin'].updateValueAndValidity();

      this.validationsForm.controls['ShopName'].clearValidators();
      this.validationsForm.controls['ShopName'].updateValueAndValidity();
    } else {
      console.log('else');
      // this.validationsForm.controls['Gstin'].setValue('');
      // this.validationsForm.controls['ShopName'].setValue('');
      this.validationsForm.controls['Gstin'].setValidators([Validators.required]);
      this.validationsForm.controls['Gstin'].updateValueAndValidity();

      this.validationsForm.controls['ShopName'].setValidators([Validators.required]);
      this.validationsForm.controls['ShopName'].updateValueAndValidity();
    }

  }

  onOtpChange(values) {
    console.log(values.length);
    this.getOTP = values;

    if (values.length === 4) {
      localStorage.setItem('isOTPEntered', 'true');
    } else {
      localStorage.setItem('isOTPEntered', 'false');
    }

    // localStorage.setItem('isOTPEntered', '');

  }


  getUserType(event) {
    console.log(event.value);
    const type = event.value;
    console.log(event);
    if (type === 'Dealer / Retailer' && this.chkNewUser === true) {
      this.showLoyaltyMsgFn(`Please Enter GSTIN Number, this will help to activate your account very quickly for Loyalty Reward Points`);
      this.enableGST = true;
    } else {
      this.enableGST = false;
    }
  }

  async showLoyaltyMsgFn(msg) {
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


  enableOTPFn(values) {
    this.enableOTP = true;
    this.btnOTPString = 'Resend OTP';
    localStorage.setItem('isOTPEntered', 'false');

    // console.log(values);

    const tempValues = {
      "MobileNo": values.mobileNo,
      "name": values.name,
      "UserType": values.typeofuser,
      "Emailid": values.email,
      "BusinessName": values.businessname,
      "Address": values.address,
    };

    localStorage.setItem('name', values.name);
    localStorage.setItem('mobileno', values.mobileNo);
    localStorage.setItem('email', values.email);
    localStorage.setItem('businessname', values.businessname);
    localStorage.setItem('usertype', values.usertype);

    this.http.post(this.config.configURL + 'api/Values/SendOTP', tempValues).subscribe(result => {
      console.log(result);
    }, error => {
      console.log(error);
    });


  }

  skipFn() {
    this.getCurrentLocation();
    this.authService.login();
    localStorage.setItem('isOTPEntered', 'true');
    this.menuCtrl.enable(true);
    this.navCtrl.navigateRoot('/home');
  }

  onSubmit(values) {
    if (this.chkNewUser === true || this.isOTPVerified === false) {
      const registerValues = {
        "usertype": values.usertype,
        "MobileNo": values.mobileNo,
        "Status": 'Active',
        "name": values.name,
        "email": values.email,
        "appid": this.getDeviceID,
        "OTPStatus": 'Verified',
        "Date": new Date().toLocaleDateString(),
        "Password": '',
        "Country": 'India',
        "OTP": this.getOTP,
        // "OTP": "8692",
        "BusinessName": values.businessname,
        "Latitude": this.strLat,
        "Longitude": this.strLong,
        "Address": values.address,
        "ShopName": values.ShopName,
        "Gstin": values.Gstin,
        "State": values.State,
        "City": values.City,
        "Zipcode": values.Zipcode
      };

      console.log(registerValues);
      // alert(JSON.stringify(registerValues));
      this.loadService.present('Verifying User...', 'circular');
      const url = `${this.config.configURL}api/Values/newregister`;

      this.http.post(url, registerValues).subscribe(result => {
        console.log(result);

        const response: any = result;

        if (response.result === 'UpdateSuccess') {
          this.authService.login();
          // console.log(response.data.name);
          localStorage.setItem('isOTPEntered', 'true');
          localStorage.setItem('id', response.data.id);
          localStorage.setItem('name', response.data.name);
          localStorage.setItem('mobileno', response.data.mobileno);
          localStorage.setItem('businessname', response.data.BusinessName);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('usertype', response.data.usertype);

          this.loadService.dismiss();
          this.menuCtrl.enable(true);

          this.navCtrl.navigateRoot('/home');
          this.toast.toastFn('Login Successfully', 'bottom');

          // if (response.data.usertype === 'Mechanic' && this.chkNewUser) {
          //   this.showLoyaltyMsgFn(`Wait for admin Approval`);
          // }


        } else if (response.result === 'OTPInvalid') {

          localStorage.setItem('name', values.name);
          localStorage.setItem('mobileno', values.mobileNo);
          localStorage.setItem('email', values.email);
          localStorage.setItem('businessname', values.businessname);
          localStorage.setItem('usertype', values.usertype);

          this.toast.toastFn('Invalid OTP', 'bottom');
        }

        this.loadService.dismiss();
      }, error => {
        this.loadService.dismiss();
        // alert('Error in register page in 187');
        console.log(error);
      });

    } else if (this.isOTPVerified) {
      this.authService.login();
      console.log('Existing User');
      localStorage.setItem('isOTPEntered', 'true');
      this.menuCtrl.enable(true);
      this.navCtrl.navigateRoot('/home');
      this.toast.toastFn('Login Successfully', 'bottom');
    }
  }

}
