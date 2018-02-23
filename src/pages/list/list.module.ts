import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../modules/shared-module';
import { ListPage } from './list';

@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPage),
    TranslateModule.forChild(),
    SharedModule
  ],
  exports: [
    ListPage
  ]
})
export class ListPageModule {}
