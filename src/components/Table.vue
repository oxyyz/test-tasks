<template>
  <div class="w-full overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr>
          <th class="w-[60px] text-center">No</th>
          <th
            v-for="(header, index) in headers"
            :key="index"
            :class="header.className"
            class="truncate"
          >
            <slot
              :name="`th.${header.key}`"
              v-bind="{ _index: index, data: header }"
            >
              {{ header.title }}
            </slot>
          </th>
          <th class="text-center w-[120px]" v-if="actions">Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useQuery } from '@/composables/useQuery.ts'
import { IDataList, IDataTableHeader, TData } from '@/types/data-table.ts'

interface Props {
  indexing?: boolean
  actions?: boolean
  headers: IDataTableHeader[]
}
const props = withDefaults(defineProps<Props>(), {
  indexing: true,
  actions: true,
})

const $route = useRoute()

const limits = Array.from({ length: 10 }, (_, index) => (index + 1) * 5)

const { state: queries } = useQuery<{
  search: string
  page: number
  limit: number
}>({
  search: String($route.query.search || ''),
  page: (() => {
    const page = parseInt(String($route.query?.page || 1))
    return page > 0 ? page : 1
  })(),
  limit: (() => {
    const limit = parseInt(String($route.query?.limit || 15))
    return limits.includes(limit) ? limit : 10
  })(),
})
const data = ref<IDataList['results']>([])
const total = ref<number>(0)
const offset = computed(() => (queries.page - 1) * queries.limit)
const totalPages = computed(() => Math.ceil(total.value / queries.limit))

function getItem(row: TData, key: string) {
  if (!(key in row)) return '-'
  return row[key]
}
</script>
