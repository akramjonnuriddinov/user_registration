<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center d-block">
            <router-link :to="{ name: 'register' }"
              >Need an account?</router-link
            >
          </p>
          <mcv-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button
              class="btn btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actionTypes } from '@/store/modules/auth'
import McvValidationErrors from '@/components/ValidationErrors.vue'
import { mapState } from 'vuex'

export default {
  name: 'McLogin',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  components: {
    McvValidationErrors,
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.auth.isSubmitting,
      validationErrors: (state) => state.auth.validationErrors,
    }),
    // isSubmitting() {
    //   return this.$store.state.auth.isSubmitting
    // },
    // validationErrors() {
    //   return this.$store.state.auth.validationErrors
    // },
  },
  methods: {
    onSubmit() {
      console.log('login')
      this.$store
        .dispatch(actionTypes.login, {
          email: this.email,
          password: this.password,
        })
        .then((user) => {
          console.log('successfully login user: ', user)
          this.$router.push({ name: 'globalFeed' })
        })
    },
  },
}
</script>
