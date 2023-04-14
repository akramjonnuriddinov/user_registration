import authApi from '@/api/auth'
import { setItem } from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
}

export const mutationTypes = {
  // register
  registerStart: '[auth] registerStart',
  registerFailure: '[auth] registerFailure',
  registerSuccess: '[auth] registerSuccess',

  // login
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  // getCurrentUser
  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
}

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous',
}

const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser
  },
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn)
  },
  [getterTypes.isAnonymous]: (state) => {
    return state.isLoggedIn === false
  },
}

const mutations = {
  // register
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.registerFailure](state, error) {
    state.isSubmitting = false
    state.validationErrors = error
  },

  // login
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false
    state.isLoggedIn = true
    state.currentUser = payload
  },
  [mutationTypes.loginFailure](state, error) {
    state.isSubmitting = false
    state.validationErrors = error
  },

  // getCurrentUser
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false
    state.currentUser = null
    state.isLoggedIn = false
  },
}

const actions = {
  // register actions
  [actionTypes.register]({ commit }, credentials) {
    return new Promise((resolve) => {
      commit(mutationTypes.registerStart)
      authApi
        .register(credentials)
        .then(({ data }) => {
          commit(mutationTypes.registerSuccess, data.user)
          setItem('accessToken', data.user.token)
          resolve(data.user)
        })
        .catch((error) => {
          commit(mutationTypes.registerFailure, error.response.data.errors)
        })
    })
  },
  // login actions
  [actionTypes.login]({ commit }, credentials) {
    return new Promise((resolve) => {
      commit(mutationTypes.loginStart)
      authApi
        .login(credentials)
        .then(({ data }) => {
          commit(mutationTypes.loginSuccess, data.user)
          setItem('accessToken', data.user.token)
          resolve(data.user)
        })
        .catch(({ response }) => {
          commit(mutationTypes.loginFailure, response.data.errors)
        })
    })
  },

  // getCurrentUser
  [actionTypes.getCurrentUser]({ commit }) {
    return new Promise((resolve) => {
      commit(mutationTypes.getCurrentUserStart)
      authApi
        .getCurrentUser()
        .then((response) => {
          commit(mutationTypes.getCurrentUserSuccess, response.data.user)
          resolve(response.data.user)
        })
        .catch(() => {
          commit(mutationTypes.getCurrentUserFailure)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
