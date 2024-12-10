<template>
  <span
    :class="[
      'opacity-0 font-normal group-hover:opacity-100 delay-75 scale-90 group-hover:scale-100 pointer-events-none transition-all duration-150 ease-out absolute text-sm px-2.5 py-1 rounded-full bg-black z-[99] text-white dark:bg-white dark:text-black',
      positionClass,
      customClass,
    ]"
  >
    <span
      :class="[
        'w-2.5 h-2.5 rounded-sm bg-black absolute scale-75 group-hover:scale-100 transition-transform duration-200 z-30 transform rotate-45 dark:bg-white',
        arrowPositionClass,
      ]"
    />
    <span class="z-50 relative truncate">
      <slot />
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

interface Props {
  position: 'top' | 'left' | 'right' | 'bottom'
  class?: string
}

const props = defineProps<Props>()

const positionClass = computed(() => {
  switch (props.position) {
    case 'top':
      return '-top-5 group-hover:-top-6 left-[50%] translate-x-[-50%]'
    case 'bottom':
      return '-bottom-5 group-hover:-bottom-6 left-[50%] translate-x-[-50%]'
    case 'left':
      return 'left-5 group-hover:-left-6 top-[50%] translate-y-[-50%]'
    case 'right':
      return 'right-5 group-hover:-right-6 top-[50%] translate-y-[-50%]'
    default:
      return ''
  }
})

const arrowPositionClass = computed(() => {
  switch (props.position) {
    case 'top':
      return '-bottom-1 left-[50%] translate-x-[-50%]'
    case 'bottom':
      return '-top-1 left-[50%] translate-x-[-50%]'
    case 'left':
      return '-right-0.5 top-[50%] translate-y-[-50%]'
    case 'right':
      return '-left-0.5 top-[50%] translate-y-[-50%]'
    default:
      return ''
  }
})

const customClass = props.class || ''
</script>
