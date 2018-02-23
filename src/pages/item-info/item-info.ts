import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { ProtectedPage } from '../protected-page/protected-page';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../providers/auth-service';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';
import { ItemsServiceProvider } from '../../providers/items-service/items-service';

@IonicPage()
@Component({
  selector: 'page-item-info',
  templateUrl: 'item-info.html',
})
export class ItemInfoPage extends ProtectedPage {

  private item: any;
  private user: any;
  public options: { show_title: boolean, show_image: boolean, show_description: boolean, show_date: boolean, show_gallery: boolean };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public loadingCtr: LoadingController,
    public modalCtrl: ModalController,
    public storage: Storage,
    public authService: AuthService,
    public configService: ConfigServiceProvider,
    public itemsService: ItemsServiceProvider
  ) {
    super(navCtrl, navParams, storage, authService, configService);

    this.options = {
      show_title: true,
      show_image: true,
      show_description: true,
      show_date: true,
      show_gallery: false
    };
    if (navParams.get('options')) {
      this.options = navParams.get('options');
    }

    this.item = navParams.get('item');
    this.user = this.authService.getUsr();

    console.log(this.item);
  }

  baseUrl(append: string) {
    if (append.substring(0,7) == 'http://' || append.substring(0,8) == 'https://'){
      return append;
    } else {
      return this.configService.baseUrl() + '/' + append;
    }
  }

  generateThumbnail(image: any) {
    return this.configService.baseUrl() + '/image.php/' + image + '?width=300&height=200&cropratio=3:2&image=' + image;
  }

}
