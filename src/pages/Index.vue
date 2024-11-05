<template>
  <div class="container mx-auto px-5 py-8">
    <div class="flex flex-col gap-5 mb-5">
      <p class="text-zinc-800 text-2xl font-medium">File Uploader</p>
      <FileUploader folder-name="test-files" />
    </div>
    <div class="flex flex-col gap-5">
      <p class="text-zinc-800 text-2xl font-medium">Data Table</p>
      <Table />
    </div>
  </div>
</template>

<script setup lang="ts">
import FileUploader from '@/components/FileUploader.vue'
import Table from '@/components/Table.vue'
</script>
