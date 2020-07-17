import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File, IWriteOptions, FileEntry} from '@ionic-native/file/ngx';
import { UploadService } from 'src/app/services/upload/upload.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast/toast.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent   {

  imageData: string;
  // @Input() useURI = true;
  useURI = true;
  uploadImg;
  mobileNo;
  address;
  constructor(
    private modalCtrl: ModalController,
    private camera: Camera,
    private file: File,
    private uploadService: UploadService,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private alertCtrl: AlertController,
    private loaderService: LoaderService,
    private config: ConfigService,
    private http: HttpClient,
    private toastFn: ToastService
  ) {
    this.mobileNo =  localStorage.getItem('mobileno');
    console.log(this.mobileNo);
    this.checkGPSPermission();
    this.getCurrentLocation();
  }


  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      const formData = new FormData();
      const d = Math.round(new Date().getTime() / 1000);
      // formData.append('Image', `gatesindia${d}`);
      // formData.append('MobileNo', this.mobileNo);
      // formData.append('Location', this.address);
      formData.append('file', imgBlob, file.name);
      console.log(formData);

      // this.uploadImageDetails(file.name);
      this.loaderService.present('uploading Images..');

      this.uploadService.uploadFile(formData).subscribe(dataRes => {
        console.log(dataRes);
        this.uploadImageDetails(file.name);
        // alert('38' + JSON.stringify (dataRes));
      }, error => {
        console.log(error);
        this.loaderService.dismiss();
        this.toastFn.toastFn(`Error occurred`, 'bottom');
         // alert('39 =' + JSON.stringify(error));
      });
    };
    reader.readAsArrayBuffer(file);
  }

  uploadImageDetails(filename) {
    // this.loaderService.present('uploading Images..');
    const bodyvalues = {
      "MobileNo": this.mobileNo,
      "Image": filename,
      "Location": this.address
    };
    console.log(bodyvalues);
    const url = `${this.config.configURL}api/Values/gatesImage`;
    this.http.post(url, bodyvalues).subscribe(res => {
      console.log(res);
      this.loaderService.dismiss();
    }, error => {
      console.log(error);
      this.loaderService.dismiss();
    });
  }



  getPicture(srcType: number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.useURI ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: srcType,
      targetWidth: 800,
      targetHeight: 800,
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      if (this.useURI) {
        // const temp = imageData.split('?');
        // this.imageData = temp[0];
        this.imageData = (window as any).Ionic.WebView.convertFileSrc(imageData);
        this.uploadImg = imageData;
      } else {
        this.imageData = 'data:image/jpeg;base64,' + imageData;
      }
    }, (err) => {
      console.log(err);
      // alert('68' + JSON.stringify(err));
    });
  }

  uploadImgToServer() {
    this.file.resolveLocalFilesystemUrl(this.uploadImg).then((entry: FileEntry) => {
      entry.file(file => {
        // this.img = file.localURL;
        console.log(file);
        this.readFile(file);
      }, error => {
        // alert('80' + JSON.stringify(error));
      });
    });
  }
  // uploadImg() {

  //   const options: CameraOptions = {
  //     quality: 100,
    //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   };
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
  //       entry.file(file => {
  //         console.log(file);
  //         // alert(JSON.stringify(file));
  //         this.readFile(file);
  //       }, error => {
  //         // alert('60 =' + JSON.stringify(error));
  //       });
  //     });
  //   }, (err) => {
  //     console.log(err);
  //     // alert('65 =' + JSON.stringify(err));
  //     // Handle error
  //   });

    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // };

    // this.camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64 (DATA_URL):
    //   const base64Image = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {
    //   // Handle error
    // });
//   }

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
    // this.strLat = resp.coords.latitude;
    // this.strLong = resp.coords.longitude;
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


  close() {
    this.modalCtrl.dismiss();
  }


}
