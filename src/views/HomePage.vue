<template>
  <div class="d-flex flex-column" style="min-height: 100%;">
    <v-app-bar outlined class="flex-grow-0" color="white" elevation="1">
      <v-spacer />
      <a class="words--text text-uppercase text-decoration-none" href="https://www.sellsetgo.com/contact/">Support</a>
      <a class="words--text text-uppercase text-decoration-none ml-6" href="https://www.sellsetgo.com">About us</a>
    </v-app-bar>
    <div class="flex-grow-1 d-flex">
      <div class="ma-auto d-flex align-center flex-wrap py-15">
        <div style="flex: 0 0 50%;" class="pr-6">
          <div class="text-h3 font-weight-bold black--text">Welcome to SellSetGo</div>
          <div class="my-4">List and manage your eBay inventory faster and smarter</div>
          <table>
            <tbody>
              <tr v-for="(feature,idx) in features" :key="idx" valign="top">
                <td class="py-1">
                  <v-avatar tile color="#fed7aa" size="40" class="rounded-lg mr-2 mt-1">
                    <v-icon color="primary" size="20">{{ feature.icon }}</v-icon>
                  </v-avatar>
                </td>
                <td class="py-1">
                  <div class="black--text font-weight-bold">{{ feature.title }}</div>
                  <div>{{ feature.subtitle }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="flex: 0 0 50%;" class="pl-6">
          <v-card color="white">
            <v-card-text class="pa-16">
              <div class="d-flex align-center justify-center text-h5 black--text">
                Login with
              </div>
              <div class="text-center text-caption pt-2 pb-4">Sign in securely with your eBay account.</div>
              <v-btn depressed block color="primary" height="45">Sign in with eBay</v-btn>
              <div class="text-center text-caption pt-4 pb-5">Already connected before? Just sign in &mdash; no setup required.</div>
              <div class="d-flex align-center">
                <v-divider />
                <div class="text-uppercase px-2">First-time access only</div>
                <v-divider />
              </div>
              <div class="mt-4 font-weight-bold black--text">New to SellSetGo?</div>
              <div class="text-caption">On your first sign-in, eBay will ask you to approve access so we can:</div>
              <ul class="new_comers pl-1 mt-4">
                <li v-for="(perm,idx) in permissions" :key="'n'+idx">{{ perm }}</li>
              </ul>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default
{
  name: 'HomePage',
  data()
  {
    return {
      session: null,
    };
  },
  computed:
    {
      features()
      {
        return [
          {
            title: 'Lightning Fast Listings',
            subtitle: 'Create and manage eBay listings in seconds'
          },
          {
            title: 'Boost Your Sales',
            subtitle: 'Optimize pricing and track inventory effortlessly'
          },
          {
            title: 'Secure & Reliable',
            subtitle: 'Trusted by many eBay sellers worldwide'
          }
        ];
      },
      permissions()
      {
        return ['Manage your listings', 'Sync inventory and orders', 'Perform actions on your behalf'];
      },
    },
};
</script>

<style lang="scss">
.new_comers
{
  list-style: none;

  li
  {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  li::before
  {
    content: '✓';
    color: var(--v-primary-base);
    padding-right: 8px;
  }
}
</style>
