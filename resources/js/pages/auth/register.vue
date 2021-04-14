<template>
  <div class="flex mt-6">
    <div class="w-full md:w-2/3 md:mx-auto md:max-w-md">
      <card v-if="mustVerifyEmail" :title="$t('register')">
        <div class="text-green-500">
          {{ $t('verify_email_address') }}
        </div>
      </card>
      <card :title="$t('register')" v-else>
        <form @submit.prevent="register" @keydown="form.onKeydown($event)">
          <!-- Name -->
          <div class="relative mb-6">
            <label for="name" class="text-gray-700">
              {{ $t('name') }}
              <span class="text-red-500 required-dot">*</span>
            </label>
            <input type="text" id="name"
                   v-model="form.name" :class="{ 'ring-red-500 ring-2': form.errors.has('name') }"
                   class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                   name="email"/>
            <has-error :form="form" field="name"/>
          </div>

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
            {{ $t('register') }}
          </v-button>

          <!-- GitHub Register Button -->
          <login-with-github/>

        </form>
      </card>
    </div>
  </div>
</template>

<script>
import Form from 'vform'
import LoginWithGithub from '~/components/LoginWithGithub'

export default {
  components: {
    LoginWithGithub
  },

  middleware: 'guest',

  metaInfo () {
    return { title: this.$t('register') }
  },

  data: () => ({
    form: new Form({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }),
    mustVerifyEmail: false
  }),

  methods: {
    async register () {
      // Register the user.
      const { data } = await this.form.post('/api/register')

      // Must verify email fist.
      if (data.status) {
        this.mustVerifyEmail = true
      } else {
        // Log in the user.
        const { data: { token } } = await this.form.post('/api/login')

        // Save the token.
        this.$store.dispatch('auth/saveToken', { token })

        // Update the user.
        await this.$store.dispatch('auth/updateUser', { user: data })

        // Redirect home.
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>
