import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;

  constructor(public navCtrl: NavController, public navParams: NavParams, public configService: ConfigServiceProvider) {
  }

  ionViewDidLoad() {
  }

  tabRoot(page) {
    page = this.configExtensionPage(page);
    return page.component;
  }

  tabParams(page) {
    page = this.configExtensionPage(page);
    return page.nav_params;
  }

  configExtensionPage(page: any) {
    if (page.extension && page.type && !page.component) {
      let extension = this.configService.cfg.extensions[page.extension];
      if (extension && extension.active && extension[page.type] && extension[page.type]['use'] && extension[page.type]['component']) {
        page.component = extension[page.type]['component'];
      }
      page.nav_params.extension = extension;
    }

    return page;
  }

}
