import { defineStore } from 'pinia';
import api from '@/helpers/axiosConfig'

interface FileUploadForm {
  file: File | null;
  // other fields if necessary
}

export const useFileStore = defineStore('file',{
  state: () => ({
    file: null as unknown,
    isLoading: false,
  }),
  actions: {
    setFile (file: File) {
      this.file = file
    },
    async uploadFile(file: FileUploadForm) {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        api.post('/upload', { file }, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => {
          resolve(res.data)
        })
        .catch(ex => {
          console.error('Failed to upload pdf:', ex)
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
    reset() {
      this.file = null
    }
  }
});
