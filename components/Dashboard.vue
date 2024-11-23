<template>
  <div class="p-10">
    <div class="mx-auto w-fit">
      <h1>Trending products</h1>
      <Stats />
    </div>
    <h1 class="text-center">Statistics</h1>
    <div class="flex items-stretch justify-center flex-wrap gap-4">
      <div class="lg:w-2/3 w-full">
        <div class="p-2 bg-base-100 rounded-lg shadow-lg">
          <SalesCategory />
        </div>
      </div>
      <div class="lg:w-fit w-full">
        <div class="p-2 bg-base-100 rounded-lg shadow-lg h-full">
          <SalesProducts />
        </div>
      </div>
    </div>
    <h1>List of products</h1>
    <ProductsTable />
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
h1 {
  @apply text-3xl font-bold my-5;
}
</style>