import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../modules/shared-module';
import { ItemInfoPage } from './item-info';

@NgModule({
  declarations: [
    ItemInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemInfoPage),
    TranslateModule.forChild(),
    SharedModule
  ],
  exports: [
    ItemInfoPage
  ]
})
export class ItemInfoPageModule {}
