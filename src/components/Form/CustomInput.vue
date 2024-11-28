<template>
  <div>
    <input type="text" v-model="mv" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string | number
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

interface Emits {
  (e: 'update:modelValue', val: Props['modelValue']): void
}

const emit = defineEmits<Emits>()

const mv = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>
