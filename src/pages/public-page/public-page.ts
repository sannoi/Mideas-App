import {NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ConfigServiceProvider} from '../../providers/config-service/config-service';

export class PublicPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public configService: ConfigServiceProvider) {
  }

  ionViewCanEnter() {
    if (this.configService.cfg.extensions.users.active) {
      this.storage.get('id_token').then(id_token => {
        if (id_token !== null) {
          this.navCtrl.setRoot(this.configService.cfg.home_logged);
          return false;
        } else {
          return true;
        }
      });
    } else {
      return true;
    }
  }
}
