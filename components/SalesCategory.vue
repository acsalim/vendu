<template>
  <Graph :data="category_sales" type="pie" label="_id" value="CategorySales" legend="# of sales" />
  <span class="hidden">
    {{ category_sales }}
  </span>
</template>

<script lang="ts" setup>
const category_sales = ref<CategorySale[]>([]);

onMounted(async () => {
  const res = await fetch('api/analytics/category_sales');
  category_sales.value = await res.json();
});
</script>