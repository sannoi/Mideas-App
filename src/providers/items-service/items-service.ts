import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ConfigServiceProvider } from '../config-service/config-service';

@Injectable()
export class ItemsServiceProvider {
  public extension: any;
  public config: { max_items: number };
  public items: Array<any>;

  constructor(
    public authHttp: AuthHttp,
    public configService: ConfigServiceProvider
  ) { this.config = { max_items: 10 }; }

  public initialize(extension: any) {
    this.extension = extension;
    this.config.max_items = this.extension.list.max_items;
    console.log("Items service initialized!");
    console.log(this.extension);

    return new Promise<boolean>((resolve, reject) => {
      resolve(false);
    });
  }

  getAll(page?: any, order?: any, orderDir?: any, category?: any) {
    if (!page) {
      page = 1;
    }
    if (!order) {
      order = 'id';
    }
    if (!orderDir) {
      orderDir = 'DESC';
    }
    var _def = 'q=&orden='+order+'&ordenDir='+orderDir+'&page='+page+'&resultados='+this.config.max_items+'&categoria='+category;
    return this.authHttp.get(this.configService.apiUrl() + this.extension.endpoints.list + '/?' + _def)
      .toPromise()
      .then(rs => {
        return rs.json();
      });
  }

  getOne(id: number) {
    var infoUrl = this.extension.endpoints.info;
    var parsedUrl = infoUrl.replace('##ID##', id);
    return this.authHttp.get(this.configService.apiUrl() + parsedUrl)
      .toPromise()
      .then(rs => {
        return rs.json();
      });
  }

}
