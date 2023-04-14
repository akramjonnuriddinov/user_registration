import { createApp } from 'vue'
import { createStore } from 'vuex'

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
})

const app = createApp()
app.use(store)
