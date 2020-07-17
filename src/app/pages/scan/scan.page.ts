import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ScanuploadimgPage } from '../scanuploadimg/scanuploadimg.page';
import { UploadComponent } from 'src/app/components/upload/upload.component';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  public strLat;
  public strLong;
  public address;
  public userType;
  constructor(
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private config: ConfigService,
    private loadService: LoaderService,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.userType = localStorage.getItem('usertype');
    // console.log(localStorage.getItem('businessname'));
    this.checkGPSPermission();
    this.getCurrentLocation();

  }

  scanQrFn() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      // showFlipCameraButton: true,
      // showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      disableSuccessBeep: false
      // formats: 'QR_CODE,PDF_417 ',
      // orientation: 'landscape',
    };
    // Optionally request the permission early
    this.barcodeScanner.scan(options).then(barcodeData => {
      if (barcodeData.cancelled) {
        alert('Cancelled Scanning ☹️...');
      } else {
        // alert(barcodeData.text);
        console.log(barcodeData.text);
        // this.chkRewarsPoint(barcodeData.text);
        this.scanSerialNumberFn(barcodeData.text);
      }
    }).catch(err => {
      // alert(JSON.stringify(err));
      console.log('Error', err);
    });
  }


  async scanSerialNumberFn(serialNofromQR) {
    const alert = await this.alertCtrl.create({
      header: 'GATES FINDER',
      inputs: [
        {
          name: 'serialNo',
          type: 'text',
          placeholder: 'Enter Product Serial Number',
          value: serialNofromQR
        },
      ],
      buttons: [
        // {
        //   text: 'Cancel',
        //   role: 'cancel',
        //   cssClass: 'secondary',
        //   handler: () => {
        //     console.log('Confirm Cancel');
        //   }
        // },
        {
          text: 'Validate',
          handler: data => {

            if (typeof data.serialNo != null) {
              console.log(data.serialNo);
              this.chkRewarsPoint(data.serialNo);
            }
          }
        }
      ]
    });

    await alert.present();
  }



  async enterSerialNumberFn() {
    const alert = await this.alertCtrl.create({
      header: 'GATES FINDER',
      inputs: [
        {
          name: 'serialNo',
          type: 'text',
          placeholder: 'Enter Product Serial Number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Validate',
          handler: data => {

            if (typeof data.serialNo != null) {
              console.log(data.serialNo);
              this.chkRewarsPoint(data.serialNo);
            }
          }
        }
      ]
    });

    await alert.present();
  }


  chkRewarsPoint(serialNumber) {
    this.loadService.present('Loading...', 'circular');

    const bodyValues = {
      "MobileNo": localStorage.getItem('mobileno'),
      "SerialNo": serialNumber,
      "usertype": localStorage.getItem('usertype'),
      "BusinessName": localStorage.getItem('businessname'),
      "Address": this.address,
      "Latitude": this.strLat,
      "Longitude": this.strLong
    };

    console.log(bodyValues);

    let url = this.config.configURL + 'api/Values/ScanPart';
    this.http.post(url, bodyValues).subscribe(data => {
      console.log(data);
      let response: any = data;

      const username = localStorage.getItem('name');

      // This number is eligible for reward points( यह नंबर रिवार्ड पॉइंट्स के लिए योग्य है )
      // This number is already scanned(यह संख्या पहले से ही स्कैन की गई है)
      // This number is not eligible for reward points(यह अंक रिवार्ड पॉइंट्स के लिए योग्य नहीं है)

      if (response.result === 'No Record') {
        this.alertNotEligible(`Dear ${username}, Scanned serial no ${serialNumber}.This number is not eligible for reward points ( यह अंक रिवार्ड पॉइंट्स के लिए योग्य नहीं है ). Thank You.`);
      } else if (response.result === 'ScanSuccess') {
        this.alertNotEligible(`Dear ${username}, Scanned serial no ${serialNumber}.This number is eligible for reward points ( यह नंबर रिवार्ड पॉइंट्स के लिए योग्य है ). Thank You.`);
      } else if (response.result === 'AlreadScaned') {
        this.alertNotEligible(`Dear ${username}, Scanned serial no ${serialNumber}.This number is already scanned for reward points ( यह संख्या पहले से ही स्कैन की गई है ). Thank You.`);
      }
      // if (response.data.length === 0) {

      // } else {

      // }

      console.log(response.data);

      this.loadService.dismiss();
    }, error => {
      this.loadService.dismiss();
      console.log(error);
    });
  }


  async alertNotEligible(msg) {
    const alert = await this.alertCtrl.create({
      header: `GATES INDIA`,
      message: msg,
      buttons: [
        // {
        //   text: 'NO',
        //   role: 'cancel',
        //   handler: () => {
        //     // this.checkGPSPermission();
        //     navigator['app'].exitApp();
        //   }
        // },
        {
          text: 'OK',
          handler: () => {
            // navigator['app'].exitApp();
          }
        }
      ]

    });

    await alert.present();
  }




  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          // If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
          // If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        // alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log('4');
      } else {
        // Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              // Show alert if user click on 'No Thanks'
              this.enableGpsAlertFn();
              // alert('requestPermission Error requesting location permissions ' + error);
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
      },
      error => {
        this.enableGpsAlertFn();
        // this.checkGPSPermission();
        // alert('Error requesting location permissions ' + JSON.stringify(error));
      }
    );
  }

  async enableGpsAlertFn() {
    const alert = await this.alertCtrl.create({
      header: `If you don't enable GPS, Registration Not To be Done. Please Enable GPS`,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            // this.checkGPSPermission();
            navigator['app'].exitApp();
          }
        },
        {
          text: 'YES',
          handler: () => {
            // navigator['app'].exitApp();
            this.checkGPSPermission();
          }
        }
      ]

    });

    await alert.present();
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

      this.address = this.generateAddress(result[0]);


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

  async uploadImage() {
    const modal = await this.modalCtrl.create({
      // component: ScanuploadimgPage,
      component: UploadComponent,
      cssClass: 'img-modal'
    });
    modal.onWillDismiss().then(() => {
      // this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      // this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  async uploadImageFn() {
    const alert = await this.alertCtrl.create({
      header: `Select Image`,
      // buttons: [
      //   {
      //     text: 'NO',
      //     role: 'cancel',
      //     handler: () => {
      //       // this.checkGPSPermission();
      //       navigator['app'].exitApp();
      //     }
      //   },
      //   {
      //     text: 'YES',
      //     handler: () => {
      //       // navigator['app'].exitApp();
      //       this.checkGPSPermission();
      //     }
      //   }
      // ]

    });

    await alert.present();
  }




}
