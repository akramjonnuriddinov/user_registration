<template>
  <div id="app">
    <mc-header />
    <router-view></router-view>
  </div>
</template>

<script>
import McHeader from '@/components/Header.vue'
import { actionTypes } from './store/modules/auth'

export default {
  name: 'App',
  components: {
    McHeader,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser)
  },
}
</script>
