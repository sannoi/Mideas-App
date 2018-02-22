import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../modules/shared-module';

import { MessagesPage } from './messages';

@NgModule({
  declarations: [
    MessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(MessagesPage),
	  TranslateModule.forChild(),
    SharedModule
  ]
})
export class MessagesPageModule {}
