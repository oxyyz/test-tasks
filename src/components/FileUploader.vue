<template>
  <div class="w-full max-w-[512px]">
    <input
      type="file"
      multiple
      @change="handleFileChange"
      class="hidden"
      ref="file-input"
      v-bind="$attrs"
    />
    <div
      @click="triggerFileInput"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      :class="{
        '!border-red-600': error,
        'border-dashed': isDragging,
      }"
      class="border border-gray-200 py-4 px-6 rounded-xl flex flex-col gap-3 items-center justify-center transition-colors duration-300 hover:border-purple-500 cursor-pointer mb-4"
    >
      <div
        class="size-10 flex items-center justify-center border border-[#EAECF0] rounded-lg"
      >
        <CloudArrowUpIcon class="size-5 text-zinc-800" />
      </div>
      <div class="flex flex-col justify-center items-center w-full text-center">
        <p class="text-sm text-zinc-800">
          <span class="text-[#6941C6] font-medium">Click to upload</span> or
          drag and drop
        </p>
        <p class="text-zinc-800 text-xs">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </p>
      </div>
    </div>
    <div v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</div>
    <div>
      <ul class="flex flex-col gap-3">
        <li
          v-for="(upload, index) in uploads"
          :key="index"
          class="p-4 rounded-lg border border-gray-200 relative"
        >
          <div class="flex items-start gap-3">
            <div>
              <div
                v-if="upload.isImage"
                class="size-10 relative overflow-hidden rounded-lg"
              >
                <img
                  :src="upload.previewURL"
                  alt="Image Preview"
                  class="size-full object-cover absolute top-0 left-0"
                />
              </div>
              <div
                v-else
                class="size-10 bg-gray-200 rounded flex items-center justify-center"
              >
                <DocumentTextIcon class="size-6 text-gray-500" />
              </div>
            </div>
            <div class="w-full">
              <p class="text-zinc-800 text-sm truncate w-full max-w-[70%]">
                {{ formatFileName(upload.name) }}
              </p>
              <p class="text-zinc-700 text-xs">
                {{ formatFileSize(upload.size) }}
              </p>
            </div>
          </div>
          <TrashIcon
            @click="removeFile(index)"
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
import { ref, useTemplateRef } from 'vue'

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

const fileInput = useTemplateRef<HTMLInputElement>('file-input')
const uploads = ref<IUpload[]>([])
const isDragging = ref(false)
const error = ref<string | null>(null)

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

const $api = useApi()

const triggerFileInput = () => {
  fileInput.value?.click()
}

const onDragOver = () => {
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}

const onDrop = (event: DragEvent) => {
  isDragging.value = false
  const files = event.dataTransfer?.files
  if (files) {
    handleFiles(Array.from(files))
  }
}

const handleFiles = (files: File[]) => {
  files.forEach((file) => {
    if (file.size > MAX_FILE_SIZE) {
      error.value = `File ${file.name} exceeds the 2MB limit and was not uploaded.`
      return
    }

    const reader = new FileReader()
    const isImage = file.type.startsWith('image')
    reader.onload = (e) => {
      uploads.value.push({
        name: file.name,
        previewURL: isImage ? (e.target?.result as string) : undefined,
        size: file.size,
        isImage,
      })
    }
    if (isImage) {
      reader.readAsDataURL(file)
    } else {
      uploads.value.push({
        name: file.name,
        size: file.size,
        isImage,
      })
    }
  })
  uploadFiles(files.filter((file) => file.size <= MAX_FILE_SIZE))
}

const handleFileChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files) {
    handleFiles(Array.from(files))
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

    uploads.value.forEach((upload: IFileResponse) => {
      upload.id = result?.id
      upload.url = result?.url
    })
  } catch (e) {
    console.error(e)
  }
}

const removeFile = (index: number) => {
  uploads.value.splice(index, 1)
}
</script>
