<template>
  <div class="flex mt-6">
    <div class="w-full md:w-2/3 md:mx-auto md:max-w-md">
      <card :title="$t('reset_password')">
        <form @submit.prevent="reset" @keydown="form.onKeydown($event)">
          <alert-success class="mb-4" :form="form" :message="status" />

          <!-- Email -->
          <div class="relative mb-6">
            <label for="email" class="text-gray-700">
              {{ $t('email') }}
              <span class="text-red-500 required-dot">*</span>
            </label>
            <input type="text" id="email"
                   v-model="form.email" :class="{ 'ring-red-500 ring-2': form.errors.has('email') }"
                   class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                   name="email"/>
            <has-error :form="form" field="email"/>
          </div>

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
                   v-model="form.password_confirmation"
                   :class="{ 'ring-red-500 ring-2': form.errors.has('password_confirmation') }"
                   class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                   name="password_confirmation"/>
            <has-error :form="form" field="password_confirmation"/>
          </div>

          <!-- Submit Button -->
          <v-button class="w-full" :loading="form.busy">
            {{ $t('reset_password') }}
          </v-button>

        </form>
      </card>
    </div>
  </div>
</template>

<script>
import Form from 'vform'

export default {
  middleware: 'guest',

  metaInfo () {
    return { title: this.$t('reset_password') }
  },

  data: () => ({
    status: '',
    form: new Form({
      token: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
  }),

  created () {
    this.form.email = this.$route.query.email
    this.form.token = this.$route.params.token
  },

  methods: {
    async reset () {
      const { data } = await this.form.post('/api/password/reset')

      this.status = data.status

      this.form.reset()
    }
  }
}
</script>
