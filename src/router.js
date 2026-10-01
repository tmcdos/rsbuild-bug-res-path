import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/HomePage.vue';
import BadRoute from './views/BadRoute.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:
        {
          name: 'login'
        }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:
        {
          public: true,
          title: 'Login'
        }
    },

    {
      path: '*', // should be last, otherwise matches everything
      component: BadRoute,
      meta:
        {
          title: 'Page not found',
          public: true
        }
    }
  ],
});


// https://stackoverflow.com/a/63263736 - ignore NavigationDuplicated errors but keep other errors
const originalPush = router.push;
router.push = function push(location, onResolve, onReject)
{
  if (onResolve || onReject)
  {
    return originalPush.call(this, location, onResolve, onReject);
  }

  return originalPush.call(this, location).catch((err) =>
  {
    if (err && err.name === 'NavigationDuplicated')
    {
      return err;
    }

    return Promise.reject(err);
  });
};

export default router;
