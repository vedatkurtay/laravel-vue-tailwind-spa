<template>
  <card :title="$t('your_info')">
    <form @submit.prevent="update" @keydown="form.onKeydown($event)">
      <alert-success class="mb-5" :form="form" :message="$t('info_updated')"/>

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

      <!-- Submit Button -->
      <v-button :loading="form.busy" type="success">
        {{ $t('update') }}
      </v-button>

    </form>
  </card>
</template>

<script>
import Form from 'vform'
import { mapGetters } from 'vuex'

export default {
  scrollToTop: false,

  metaInfo () {
    return { title: this.$t('settings') }
  },

  data: () => ({
    form: new Form({
      name: '',
      email: ''
    })
  }),

  computed: mapGetters({
    user: 'auth/user'
  }),

  created () {
    // Fill the form with user data.
    this.form.keys().forEach(key => {
      this.form[key] = this.user[key]
    })
  },

  methods: {
    async update () {
      const { data } = await this.form.patch('/api/settings/profile')

      this.$store.dispatch('auth/updateUser', { user: data })
    }
  }
}
</script>
