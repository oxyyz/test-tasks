<template>
  <div class="w-full max-w-[512px]">
    <input
      type="file"
      multiple
      @change="handleFileChange"
      class="hidden"
      ref="fileInput"
    />
    <div
      @click="triggerFileInput"
      class="border border-1 border-gray-200 py-4 px-6 rounded-xl flex flex-col gap-3 items-center justify-center transition-colors duration-300 hover:border-purple-500 cursor-pointer mb-4"
    >
      <div
        class="size-10 flex items-center justify-center border border-[#EAECF0] rounded-lg"
      >
        <CloudArrowUpIcon class="size-5 text-zinc-800" />
      </div>
      <div class="flex flex-col justify-center items-center w-full text-center">
        <p class="text-sm text-zinc-800">
          <span class="text-[#6941C6] font-medium">Click or upload</span> or
          drag and drop
        </p>
        <p class="text-zinc-800 text-xs">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </p>
      </div>
    </div>
    <div>
      <ul class="flex flex-col gap-3">
        <li
          v-for="(upload, index) in uploads"
          :key="index"
          class="p-4 rounded-lg border border-gray-200 relative"
        >
          <div class="flex items-start gap-3">
            <div>
              <DocumentTextIcon class="size-5 text-gray-400" />
            </div>
            <div>
              <p class="text-zinc-800 text-sm">
                {{ upload.name }}
              </p>
              <p class="text-zinc-700 text-xs">{{ upload.size }}</p>
            </div>
          </div>
          <TrashIcon
            class="size-4 text-zinc-700 absolute top-4 right-4 transition-colors duration-200 hover:text-red-500 cursor-pointer"
          />
        </li>
      </ul>
    </div>
    <pre>{{ uploads }}</pre>
  </div>
</template>

<script setup lang="ts">
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'
import { ref } from 'vue'

import { useApi } from '@/composables/useApi.ts'
import { formatFileName, formatFileSize } from '@/utils/formatters.ts'

interface Props {
  folderName: string
}

const props = withDefaults(defineProps<Props>(), {
  folderName: 'default',
})

interface IUpload {
  name: string
  progress: number
  previewURL?: string
  size: number | string
}

interface IFileResponse {
  id: number
  name: string
  url: string
}

interface IUploadResponse {
  code: number
  content: IFileResponse
}

const fileInput = ref<HTMLInputElement | null>(null)
const uploads = ref<IUpload[]>([])

const $api = useApi()

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files) {
    const filesArray = Array.from(files)
    filesArray.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        uploads.value.push({
          name: formatFileName(file.name),
          progress: 0,
          previewURL: e.target?.result as string,
          size: formatFileSize(file.size),
        })
      }
      reader.readAsDataURL(file)
    })
    uploadFiles(filesArray)
  }
}

const uploadFiles = async (files: File[]) => {
  const formData = new FormData()

  files.forEach((file) => {
    formData.append('file', file)
  })

  formData.append('fieldName', props.folderName)

  try {
    const response = await $api.$post<IUploadResponse>(
      '/api/StaticFile/Add',
      formData,
    )
    console.log(response)
    const result = response.data?.content

    uploads.value.forEach((upload) => {
      ;(upload.id as any) = result?.id
      ;(upload.url as any) = result?.url
    })
  } catch (e) {
    console.error(e)
  }
}
</script>
