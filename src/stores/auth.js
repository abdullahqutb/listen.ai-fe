// src/stores/auth.js
import { defineStore } from 'pinia';
import api from '@/helpers/axiosConfig'

export const useAuthStore = defineStore('auth',{
  state: () => ({
    user: {
      email: '',
      name: '',
      surname: '',
    },
    loggedIn: false,
    lastAction: null,
    isLoading: false,
  }),
  actions: {
    setUserDetails (data) {
      this.user.email = data.email
      this.user.name = data.name
      this.user.surname = data.surname
      this.loggedIn = true
    },
    async getUserDetails() {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        api.get('/users/me')
        .then((res) => {
          this.setUserDetails(res.data.me)
          resolve(res.data)
        })
        .catch(ex => {
          // console.error('Failed to get user details:', ex)
          if (ex.response)
            resolve(ex.response.data)
          else {
            resolve({ success: false })
            reject(ex)
          }
        })
        .finally(() => {
          this.isLoading = false
        })
      })
    },
    async login(credentials) {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        api.post(`/users/auth`, credentials)
          .then(async res => {
            // Get user and other details
            await this.getUserDetails()

            resolve(res.data.success)
          })
          .catch(error => {
            this.errorStore.handleError(error)
            reject(error)
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    async register(credentials) {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        api.post(`/users`, credentials)
          .then(async res => {
            // Get user and other details
            await this.getUserDetails()

            resolve(res.data.success)
          })
          .catch(error => {
            this.errorStore.handleError(error)
            reject(error)
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    async forgotPassword(credentials) {
      return new Promise((resolve, reject) => {
        api.post(`/users/forgot`, credentials)
          .then(res => {
            resolve(res.data.success)
          })
          .catch(error => {
            this.errorStore.handleError(error)
            reject(error)
          })
      })
    },
    logout() {
      this.user = {
        email: '',
        name: '',
        surname: '',
      };
      this.loggedIn = false;
    }
  }
});
