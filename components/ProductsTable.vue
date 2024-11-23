<template>
  <div class="pagination flex items-center gap-3 w-fit ms-auto mb-4 flex-wrap">
    <div class="md:join md:join-horizontal flex flex-wrap">
      <button type="button" class="btn join-item" @click="productsStore.pagination.page = 1">
        <Icon name="heroicons:chevron-double-left-solid" />
      </button>
      <button type="button" class="btn join-item" @click="productsStore.pagination.page > 1 && productsStore.pagination.page--">
        <Icon name="heroicons:chevron-left-solid" />
      </button>
      <div class="join-item flex items-center gap-2 order-1 lg:order-none">
        <span>Page:</span>
        <input v-model="productsStore.pagination.page" type="number" min="1" :max="productsStore.pagesCount" class="input input-sm input-primary !w-fit" />
        <span>of</span>
        <span>{{ productsStore.pagesCount }}</span>
      </div>
      <button type="button" class="btn join-item" @click="productsStore.pagination.page < productsStore.pagesCount && productsStore.pagination.page++">
        <Icon name="heroicons:chevron-right-solid" />
      </button>
      <button type="button" class="btn join-item" @click="productsStore.pagination.page = productsStore.pagesCount">
        <Icon name="heroicons:chevron-double-right-solid" />
      </button>
    </div>
    <select class="select select-sm" v-model="productsStore.pagination.limit">
      <option :value="i" v-for="i in [5, 15, 50, 100]" selected>{{ i }}</option>
    </select>
  </div>
  <div class="overflow-x-auto p-4 bg-base-100 rounded-lg shadow-lg">
    <table class="table w-full">
      <thead>
        <tr>
          <th>ProductID</th>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>sold</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="({ ProductID, ProductName, Category, Price, sold }, index) in productsStore.products" :key="index">
          <td>
            {{ ProductID }}
          </td>
          <td>
            {{ ProductName }}
          </td>
          <td>
            {{ Category }}
          </td>
          <td>
            {{ Price }}
          </td>
          <td>
            {{ sold }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
const productsStore = useProductsStore();
onMounted(productsStore.getAll);
watch(productsStore.pagination, productsStore.getAll, { deep: true });
</script>