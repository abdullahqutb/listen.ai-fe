<template>
  <div class="w-full flex flex-col justify-center items-center self-center my-16">
    <Form
      id="forgotForm"
      ref="forgotForm"
      v-slot="{ meta }"
      class="flex flex-col w-3/4 sm:w-1/2 my-8 px-8 md:px-20 lg:px-40 py-12 shadow-2xl"
    >
      <label for="email">E-MAIL</label>
      <Field
        id="email"
        v-model:model-value="formData.email"
        name="email"
        rules="required|email"
        as="input"
        type="email"
        placeholder="Email"
        class="px-4 py-2 border border-gray-400 w-full min-h-[45px]"
      >
      </Field>
      <small class="form-text text-red-400">
        <ErrorMessage name="email" />
      </small>

      <button :disabled="!meta.valid" class="btn btn-primary mt-5" @click.prevent="forgot">
        Enter
      </button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  email: ''
})

const forgot = async () => {
  await authStore.forgotPassword(formData.value)
  router.push({ name: 'Home' })
}
</script>
