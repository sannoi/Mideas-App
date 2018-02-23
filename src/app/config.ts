export let cfg = {
  baseUrl: 'https://lastmile.mideas.es',
  apiUrl: 'https://lastmile.mideas.es/api',
  configUrl: '/sistema/general/config.json',
  tokenName: 'token',
  home_not_logged: 'WelcomePage',
  home_logged: 'ProfilePage',
  sites: [
    {
      name: 'Vagos Permanentes',
      baseUrl: 'https://www.vagospermanentes.com',
      apiUrl: 'https://www.vagospermanentes.com/api',
      color: 'rgb(67, 167, 255)',
      logo: 'assets/img/booboo_ico.png',
      theme: 'blue-theme'
    },
    {
      name: 'Last Mile',
      baseUrl: 'https://lastmile.mideas.es',
      apiUrl: 'https://lastmile.mideas.es/api',
      color: 'rgb(67, 167, 255)',
      logo: 'assets/img/booboo_ico.png',
      theme: 'blue-theme'
    },
    {
      name: 'Red de Optimización',
      baseUrl: 'https://www.booboo.eu',
      apiUrl: 'https://www.booboo.eu/api',
      color: 'rgb(255, 139, 187)',
      logo: 'assets/img/booboo_ico.png',
      theme: 'pink-theme'
    }
  ],
  extensions: {
    users: {
      active: false,
      provider: 'usersService',
      list: {
        use: true,
        component: 'DriversPage'
      },
      item_detail: {
        use: false
      },
      endpoints: {
        register: '/apps/Mideas/register.json',
        login: '/apps/Mideas/login.json',
        logout: '/apps/Mideas/logout.json',
        formToken: '/apps/Mideas/formToken.json',
        refresh: '/apps/Mideas/login.json',
        list: '/usuarios/usuario/buscar.json',
        info: '/usuarios/usuario/##ID##/info.json',
        geolocation: '/usuarios/usuario/saveGeolocation.json',
        save_firebase_token: '/usuarios/usuario/saveFirebaseToken.json',
        clear_firebase_token: '/usuarios/usuario/clearFirebaseToken.json'
      }
    },
    articles: {
      active: true,
      provider: 'itemsService',
      list: {
        use: true,
        max_items: 20,
        component: 'ListPage'
      },
      item_detail: {
        use: true,
        component: 'ItemInfoPage'
      },
      endpoints: {
        list: '/articulos/articulo/buscar.json',
        info: '/articulos/articulo/##ID##/info.json'
      }
    },
    messages: {
      active: true,
      provider: 'messagesService',
      list: {
        use: true,
        max_items: 10,
        component: 'MessagesPage'
      },
      item_detail: {
        use: true,
        component: 'MessagesInfoPage'
      },
      endpoints: {
        list: '/mensajes/mensaje/buscar.json',
        info: '/mensajes/mensaje/##ID##/info.json',
        response: '/mensajes/mensaje/nuevo.json',
        readed: '/mensajes/mensaje/mensajeLeido.json',
        checkNews: '/mensajes/mensaje/nuevosMensajes.json'
      }
    },
    orders: {
      active: true,
      provider: 'ordersService',
      list: {
        use: true,
        component: 'ListMasterPage'
      },
      item_detail: {
        use: true,
        component: 'OrderInfoPage'
      },
      endpoints: {
        list: '/shop/pedido/buscar.json',
        assign: '/shop/pedido/asociarProveedor.json',
        pickup: '/shop/pedido/recogerPedidoConductor.json',
        store: '/shop/pedido/almacenarPedidoConductor.json',
        complete: '/shop/pedido/completarPedidoConductor.json',
        add_document: '/shop/pedido/addDocumentOrder.json',
        info: '/shop/pedido/##ID##/info.json'
      }
    },
    geolocation: {
      active: true,
      provider: 'locationService',
      list: {
        use: false
      },
      item_detail: {
        use: false
      }
    },
    notifications: {
      active: true,
      provider: 'notificationsService',
      list: {
        use: false
      },
      item_detail: {
        use: false
      }
    }
  },
  config_settings: {
    app: {
      geolocation: 'off',
      notifications: 'off'
    }
  },
  min_level_access_user: 2,
  system: {
    upload: '/sistema/archivo/upload.json'
  },
  user: {
    register: '/apps/Mideas/register.json',
    login: '/apps/Mideas/login.json',
    logout: '/apps/Mideas/logout.json',
    formToken: '/apps/Mideas/formToken.json',
    refresh: '/apps/Mideas/login.json',
    list: '/usuarios/usuario/buscar.json',
    info: '/usuarios/usuario/##ID##/info.json',
    geolocation: '/usuarios/usuario/saveGeolocation.json',
    save_firebase_token: '/usuarios/usuario/saveFirebaseToken.json',
    clear_firebase_token: '/usuarios/usuario/clearFirebaseToken.json'
  },
  orders: {
    list: '/shop/pedido/buscar.json',
    assign: '/shop/pedido/asociarProveedor.json',
    pickup: '/shop/pedido/recogerPedidoConductor.json',
    store: '/shop/pedido/almacenarPedidoConductor.json',
    complete: '/shop/pedido/completarPedidoConductor.json',
    add_document: '/shop/pedido/addDocumentOrder.json',
    info: '/shop/pedido/##ID##/info.json'
  },
  messages: {
    list: '/mensajes/mensaje/buscar.json',
    info: '/mensajes/mensaje/##ID##/info.json',
    response: '/mensajes/mensaje/nuevo.json',
    readed: '/mensajes/mensaje/mensajeLeido.json',
    checkNews: '/mensajes/mensaje/nuevosMensajes.json'
  }
};
