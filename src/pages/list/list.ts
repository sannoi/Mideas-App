import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { ProtectedPage } from '../protected-page/protected-page';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../providers/auth-service';
import { ItemsServiceProvider } from '../../providers/items-service/items-service';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage extends ProtectedPage {
  public extension: any;
  public items: any;
  public autoOpenItem: any;
  public customTitle: string;
  public loading: any;
  public dataLoaded: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public loadingCtr: LoadingController,
    public modalCtrl: ModalController,
    public storage: Storage,
    public authService: AuthService,
    public itemsService: ItemsServiceProvider,
    public configService: ConfigServiceProvider
  ) {
    super(navCtrl, navParams, storage, authService, configService);

    this.dataLoaded = false;
    this.extension = navParams.get('extension');
    this.customTitle = navParams.get('pageTitle');
    this.autoOpenItem = navParams.get('autoOpenItem');

    this.loadItems();
  }

  ionViewDidLoad() {

  }

  loadItems() {
    if (this.extension && this[this.extension.provider]) {
      let aoi = this.autoOpenItem;
      if (aoi) {
        this.autoOpenItem = null;
      }
      this[this.extension.provider].initialize(this.extension).then(res => {
        this[this.extension.provider].getAll(1).then((items) => {
          this.items = items;
          this.dataLoaded = true;
          if (aoi) {
            let item = this.items.find(function(x) {
              return x.id == aoi;
            });
            if (item) {
              this.itemInfo(item);
            } else {
              alert(JSON.stringify(item));
            }
          }
        });
      });
    }
  }

  itemInfo(item: any) {
    console.log(item);
  }

  removeHTMLTags(txt: string) {
    return txt ? String(txt).replace(/<[^>]+>/gm, '') : '';
  }

  parseTwitterDate(time: string) {
    var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
      diff = (((new Date()).getTime() - date.getTime()) / 1000),
      day_diff = Math.floor(diff / 86400);

    if (isNaN(day_diff) || day_diff < 0/* || day_diff >= 31*/)
      return;

    if (day_diff >= 31) {
      var monthNames = [
        "ene", "feb", "mar",
        "abr", "may", "jun", "jul",
        "ago", "sep", "oct",
        "nov", "dic"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
    return day_diff == 0 && (
      diff < 60 && "ahora mismo" ||
      diff < 120 && "hace 1 minuto" ||
      diff < 3600 && "hace " + Math.floor(diff / 60) + " minutos" ||
      diff < 7200 && "hace 1 hora" ||
      diff < 86400 && "hace " + Math.floor(diff / 3600) + " horas") ||
      day_diff == 1 && "ayer" ||
      day_diff < 7 && "hace " + day_diff + " días" ||
      day_diff < 31 && "hace " + Math.ceil(day_diff / 7) + " semanas";
  }
}
