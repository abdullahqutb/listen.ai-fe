<template>
  <div
    class="w-full flex flex-col justify-center items-center self-center my-16"
  >
    <Form
      id="registerForm"
      ref="registerForm"
      v-slot="{ meta }"
      class="flex flex-col w-3/4 sm:w-1/2 my-8 px-8 md:px-20 lg:px-40 py-12 shadow-2xl"
    >
      <h1 class="text-5xl text-center mb-8">
        Register
      </h1>
      <label for="email">First Name</label>
      <Field
        id="name"
        v-model:model-value="formData.first_name"
        name="name"
        rules="required|name"
        as="input"
        placeholder="First Name"
        class="px-4 py-2 border border-gray-400 w-full min-h-[45px]"
      >
      </Field>
      <small class="form-text text-red-400">
        <ErrorMessage name="name" />
      </small>
      
      <label class="mt-4" for="surname">Last Name</label>
      <Field
        id="surname"
        v-model:model-value="formData.last_name"
        name="surname"
        rules="required|name"
        as="input"
        placeholder="Last Name"
        class="px-4 py-2 border border-gray-400 w-full min-h-[45px]"
      >
      </Field>
      <small class="form-text text-red-400">
        <ErrorMessage name="surname" />
      </small>

      <label class="mt-4" for="email">E-MAIL</label>
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

      <label class="mt-4" for="username">Username</label>
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
      
      <label class="mt-4" for="password">Password</label>
      <Field
        id="password"
        v-model:model-value="formData.password"
        name="password"
        rules="required|password"
        as="input"
        type="password"
        placeholder="Password"
        class="px-4 py-2 border border-gray-400 w-full min-h-[45px]"
      >
      </Field>
      <small class="form-text text-red-400">
        <ErrorMessage name="password" />
      </small>
      <button
        class="btn btn-primary my-4"
        @click.prevent="register"
        :disabled="!meta.valid"
      >
        Register
      </button>
      <p>
        Already have an account?
      </p>
      <router-link :to="{ name: 'LoginView' }">
        <button class="w-full btn btn-secondary mt-2 my-4">Login</button>
      </router-link>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Form, Field, ErrorMessage } from 'vee-validate'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  username: '',
  email: '',
  password: '',
  first_name: '',
  last_name: '',
})

const register = async () => {
  await authStore.register(formData.value)
  router.push({ name: 'LoginView' })
}

</script>
