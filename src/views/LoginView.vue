<template>
  <div class="w-full flex flex-col justify-center items-center self-center my-16">
    <Form
      id="loginForm"
      ref="loginForm"
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

      <label class="mt-4" for="password">PAROLĂ</label>
      <Field
        id="password"
        v-model:model-value="formData.password"
        name="password"
        rules="required|password"
        as="input"
        type="password"
        placeholder="PAROLĂ"
        class="px-4 py-2 border border-gray-400 w-full min-h-[45px]"
      >
      </Field>
      <small class="form-text text-red-400">
        <ErrorMessage name="password" />
      </small>

      <button :disabled="!meta.valid" class="btn btn-primary mt-5" @click.prevent="login">
        Login
      </button>
      <router-link :to="{ name: 'ForgotView' }">
        <button class="w-full btn btn-secondary my-4">Forgot Password?</button>
      </router-link>
      <router-link :to="{ name: 'RegisterView' }">
        <button class="w-full btn btn-primary">Register</button>
      </router-link>
    </Form>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  email: '',
  password: ''
})

const login = async () => {
  await authStore.login(formData.value)
  router.push({ name: 'Home' })
}
</script>
