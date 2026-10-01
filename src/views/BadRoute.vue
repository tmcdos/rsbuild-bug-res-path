<template>
  <div class="bad_route d-flex full-width">
    <div class="ma-auto text-center">
      <h1>Page not found</h1>
      <p class="pt-5 pb-3">This URL is wrong or from an older version of the application.</p>
      <v-btn color="primary" :to="{name: 'dashboard'}">Go Home</v-btn>
    </div>
  </div>
</template>

<style lang="scss">
  .bad_route
  {
    min-height: 100%;
    line-height: 1.5;
    color: #888;

    h1
    {
      color: #555;
      font-size: 2em;
      font-weight: 400;
    }

    p
    {
      line-height: 1.2;
    }
  }
</style>
