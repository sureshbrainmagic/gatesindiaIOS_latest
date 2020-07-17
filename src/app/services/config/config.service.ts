import { Injectable } from '@angular/core';
// import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // public configURL: string = 'https://cors-anywhere.herokuapp.com/http://delphitvssm.brainmagicllc.com/';   // debug URL
  // public configURL: string = 'https://finder.gates.com/gatesproduction/';  // Production URL
  // public configURL: string = 'http://delphitvssm.brainmagicllc.com/';  // Production URL
  // public configURL: string = 'http://testing.brainmagicllc.com/';  // testing url for IOS
  // public configURL: string = 'http://johnyjson.brainmagicllc.com/';

  public configURL: string = 'https://brainmagicllc.com/iosgates/';

  constructor(
    // private youtube: YoutubeVideoPlayer,
    private downloader: Downloader,
    private toastCtrl: ToastService,
    private photoViewer: PhotoViewer,
    private iab: InAppBrowser,
  ) { }


  openWebpage(url: string) {
    const options: InAppBrowserOptions = {
      // toolbar: 'no',
      // location: 'no',
      zoom: 'no',
      fullscreen: 'yes',
    };

    // Opening a URL and returning an InAppBrowserObject
    // this.iab.create(url, '_system', options);
    const browser = this.iab.create(url, '_blank', options);
    browser.on('exit').subscribe(event => {
      // alert('exit');
      // this.lockPortrait()
    });
  }

  imgZoomFn(img) {
    this.photoViewer.show(img);
  }

  productFunc(makeMode) {
    if (makeMode === 'Passenger Car & Light Commercial') {
      return 'PC & LCV';
      // } else if (makeMode === 'Heavy Commerical') {
    } else if (makeMode === 'Heavy Commercial') {
       return 'HCV';
      // return 'Heavy Commercial';
    } else if (makeMode === '2 Wheeler') {
      return '2 Wheeler';
    }
  }

  playYoutubeVideoFn(url) {
    const videoID = this.getParameterByName('v', url);
    console.log(videoID);
    // this.youtube.openVideo(videoID);
  }

  getYouTubeVideoID(url) {
    if (url !== undefined) {
      // const getURLShortCode = url.replace('https://www.youtube.com/embed/', '');
      const img = this.getParameterByName('v', url);
      return `https://img.youtube.com/vi/${img}/hqdefault.jpg`;
    }
  }

  getParameterByName(name, url) {
    // if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  downloadPdf(url) {
    const fileType = url.split('/').pop();

    // alert(fileType);

    const request: DownloadRequest = {
      uri: url,
      title: fileType,
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Download',
        subPath: fileType
      }
    };

    this.downloader.download(request).then((location: string) => {
      // this.toastCtrl.toastFn('Pdf Downloaded Successfully:' + location, 'bottom');
      this.toastCtrl.toastFn('Pdf Downloaded', 'bottom');
    })
      .catch((error: any) => alert('error' + error));
  }

}
