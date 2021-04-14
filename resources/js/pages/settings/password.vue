<template>
  <card :title="$t('your_password')">
    <form @submit.prevent="update" @keydown="form.onKeydown($event)">
      <alert-success class="mb-5" :form="form" :message="$t('password_updated')" />

      <!-- Password -->
      <div class="relative mb-6">
        <label for="password" class="text-gray-700">
          {{ $t('password') }}
          <span class="text-red-500 required-dot">*</span>
        </label>
        <input type="password" id="password"
               v-model="form.password" :class="{ 'ring-red-500 ring-2': form.errors.has('password') }"
               class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
               name="password"/>
        <has-error :form="form" field="password"/>
      </div>

      <!-- Password Confirmation-->
      <div class="relative mt-8 mb-6">
        <label for="password_confirmation" class="text-gray-700">
          {{ $t('confirm_password') }}
          <span class="text-red-500 required-dot">*</span>
        </label>
        <input type="password" id="password_confirmation"
               v-model="form.password_confirmation" :class="{ 'ring-red-500 ring-2': form.errors.has('password_confirmation') }"
               class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
               name="password_confirmation"/>
        <has-error :form="form" field="password_confirmation"/>
      </div>

      <!-- Submit Button -->
      <v-button :loading="form.busy" type="success">
        {{ $t('update') }}
      </v-button>

    </form>
  </card>
</template>

<script>
import Form from 'vform'

export default {
  scrollToTop: false,

  metaInfo () {
    return { title: this.$t('settings') }
  },

  data: () => ({
    form: new Form({
      password: '',
      password_confirmation: ''
    })
  }),

  methods: {
    async update () {
      await this.form.patch('/api/settings/password')

      this.form.reset()
    }
  }
}
</script>
