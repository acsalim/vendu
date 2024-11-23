<template>
  <Graph :data="productsStore.products" type="bar" label="ProductName" value="sold" legend="# of sales" />
  <span class="hidden">
    {{ productsStore.products }}
  </span>
</template>

<script lang="ts" setup>
const productsStore = useProductsStore();
</script>