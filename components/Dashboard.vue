<template>
  <div class="p-10">
    <div class="mx-auto w-fit">
      <h1>Trending products</h1>
      <Stats />
    </div>
    <h1 class="text-center">Statistics</h1>
    <div class="flex items-stretch justify-center flex-wrap gap-4">
      <div class="lg:w-1/3 w-full">
        <div class="p-4 bg-base-100 rounded-lg shadow-lg">
          <PieChart />
        </div>
      </div>
      <div class="lg:w-1/3 w-full">
        <div class="p-4 bg-base-100 rounded-lg shadow-lg">
          <BarChart :products="getProducts()" />
        </div>
      </div>
    </div>
    <h1>List of products</h1>
    <ProductsTable v-model:products="products" />
  </div>
</template>

<script lang="ts" setup>
const products = ref<any[]>([]);

function getProducts() {
  return products.value;
}
</script>

<style>
h1 {
  @apply text-3xl font-bold my-5;
}
</style>