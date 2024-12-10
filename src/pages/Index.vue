<template>
  <div class="container py-8">
    <div class="flex flex-col gap-5 py-16">
      <Tooltip text="hello 😀">
        <button class="p-2 rounded bg-zinc-800 text-white">Hover me</button>
      </Tooltip>
      <CustomTooltip position="top">
        <button class="p-2 rounded bg-zinc-800 text-white">Hover me</button>
      </CustomTooltip>
    </div>
    <div>
      <FormInput v-model="text" label="Miqdor" class="mb-2" type="number" />
      <div class="flex items-center gap-3">
        <div
          class="w-fit px-2 py-1 rounded bg-white cursor-pointer text-dark text-sm box-content"
          :class="
            text === i
              ? 'bg-orange-400/10 border border-orange-400 text-dark'
              : 'bg-white'
          "
          v-for="(i, idx) in donatValues"
          :key="idx"
          @click="text = i"
        >
          {{ i }}
        </div>
      </div>
      <pre>{{ text }}</pre>
    </div>
    <div class="flex items-center gap-3">
      <div
        class="w-fit px-2 py-1 rounded bg-white cursor-pointer text-dark text-sm box-content"
        :class="
          provider === i
            ? 'bg-orange-400/10 border border-orange-400 text-dark'
            : 'bg-white'
        "
        v-for="(i, idx) in providers"
        :key="idx"
        @click="provider = i"
      >
        {{ i }}
      </div>
    </div>
    <pre>{{ provider }}</pre>
    <div class="py-5" v-if="false">
      <Radio v-model="radio" name="myRadioGroup" value="1" label="Option 2" />
      <pre>value: {{ radio }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import CustomTooltip from '@/components/CustomTooltip.vue'
import FormInput from '@/components/Form/Input.vue'
import Radio from '@/components/Form/Radio.vue'
import Tooltip from '@/components/Tooltip.vue'
const text = ref(0)
const provider = ref('')
const radio = ref()

const donatValues = reactive([1000, 5000, 10000])
const providers = reactive(['payme', 'click', 'visa'])
</script>
