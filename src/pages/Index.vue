<template>
  <div class="container py-8">
    <div class="flex flex-col gap-5 py-16">
      <Tooltip text="hello 😀">
        <button class="p-2 rounded bg-zinc-800 text-white">Hover me</button>
      </Tooltip>
    </div>
    <div class="py-16 bg-gray-100">
      <div
        class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 sm:grid-cols-[repeat(auto-fill,minmax(278px,1fr))] sm:gap-6"
      >
        <Member v-for="i in 8" :key="i" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Member from '@/components/Member.vue'
import Tooltip from '@/components/Tooltip.vue'
</script>
