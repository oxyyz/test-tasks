<template>
  <div>
    <div
      :class="[
        {
          'cursor-not-allowed bg-gray-200': disabled,
          'focus-within:ring-2 focus-within:ring-blue-500': !disabled,
        },
      ]"
      class="flex items-center gap-2.5"
    >
      <input
        type="radio"
        :id="inputId"
        :name="name"
        v-model="modelValue"
        :value="value"
        :disabled="disabled"
        class="hidden"
      />
      <div
        class="size-5 border-2 border-[#FF9345] rounded-full relative flex items-center justify-center"
      >
        <div
          class="absolute size-2.5 bg-[#FF9345] rounded-full transition-all duration-150 scale-0"
          :class="{ 'scale-100': isChecked }"
        ></div>
      </div>
      <label
        v-if="label || $slots?.label"
        :for="inputId"
        class="inline-block font-medium text-sm text-dark"
        :class="labelClass"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

interface Props {
  modelValue: string | number
  label?: string
  disabled?: boolean
  name: string
  value: string | number
  labelClass?: string
}
const props = withDefaults(defineProps<Props>(), {})

const inputId = useId()

const isChecked = computed(() => props.modelValue === props.value)

const emit = defineEmits<{
  (e: 'update:modelValue', val: Props['modelValue']): void
}>()

const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<style scoped>
.radio__radio::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ff9345;
  transform: scale(0);
  transition: transform 0.15s;
}

input:checked + div > .radio__radio::after {
  transform: scale(1);
}
</style>
