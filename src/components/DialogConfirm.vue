<template>
  <v-dialog v-model="show" scrollable v-bind="$attrs" @input="show = false">
    <v-form ref="frm" @submit.prevent="submitForm">
      <v-card>
        <v-card-title class="text-h6 py-2 primary white--text">{{ caption }}</v-card-title>
        <v-card-text class="pt-4">
          <slot />
        </v-card-text>
        <v-card-actions class="justify-center py-3">
          <v-btn class="mr-3 px-4" type="submit" :color="danger ? 'error' : 'primary'">{{ yesTitle }}</v-btn>
          <v-btn outlined color="secondary" class="ml-3 px-4" @click="show = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default
{
  name: 'DialogConfirm',
  inheritAttrs: false,
  props:
    {
      value:
        {
          type: Boolean,
          default: false
        },
      caption:
        {
          type: String,
          default: 'Confirmation'
        },
      yesTitle:
        {
          type: String,
          default: 'OK'
        },
      danger:
        {
          type: Boolean,
          default: false
        },
    },
  computed:
    {
      show:
        {
          get()
          {
            return this.value;
          },
          set(val)
          {
            this.$emit('input', val);
          }
        }
    },
  methods:
    {
      submitForm()
      {
        if (this.$refs.frm.validate())
        {
          this.$emit('confirm');
          this.show = false;
        }
      }
    }
};
</script>
