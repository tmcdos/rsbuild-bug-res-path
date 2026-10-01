import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  breakpoint:
    {
      mobileBreakpoint: 960,
    },
  theme:
    {
      options:
      {
        customProperties: true,
        //variations: false,
      },
      themes:
        {
          light:
            {
              tips: '#FEFEE0',
              words: '#506080',
              primary: '#EF6C00',
              secondary: '#172B4D',
              dark: '#212529',
            },
        }
    }
});
