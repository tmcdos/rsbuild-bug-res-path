<template>
  <v-app>
    <v-app-bar app clipped-left color="#EEE" height="40" elevation="1">
      <div class="font-weight-semibold" :style="{paddingLeft: $vuetify.application.left + 'px'}">Testing</div>
      <v-spacer class="d-flex justify-center align-center" />
    </v-app-bar>

    <v-main :route="$route.name">
      <router-view :key="refresh" />
    </v-main>

    <DialogConfirm v-model="confirmLogout">
      Do you really want to log out?
    </DialogConfirm>

    <v-footer padless color="white" class="justify-center" style="box-shadow: 0 0 0px 1px #CCC;">
      <div class="text-body-2">&copy; 2022 &ndash; {{ new Date().getFullYear() }}, Ver. {{ $root.appVersion }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import DialogConfirm from './components/DialogConfirm.vue';

export default
{
  name: 'App',
  components:
    {
      DialogConfirm,
    },
  data()
  {
    return {
      refresh: 0,
      confirmLogout: false,
    };
  },
};
</script>
