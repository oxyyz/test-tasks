<template>
  <div class="container mx-auto px-5 py-8">
    <div class="flex flex-col gap-5 py-16">
      <Tooltip text="hello 😀">
        <button class="p-2 rounded bg-zinc-800 text-white">Hover me</button>
      </Tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tooltip from '@/components/Tooltip.vue'
</script>
