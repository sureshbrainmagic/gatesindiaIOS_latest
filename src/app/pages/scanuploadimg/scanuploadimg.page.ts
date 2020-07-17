import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File, IWriteOptions, FileEntry} from '@ionic-native/file/ngx';
import { UploadService } from 'src/app/services/upload/upload.service';


@Component({
  selector: 'app-scanuploadimg',
  templateUrl: './scanuploadimg.page.html',
  styleUrls: ['./scanuploadimg.page.scss'],
})
export class ScanuploadimgPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private camera: Camera,
    private file: File,
    private uploadService: UploadService,
  ) { }

  ngOnInit() {
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      const formData = new FormData();
      const d = Math.round(new Date().getTime() / 1000);
      formData.append('name', `gatesindia${d}`);
      formData.append('file', imgBlob, file.name);
      console.log(formData);
      this.uploadService.uploadFile(formData).subscribe(dataRes => {
        console.log(dataRes);
      }, error => {
        alert('39 =' + JSON.stringify(error));
      });
    };
    reader.readAsArrayBuffer(file);
  }

  uploadImg() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
        entry.file(file => {
          console.log(file);
          alert(JSON.stringify(file));
          this.readFile(file);
        }, error => {
          alert('60 =' + JSON.stringify(error));
        });
      });
    }, (err) => {
      console.log(err);
      alert('65 =' + JSON.stringify(err));
      // Handle error
    });

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
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
