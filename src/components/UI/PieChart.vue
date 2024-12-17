<template>
  <div id="pieChart">
    <VueApexCharts
      type="pie"
      width="320px"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const trigger = ref(false)

const chartOptions = reactive({
  chart: {
    type: 'pie',
    selection: {
      enabled: false,
    },
  },
  states: {
    active: {
      filter: {
        type: 'none',
      },
    },
  },
  colors: ['#f26419', '#55dde0', '#ef233c', '#7400b8'],
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },

  plotOptions: {
    pie: {
      dataLabels: {
        enabled: false,
        offset: -20,
      },
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '14px',
      fontWeight: 'normal',
    },
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D'],
})

const series = reactive([44, 55, 13, 43])

onMounted(() => {
  setTimeout(() => {
    trigger.value = !trigger.value
  }, 100)
})
</script>
