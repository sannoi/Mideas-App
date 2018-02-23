export let tabs = [
  {
    title: 'Escritorio', icon: 'desktop', component: 'ProfilePage', nav_params: {
      pageTitle: 'page.profile'
    }
  },
  {
    title: 'Blog', icon: 'chatboxes', extension: 'articles', type: 'list', nav_params: {
      pageTitle: 'Artículos',
      category: 2,
      order: 'fecha',
      orderDir: 'DESC',
      listOptions: { show_title: true, show_image: true, image_type: 'thumbnail', show_description: true, show_date: true },
      detailOptions: { show_title: true, show_image: true, show_description: true, show_gallery: true }
    }
  },
  {
    title: 'Multimedia', icon: 'images', extension: 'articles', type: 'list', nav_params: {
      pageTitle: 'Multimedia',
      category: 3,
      order: 'titulo',
      orderDir: 'ASC',
      detailOptions: { show_title: true, show_image: true, show_description: true, show_gallery: true }
    }
  },
  { title: 'Configuración', icon: 'cog', component: 'SettingsListPage', nav_params: { pageTitle: 'page.settings' } }
];
