import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'register',
    // canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./pages/aboutus/aboutus.module').then(m => m.AboutusPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'contactus',
    loadChildren: () => import('./pages/contactus/contactus.module').then(m => m.ContactusPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'whatsnew',
    loadChildren: () => import('./pages/whatsnew/whatsnew.module').then(m => m.WhatsnewPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'productsearch',
    loadChildren: () => import('./pages/productsearch/productsearch.module').then(m => m.ProductsearchPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'schemespromotion',
    loadChildren: () => import('./pages/schemespromotion/schemespromotion.module').then(m => m.SchemespromotionPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'network',
    loadChildren: () => import('./pages/network/network.module').then(m => m.NetworkPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'otherlinks',
    loadChildren: () => import('./pages/otherlinks/otherlinks.module').then(m => m.OtherlinksPageModule),
    canActivate: [AuthGuardService],
  }, 
  {
    path: 'productsearch',
    loadChildren: () => import('./pages/productsearch/productsearch.module').then(m => m.ProductsearchPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'schemespromotion',
    loadChildren: () => import('./pages/schemespromotion/schemespromotion.module').then(m => m.SchemespromotionPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'scan',
    loadChildren: () => import('./pages/scan/scan.module').then(m => m.ScanPageModule),
    canActivate: [AuthGuardService],
  }, {
    path: 'make/:segment',
    loadChildren: () => import('./pages/make/make.module').then(m => m.MakePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'model/:segment/:make',
    loadChildren: () => import('./pages/model/model.module').then(m => m.ModelPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'enginecode/:segment/:make/:model',
    loadChildren: () => import('./pages/enginecode/enginecode.module').then(m => m.EnginecodePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule),
    canActivate: [AuthGuardService],
  },
  {
    // path: 'enginespecs/:segment/:make/:model/:enginecode',
    path: 'enginespecs/:segment/:make',
    loadChildren: () => import('./pages/enginespecs/enginespecs.module').then(m => m.EnginespecsPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'productdetails/:segment/:make',
    loadChildren: () => import('./pages/productdetails/productdetails.module').then(m => m.ProductdetailsPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'moredetails/:mode',
    loadChildren: () => import('./pages/moredetails/moredetails.module').then(m => m.MoredetailsPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'searchdetails/:oeno',
    loadChildren: () => import('./pages/searchdetails/searchdetails.module').then( m => m.SearchdetailsPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'searchoegatescrossref',
    loadChildren: () => import('./pages/searchoegatescrossref/searchoegatescrossref.module').then( m => m.SearchoegatescrossrefPageModule)
  },
  {
    path: 'trainingvideos',
    loadChildren: () => import('./pages/trainingvideos/trainingvideos.module').then( m => m.TrainingvideosPageModule)
  },
  {
    path: 'videosdetails/:VideoCatagoryname',
    loadChildren: () => import('./pages/videosdetails/videosdetails.module').then( m => m.VideosdetailsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  // },
  {
    path: 'listotherlinks/:pagemode',
    loadChildren: () => import('./pages/listotherlinks/listotherlinks.module').then( m => m.ListotherlinksPageModule)
  },
  {
    path: 'networkdetails/:DistributorKey',
    loadChildren: () => import('./pages/networkdetails/networkdetails.module').then( m => m.NetworkdetailsPageModule)
  },
  {
    path: 'scanhistroy',
    loadChildren: () => import('./pages/scanhistroy/scanhistroy.module').then( m => m.ScanhistroyPageModule)
  },
  // {
  //   path: 'scanuploadimg',
  //   loadChildren: () => import('./pages/scanuploadimg/scanuploadimg.module').then( m => m.ScanuploadimgPageModule),
  //   canActivate: [AuthGuardService],
  // }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
