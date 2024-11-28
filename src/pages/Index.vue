<template>
  <div class="container py-8">
    <div class="flex flex-col gap-5 py-16">
      <Tooltip text="hello 😀">
        <button class="p-2 rounded bg-zinc-800 text-white">Hover me</button>
      </Tooltip>
    </div>
    <div>
      <FormInput v-model="text" />
      <pre>{{ text }}</pre>
    </div>
    <div>
      <CustomInput v-model="text3" />
      <pre>{{ text3 }}</pre>
    </div>
    <div class="py-5">
      <Radio v-model="radio" name="myRadioGroup" value="1" label="Option 2" />
      <pre>value: {{ radio }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import CustomInput from '@/components/Form/CustomInput.vue'
import FormInput from '@/components/Form/Input.vue'
import Radio from '@/components/Form/Radio.vue'
import Tooltip from '@/components/Tooltip.vue'
const text = ref('')
const text3 = ref('')
const radio = ref()
</script>
