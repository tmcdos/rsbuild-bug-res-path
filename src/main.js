import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import vuetify from './vuetify.js';
import pkg from '../package.json';

window.ssgo = new Vue({
  name: 'RootVue',
  computed:
    {
      baseURL() // eslint-disable-line vue/no-unused-properties
      {
        return process.env.BASE_URL;
      },
      appVersion() // eslint-disable-line vue/no-unused-properties
      {
        const buildTime = new Date(process.env.BUILD_TIME);
        return pkg.version + ' (' + buildTime.toLocaleString('en', {
          year: 'numeric',
          day: 'numeric',
          month: 'short',
          hour: 'numeric',
          minute: 'numeric',
        }) + ')';
      },
    },
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
