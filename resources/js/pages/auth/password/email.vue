<template>
  <div class="flex mt-6">
    <div class="w-full md:w-2/3 md:mx-auto md:max-w-md">
      <card :title="$t('reset_password')">
        <form @submit.prevent="send" @keydown="form.onKeydown($event)">
          <alert-success :form="form" :message="status" class="mb-4"/>

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

          <!-- Submit Button -->
          <v-button class="w-full" :loading="form.busy">
            {{ $t('send_password_reset_link') }}
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
      email: ''
    })
  }),

  methods: {
    async send () {
      const { data } = await this.form.post('/api/password/email')

      this.status = data.status

      this.form.reset()
    }
  }
}
</script>
