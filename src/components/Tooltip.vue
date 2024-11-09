<template>
  <div
    class="relative inline-block max-w-max"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  >
    <slot></slot>
    <Transition name="tooltip">
      <div
        v-if="isVisible"
        class="px-3 py-1.5 bg-[#333333] rounded-lg border border-[#606060] bottom-[100%] left-1/2 transform -translate-x-1/2 mb-3 absolute"
      >
        <p class="text-white text-sm leading-tight whitespace-nowrap">
          {{ text }}
        </p>
        <div
          class="tooltip-arrow absolute w-1/2 h-1/2 overflow-hidden top-full left-1/2 transform -translate-x-1/2"
        >
          <div
            class="absolute w-3 h-3 bg-[#333333] border border-[#606060] rounded-br-sm transform -translate-x-1/2 -translate-y-1/2 rotate-45 left-1/2"
          ></div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  text: string
}

withDefaults(defineProps<Props>(), {
  text: 'Tooltip text',
})

const isVisible = ref(false)

function showTooltip() {
  isVisible.value = true
}

function hideTooltip() {
  isVisible.value = false
}
</script>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.tooltip-enter-from {
  opacity: 0;
  transform: translate(-50%, 10px); /* Start below and keep it centered */
}
.tooltip-enter-to {
  opacity: 1;
  transform: translate(-50%, 0); /* End at the center position */
}
.tooltip-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
.tooltip-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px); /* Slide down while fading out */
}
</style>
