<template>
  <div class="flex mt-6">
    <div class="w-full md:w-2/3 md:mx-auto md:max-w-md">
      <card :title="$t('login')">
        <div class="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
          Login To Your Account
        </div>
        <form @submit.prevent="login" @keydown="form.onKeydown($event)">
          <!-- Email -->
          <div class="relative mt-8 mb-6">
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
          <div class="relative mt-8 mb-6">
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

          <!-- Remember Me -->
          <div class="relative flex items-center mt-8 mb-6">
              <checkbox v-model="remember" class="w-full md:w-1/2" name="remember">
                {{ $t('remember_me') }}
              </checkbox>

            <div class="w-full md:w-1/2 text-right">
              <router-link :to="{ name: 'password.request' }" class="text-xs font-thin text-gray-500 sm:text-sm hover:text-gray-700">
                {{ $t('forgot_password') }}
              </router-link>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-md-7 offset-md-3 d-flex">
              <!-- Submit Button -->
              <v-button class="w-full" :loading="form.busy">
                {{ $t('login') }}
              </v-button>

              <!-- GitHub Login Button -->
              <login-with-github/>
            </div>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>

<script>
import Form from 'vform'
import Cookies from 'js-cookie'
import LoginWithGithub from '~/components/LoginWithGithub'

export default {
  components: {
    LoginWithGithub
  },

  middleware: 'guest',

  metaInfo () {
    return { title: this.$t('login') }
  },

  data: () => ({
    form: new Form({
      email: '',
      password: ''
    }),
    remember: false
  }),

  methods: {
    async login () {
      // Submit the form.
      const { data } = await this.form.post('/api/login')

      // Save the token.
      this.$store.dispatch('auth/saveToken', {
        token: data.token,
        remember: this.remember
      })

      // Fetch the user.
      await this.$store.dispatch('auth/fetchUser')

      // Redirect home.
      this.redirect()
    },

    redirect () {
      const intendedUrl = Cookies.get('intended_url')

      if (intendedUrl) {
        Cookies.remove('intended_url')
        this.$router.push({ path: intendedUrl })
      } else {
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>
