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
              <p class="text-zinc-800 text-sm">{{ upload.name }}</p>
              <p class="text-zinc-700 text-xs">{{ upload.size }}</p>
            </div>
          </div>
          <TrashIcon
            @click="removeFile(index)"
            class="size-4 text-zinc-700 absolute top-4 right-4 transition-colors duration-200 hover:text-red-500 cursor-pointer"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'
import { ref } from 'vue'

import { formatFileName, formatFileSize } from '@/utils/formatters.ts'

interface IUpload {
  name: string
  progress: number
  previewURL?: string
  size: number
}

const fileInput = ref<HTMLInputElement | null>(null)
const uploads = ref<IUpload[]>([])

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  console.log('files', files)
  if (files) {
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        console.log('File loaded:', file.name)
        uploads.value.push({
          name: formatFileName(file.name),
          progress: 0,
          previewURL: e.target?.result as string,
          size: formatFileSize(file.size),
        })
      }
      reader.readAsDataURL(file)
      uploadFile(file)
    })
  }
}

const removeFile = (index: number) => {
  uploads.value.splice(index, 1)
}

const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const uploadIndex = uploads.value.findIndex(
    (upload) => upload.name === file.name,
  )
  if (uploadIndex === -1) return

  try {
    console.log('Uploading file:', file.name)
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) throw new Error('Upload failed')

    const result = await response.json()

    console.log('Upload result:', result)
    uploads.value[uploadIndex].progress = 100

    uploads.value[uploadIndex] = {
      ...uploads.value[uploadIndex],
      ...result,
    }
  } catch (e) {
    console.log(e)
  }
}
</script>
