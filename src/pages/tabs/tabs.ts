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

  currentIndex: any;
  currentTab: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public configService: ConfigServiceProvider) {
    this.currentIndex = 0;

    if (navParams.get("tabIndex")) {
      this.currentIndex = navParams.get("tabIndex");
    }
  }

  ionViewDidEnter() {
    this.tabRef.select(this.currentIndex);
    this.currentTab = this.tabRef.getSelected();//Returns the currently selected tab
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
