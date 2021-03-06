import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { ProtectedPage } from '../protected-page/protected-page';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../providers/auth-service';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';

@IonicPage()
@Component({
  selector: 'page-profile-page',
  templateUrl: 'profile-page.html'
})
export class ProfilePage extends ProtectedPage {

  public user: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public storage: Storage,
    public authService: AuthService,
    public configService: ConfigServiceProvider) {
    super(navCtrl, navParams, storage, authService, configService);
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
    this.storage.get('user').then(usr => {
      this.user = usr;
    });
  }

  cssClass() {
    if (this.configService.cfg.extensions.users.active) {
      return '';
    } else {
      return 'not_logged';
    }
  }

  openPageLink(page: any) {
    if (page) {
      this.configService.setActivePage(page);
    }
  }

  openPage(id_menu: number) {
    if (this.configService.menu.pages[id_menu]) {
      this.configService.setActivePage(this.configService.menu.pages[id_menu]);
    }
  }

  imageTapped(post) {
    console.log('Post image clicked');
  }

  comment(post) {
    console.log('Comments clicked');
  }

  like(post) {
    console.log('Like clicked');
  }

}
