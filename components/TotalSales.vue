<template>
  <div class="content">
  <h1>Total Sales by period</h1>
  <div class="flex items-center flex-wrap gap-2 p-2">
    <label class="flex flex-col w-fit">
      <span class="text-xl font-bold">
        Period
      </span>
      <select class="select select-md select-primary" v-model="selectedPeriod" @change="fetchTotalSales">
        <option value="7">last week</option>
        <option value="14">last 2 weeks</option>
        <option value="30">last month</option>
        <option value="90">last quarter</option>
        <option value="365">last year</option>
        <option value="730">last 2 years</option>
        <option value="1825">last 5 years</option>
      </select>
    </label>

    <div class="stats shadow-lg bg-base-100 rounded-lg p-4">
      <div class="stat">
        <div class="stat-title text-lg font-semibold">Total Sales</div>
        <div class="stat-value text-2xl">{{ Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalSales)  }}</div>
        <div class="stat-desc text-sm text-gray-500"></div>
      </div>
    </div>

  </div>
  </div>
</template>

<script lang="ts" setup>
const totalSales = ref(0);
const selectedPeriod = ref(7);

const fetchTotalSales = async () => {
  const [start, end] = [subDays(new Date(), +selectedPeriod.value), new Date()].map(d => format(d, 'yyyy-MM-dd'));
  const res = await fetch(`api/analytics/total_sales?period=${start},${end}`);
  const data = await res.json();
  totalSales.value = data.totalSales;
};

onMounted(() => {
  fetchTotalSales();
});
</script>