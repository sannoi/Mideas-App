import { ProfilePage } from './profile-page';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../modules/shared-module';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    TranslateModule.forChild(),
    SharedModule
  ],
  exports: [
    ProfilePage
  ]
})

export class ProfilePageModule { }
