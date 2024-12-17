<template>
  <div class="w-full min-h-screen bg-black">
    <div class="container">
      <div class="py-5">
        <Tools />
      </div>
      <div class="py-5 flex flex-col gap-2">
        <NumberFlow
          :value="count"
          :format="{
            style: 'currency',
            currency: 'UZS',
          }"
          suffix="/mo"
          class="text-white text-3xl"
        />
        <button
          @click="count++"
          class="w-fit bg-emerald-500 text-white py-2 px-3 rounded hover:bg-emerald-600 transition-colors duration-300"
        >
          Click
        </button>
      </div>
      <div class="py-5">
        <NumberFlowGroup>
          <div
            style="--number-flow-char-height: 0.85em"
            class="flex items-center gap-4 font-semibold"
          >
            <NumberFlow
              :value
              :format="{ style: 'currency', currency: 'UZS' }"
              class="text-4xl text-white"
            />
            <NumberFlow
              :value="diff"
              :format="{
                style: 'percent',
                maximumFractionDigits: 2,
                signDisplay: 'always',
              }"
              :class="[
                'text-xl transition-colors duration-300',
                diff < 0 ? 'text-red-500' : 'text-emerald-500',
              ]"
            />
          </div>
        </NumberFlowGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NumberFlow, { NumberFlowGroup } from '@number-flow/vue'
import { ref } from 'vue'

import Tools from '@/components/Tools.vue'

const count = ref(1223233)
const value = ref(123)
const diff = ref(-0.123)
</script>
