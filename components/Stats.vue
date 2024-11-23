<template>
  <div class="content">
    <h1>Trending products</h1>
    <div class="stats stats-vertical md:stats-horizontal shadow-lg bg-base-100 rounded-lg p-4 mx-auto">
      <div class="stat" v-for="{ ProductName, sold, Category } in top5Products">
        <div class="stat-title text-lg font-semibold">{{ ProductName }}</div>
        <div class="stat-value text-2xl">{{ sold }}</div>
        <div class="stat-desc text-sm text-gray-500">{{ Category }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const top5Products = ref<any[]>([]);

async function fetchProducts() {
  const res = await fetch(`/api/analytics/trending_products?limit=5`);
  const data = await res.json();
  top5Products.value = data;
};

onMounted(fetchProducts);
</script>