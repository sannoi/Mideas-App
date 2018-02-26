export let menu = {
  pages: [
    { title: 'page.profile', icon: 'desktop', component: 'ProfilePage', index: 0, nav_params: { pageTitle: 'page.profile' } },    
    {
      title: 'Blog', icon: 'chatboxes', extension: 'articles', type: 'list', index: 1, nav_params: {
        pageTitle: 'Artículos',
        category: 2,
        order: 'fecha',
        orderDir: 'DESC',
        listOptions: { show_title: true, show_image: true, image_type: 'thumbnail', show_description: true, show_date: true },
        detailOptions: { show_title: true, show_image: true, show_description: true, show_gallery: true }
      }
    },
    {
      title: 'Multimedia', icon: 'chatboxes', extension: 'articles', type: 'list', index: 2, nav_params: {
        pageTitle: 'Multimedia',
        category: 3,
        order: 'titulo',
        orderDir: 'ASC',
        detailOptions: { show_title: true, show_image: true, show_description: true, show_gallery: true }
      }
    },
    { title: 'page.settings', icon: 'cog', component: 'SettingsListPage', index: 3, nav_params: { pageTitle: 'page.settings' } },
    { title: 'page.logout', icon: 'exit', component: 'WelcomePage', method: 'logout' }
  ]
};
