<template>
  <div class="w-full flex flex-col justify-center items-center self-center my-16">
    <Form
      id="loginForm"
      ref="loginForm"
      v-slot="{ meta: { valid } }"
      class="flex flex-col w-3/4 sm:w-1/2 my-8 px-8 md:px-20 lg:px-40 py-12 shadow-2xl"
    >
      <label for="username">Username</label>
      <Field
        id="username"
        v-model:model-value="formData.username"
        name="username"
        rules="required"
        as="input"
        placeholder="Username"
        class="px-4 py-2 border border-gray-400 w-full min-h-[45px]"
      >
      </Field>
      <small class="form-text text-red-400">
        <ErrorMessage name="username" />
      </small>

      <label class="mt-4" for="password">PAROLĂ</label>
      <Field
        id="password"
        v-model:model-value="formData.password"
        name="password"
        rules="required"
        as="input"
        type="password"
        placeholder="PAROLĂ"
        class="px-4 py-2 border border-gray-400 w-full min-h-[45px]"
      >
      </Field>
      <small class="form-text text-red-400">
        <ErrorMessage name="password" />
      </small>

      <button class="btn btn-primary mt-5" @click.prevent="login">
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

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

interface LoginForm {
  username: string;
  password: string;
}

const formData = ref<LoginForm>({
  username: '',
  password: ''
});

const login = async () => {
  await authStore.login(formData.value)
  router.push({ name: 'HomeView' })
}
</script>
