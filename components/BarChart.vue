<template>
  <canvas ref="canvasEl" />
</template>

<script lang="ts" setup>
import Chart from 'chart.js/auto';
const props = defineProps({
  products: {
    type: Array as PropType<any[]>,
    default: []
  }
});

const canvasEl = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

onUpdated(async () => {
  if (chartInstance) {
    chartInstance.destroy();
  }
  chartInstance = new Chart(canvasEl.value as HTMLCanvasElement, {
    type: 'bar',
    data: {
      labels: props.products.map(({ ProductName }: any) => ProductName),
      datasets: [{
        label: '# of sales',
        data: props.products.map(({ sold }: any) => sold),
      }]
    }
  });
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>