<template>
    <canvas ref="canvasEl" />
</template>

<script lang="ts" setup>
import Chart from 'chart.js/auto';

const canvasEl = ref<HTMLCanvasElement | null>(null);


onMounted(async () => {

  const res = await fetch('api/analytics/category_sales');
  const data  = await res.json();

  new Chart(canvasEl.value as HTMLCanvasElement, {
    type: 'pie',
    data: {
      labels: data.map(({ _id }: any) => _id),
      datasets: [{
        label: '# of sales',
        data: data.map(({ CategorySales }: { CategorySales: number }) => CategorySales),

        hoverOffset: 4
      }]
    }
  });
});
</script>