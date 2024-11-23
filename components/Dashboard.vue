<template>
  <template v-if="isLoading">
    <div class="fixed top-0 w-screen h-screen z-50 flex flex-col items-center justify-center bg-base-100 gap-4">
      <h1 class="text-5xl font-bold">Vendu</h1>
      <span class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"/>
    </div>
  </template>
  <div class="p-10">
    <div class="flex justify-evenly flex-wrap">
      <Stats />
      <TotalSales />
    </div>
    <h1 class="text-center">Statistics</h1>
    <div class="flex items-stretch justify-center flex-wrap gap-4">
      <div class="lg:w-2/3 w-full">
        <div class="p-2 bg-base-100 rounded-lg shadow-lg">
          <SalesProducts />
        </div>
      </div>
      <div class="lg:w-fit w-full">
        <div class="p-2 bg-base-100 rounded-lg shadow-lg h-full">
          <SalesCategory />
        </div>
      </div>
    </div>
    <h1>List of products</h1>
    <ProductsTable />
  </div>
</template>

<script lang="ts" setup>
const isLoading = ref(true);

onMounted(async () => {
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});
</script>

<style>
h1 {
  @apply text-3xl font-bold my-5;
}
</style>