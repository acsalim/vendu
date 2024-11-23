<template>
  <canvas ref="canvasEl" />
</template>

<script lang="ts" setup>
import Chart from 'chart.js/auto';

const props = defineProps<{
  data: any[],
  type: string,
  label: string,
  value: string,
  legend?: string,
  options: any
}>();

const canvasEl = ref<HTMLCanvasElement | null>(null);
let chartInstance: any = null;

const createChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }
  chartInstance = new Chart(canvasEl.value as HTMLCanvasElement, {
    type: props.type as any,
    data: {
      labels: props.data.map(item => item[props.label]),
      datasets: [{
        ...(props.legend ? { label: props.legend } : {}),
        data: props.data.map(item => item[props.value]),
        hoverOffset: 4
      }]
    },
    options: props.options
  });
};

onUpdated(createChart);

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>