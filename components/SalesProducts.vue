<template>
  <Graph :data="sales_products" type="pie" label="_id" value="CategorySales" legend="# of sales" />
  <span class="hidden">
    {{ sales_products }}
  </span>
</template>

<script lang="ts" setup>
const sales_products = ref<any[]>([]);

onMounted(async () => {
  const res = await fetch('api/analytics/category_sales');
  sales_products.value = await res.json();
});
</script>