import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthHttp } from 'angular2-jwt';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ConfigServiceProvider } from '../config-service/config-service';
import { AuthService } from '../auth-service';
import { ItemModel } from '../../models/item.model';

@Injectable()
export class ItemsServiceProvider {
  public extension: any;
  public config: { source: string, max_items: number };
  public items: Array<any>;

  constructor(
    public authHttp: AuthHttp,
    public storage: Storage,
    public authService: AuthService,
    public configService: ConfigServiceProvider
  ) { this.config = { source: 'remote', max_items: 10 }; }

  public initialize(extension: any) {
    this.extension = extension;
    this.config.max_items = this.extension.list.max_items;
    if (this.extension.list.source) {
      this.config.source = this.extension.list.source;
    }
    console.log("Items service initialized!");
    console.log(this.extension);

    return new Promise<boolean>((resolve, reject) => {
      resolve(false);
    });
  }

  getAll(page?: any, order?: any, orderDir?: any, category?: any, onlyFromActiveUser?: any) {
    if (!page) {
      page = 1;
    }
    if (!order) {
      order = 'id';
    }
    if (!orderDir) {
      orderDir = 'DESC';
    }
    if (!onlyFromActiveUser) {
      onlyFromActiveUser = 0;
    }
    if (this.config.source == 'remote') {
      var _def = 'q=&orden=' + order + '&ordenDir=' + orderDir + '&page=' + page + '&resultados=' + this.config.max_items + '&categoria=' + category + '&solo_usuario_activo=' + onlyFromActiveUser;
      return this.authHttp.get(this.configService.apiUrl() + this.extension.endpoints.list + '/?' + _def)
        .toPromise()
        .then(rs => {
          return rs.json();
        });
    } else {
      return this.storage.get("items-" + this.extension.id).then(items => {
        var filtered = [];
        if (items) {
          if (orderDir == 'ASC') {
            items.sort(function(a, b) { return (a[order] > b[order]) ? 1 : ((b[order] > a[order]) ? -1 : 0); });
          } else {
            items.sort(function(a, b) { return (a[order] < b[order]) ? 1 : ((b[order] < a[order]) ? -1 : 0); });
          }
          if (onlyFromActiveUser == 1 && this.authService.idToken) {
            items = items.filter(function(x) {
              return x.propietario == this.authService.getUsr().id;
            });
          }
          if (category) {
            items = items.filter(function(x) {
              return x.categorias.indexOf(category) > -1;
            });
          }
          var init = (page - 1) * this.config.max_items;
          filtered = items.slice(init, this.config.max_items - 1);
        } else {
          items = [];
        }
        return { total_items: filtered.length, total_pages: parseInt((items.length / this.config.max_items).toString()), resultados: filtered };
      });
    }
  }
  getOne(id: any) {
    if (this.config.source == 'remote') {
      var infoUrl = this.extension.endpoints.info;
      var parsedUrl = infoUrl.replace('##ID##', id);
      return this.authHttp.get(this.configService.apiUrl() + parsedUrl)
        .toPromise()
        .then(rs => {
          return rs.json();
        });
    } else {
      return this.storage.get("items-" + this.extension.id).then(items => {
        if (items) {
          let item = items.find(function(x){
            return x.id == id;
          });
          return item;
        } else {
          return null;
        }
      });
    }
  }
}
