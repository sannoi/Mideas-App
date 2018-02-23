import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../providers/auth-service';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';

export class ProtectedPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public authService: AuthService,
    public configService: ConfigServiceProvider) {
  }

  ionViewCanEnter() {
    if (this.configService.cfg.extensions.users.active) {
      this.storage.get('id_token').then(id_token => {
        if (id_token === null) {
          this.navCtrl.setRoot(this.configService.cfg.home_not_logged);
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
