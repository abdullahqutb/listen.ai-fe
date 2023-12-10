// src/stores/auth.js
import { defineStore } from 'pinia';
import api from '@/helpers/axiosConfig.js'

export const useAuthStore = defineStore('auth',{
  state: () => ({
    user: {
      username: '' as string,
      email: '' as string,
      name: '' as string,
      surname: '' as string,
    },
    loggedIn: false,
    isLoading: false,
  }),
  actions: {
    setUserDetails(data: { username: string, email: string, first_name: string, last_name: string }) {
      this.user.username = data.username;
      this.user.email = data.email;
      this.user.name = data.first_name;
      this.user.surname = data.last_name;
      this.loggedIn = true;
    },
    async getUserDetails() {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        const token = localStorage.getItem('token')
        api.get('/accounts/current_user/', {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        .then(res => {
          this.setUserDetails(res.data)
          resolve(res.data)
        })
        .catch(ex => {
          console.error('Failed to get user details:', ex)
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
    async login(credentials: object) {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        api.post(`/accounts/login/`, credentials)
          .then(async (res: { data: { token: string } }) => {
            // Set token
            localStorage.setItem('token', res.data.token)

            // Get user and other details
            await this.getUserDetails()

            resolve(res.data)
          })
          .catch((error: object) => {
            // TODO: Handle error
            // this.errorStore.handleError(error)
            console.error('Failed to login:', error)
            reject(error)
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    async register(credentials: object) {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        api.post(`/accounts/register/`, credentials)
          .then(async (res: { data: { success: string } }) => {
            resolve(res.data.success)
          })
          .catch(error => {
            // TODO: Handle error
            // this.errorStore.handleError(error)
            console.error('Failed to register:', error)
            reject(error)
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    async forgotPassword(credentials: object) {
      return new Promise((resolve, reject) => {
        api.post(`/users/forgot`, credentials)
          .then(res => {
            resolve(res.data.success)
          })
          .catch(error => {
            // TODO: Handle error
            // this.errorStore.handleError(error)
            reject(error)
          })
      })
    },
    logout() {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        const token = localStorage.getItem('token')
        api.get(`/accounts/logout/`, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
          .then(res => {
            this.user = {
              username: '',
              email: '',
              name: '',
              surname: '',
            };
            this.loggedIn = false;
            localStorage.removeItem('token');
            resolve(res.data)
          })
          .catch(error => {
            console.error('Failed to logout:', error)
          })
      })
    }
  }
});
