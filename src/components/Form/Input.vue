<template>
  <div>
    <label
      v-if="label || $slots?.label"
      :for="inputId"
      class="mb-2 inline-block font-medium text-sm text-dark"
      :class="labelClass"
    >
      <slot name="label">
        {{ label }}
      </slot>
      <i class="text-red-600 text-sm font-medium ml-1" v-if="required">*</i>
    </label>

    <div
      :class="[
        variants[variant as TInputVariants],
        {
          '!border-red-600': invalid,
          'cursor-not-allowed !bg-[#F3F4F6]': disabled,
        },
      ]"
      class="flex w-full items-center overflow-hidden rounded-lg border border-gray-400 bg-white transition-all duration-300"
    >
      <slot name="prefix" />
      <input
        :id="inputId"
        v-model="mv"
        class="size-full bg-transparent px-4 py-[10.5px] text-dark outline-none placeholder-gray-500"
        :required="required"
        :placeholder="placeholder"
        :type="type"
        :class="inputClass"
        :disabled="disabled"
      />
      <slot name="suffix" />
    </div>
    <p class="text-[13px] mt-2 text-red-600 italic" v-if="invalid">
      {{ errorMessages }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

import { TClassName } from '@/types/common.ts'

type TInputVariants = 'primary' | 'secondary'

interface Props {
  modelValue: string | number
  placeholder?: string
  invalid?: boolean
  required?: boolean
  disabled?: boolean
  // eslint-disable-next-line
  errorMessages?: Array<string | Record<string, any>>
  errorKey?: string
  hint?: string
  label?: string
  type?: string
  inputClass?: TClassName
  labelClass?: TClassName
  variant?: TInputVariants
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  variant: 'primary',
})

interface Emits {
  (e: 'update:modelValue', val: Props['modelValue']): void
}
const emit = defineEmits<Emits>()

const mv = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const variants: Record<TInputVariants, TClassName> = {
  primary: 'focus-within:border-cyan',
  secondary: 'focus-within:border-indigo-100',
}

const inputId = useId()
</script>
