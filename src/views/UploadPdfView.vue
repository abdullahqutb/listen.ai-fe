<template>
  <div class="w-full flex flex-col justify-center items-center self-center my-16">
    <Form
      id="pdfForm"
      ref="pdfForm"
      v-slot="{ meta }"
      class="flex flex-col w-3/4 sm:w-1/2 my-8 px-8 md:px-20 lg:px-40 py-12 shadow-2xl"
    >
      <label for="email">PDF File</label>
      <Field
        id="file"
        v-model:model-value="formData.file"
        name="file"
        rules="required"
        as="input"
        type="file"
        placeholder="PDF File"
        class="px-4 py-2 border border-gray-400 w-full min-h-[45px]"
      >
      </Field>
      <small class="form-text text-red-400">
        <ErrorMessage name="file" />
      </small>

      <button :disabled="!meta.valid" class="btn btn-primary mt-5" @click.prevent="uploadFile">
        Upload
      </button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { useFileStore } from '@/stores/file'
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
// import { useRouter } from 'vue-router'

// const router = useRouter()
const fileStore = useFileStore()

interface FileUploadForm {
  file: File | null;
  // other fields if necessary
}

const formData = ref<FileUploadForm>({
  file: null
})

const uploadFile = async () => {
  const res = await fileStore.uploadFile(formData.value)
  console.log("Res: ", res)
}
</script>
