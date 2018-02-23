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
  public order: any;
  public orderDir: any;
  public category: any;
  public page: any;
  public totalPages: any;
  public totalItems: any;
  public items: any;
  public listOptions: { show_title: boolean, show_image: boolean, image_type: string, show_description: boolean, show_date: boolean };
  public detailOptions: { show_title: boolean, show_image: boolean, show_description: boolean, show_date: boolean, show_gallery: boolean };
  public autoOpenItem: any;
  public customItemDetail: any;
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

    this.listOptions = {
      show_title: true,
      show_image: true,
      image_type: 'avatar',
      show_description: true,
      show_date: true
    };

    this.detailOptions = {
      show_title: true,
      show_image: true,
      show_description: true,
      show_date: true,
      show_gallery: false
    };

    if (navParams.get('listOptions')) {
      this.listOptions = navParams.get('listOptions');
    }
    if (navParams.get('detailOptions')) {
      this.detailOptions = navParams.get('detailOptions');
    }

    this.page = 1;
    if (navParams.get('page')) {
      this.page = navParams.get('page');
    }

    this.dataLoaded = false;
    this.extension = navParams.get('extension');
    this.customTitle = navParams.get('pageTitle');
    this.customItemDetail = navParams.get('itemDetail');
    this.autoOpenItem = navParams.get('autoOpenItem');
    this.order = navParams.get('order');
    this.orderDir = navParams.get('orderDir');
    this.category = navParams.get('category');

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
        this[this.extension.provider].getAll(this.page, this.order, this.orderDir, this.category).then((result) => {
          this.totalItems = result.total_resultados;
          this.totalPages = result.total_paginas;
          let newItems = [];
          for (let i = 0; i < result.resultados.length; i++) {
            let item = this.prepareItem(result.resultados[i]);
            newItems.push(item);
          }
          this.items = newItems;

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

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    setTimeout(() => {
      this[this.extension.provider].initialize(this.extension).then(res => {
        this[this.extension.provider].getAll(this.page, this.order, this.orderDir, this.category).then((result) => {
          this.totalItems = result.total_resultados;
          this.totalPages = result.total_paginas;
          for (let i = 0; i < result.resultados.length; i++) {
            let item = this.prepareItem(result.resultados[i]);
            this.items.push(item);
          }
          this.dataLoaded = true;
        });
      });

      infiniteScroll.complete();
    }, 1000);
  }

  prepareItem(item: any) {
    if (item && item.params && !item.parametros) {
      item.parametros = JSON.parse(item.params);
      if (item.parametros.galeria && typeof(item.parametros.galeria) === 'object') {
        var galeria = Object.keys(item.parametros.galeria).map(function(k) {
          return item.parametros.galeria[k]
        });
        item.parametros.galeria = galeria;
      }
      console.log(item.parametros);
    }
    return item;
  }

  itemInfo(item: any) {
    if (this.extension.item_detail.use && this.extension.item_detail.component) {
      let detailComponent = this.extension.item_detail.component;
      if (this.customItemDetail) {
        detailComponent = this.customItemDetail;
      }
      this.navCtrl.push(detailComponent, { item: item, options: this.detailOptions });
    }
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
