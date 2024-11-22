<template>
  <div class="pagination flex items-center gap-3 w-fit ms-auto mb-4 flex-wrap">
    <div class="md:join md:join-horizontal flex flex-wrap">
      <button type="button" class="btn join-item" @click="pagination.page = 1">
        <Icon name="heroicons:chevron-double-left-solid" />
      </button>
      <button type="button" class="btn join-item" @click="pagination.page > 1 && pagination.page--">
        <Icon name="heroicons:chevron-left-solid" />
      </button>
      <div class="join-item flex items-center gap-2 order-1 lg:order-none">
        <span>Page:</span>
        <input v-model="pagination.page" type="number" min="1" :max="pagesCount()" class="input input-sm !w-fit" />
        <span>of</span>
        <span>{{ pagesCount() }}</span>
      </div>
      <button type="button" class="btn join-item" @click="pagination.page < pagesCount() && pagination.page++">
        <Icon name="heroicons:chevron-right-solid" />
      </button>
      <button type="button" class="btn join-item" @click="pagination.page = pagesCount()">
        <Icon name="heroicons:chevron-double-right-solid" />
      </button>
    </div>
    <select class="select select-sm" v-model="pagination.limit">
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
        <tr v-for="({ ProductID, ProductName, Category, Price, sold }, index) in products" :key="index">
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

const products = defineModel('products', { type: Array<any>, default: () => [] });

const pagination = reactive({
  page: 1,
  limit: 5,
  rows: 5,
});

const pagesCount = () => Math.ceil(pagination.rows / pagination.limit);


const fetchProducts = async () => {
  const res = await fetch(`/api/products?page=${pagination.page}&limit=${pagination.limit}`);
  const { data, pagination: { rows } } = await res.json();
  products.value = data;
  pagination.rows = rows;
};
onMounted(fetchProducts);

watch(pagination, fetchProducts, { deep: true });
</script>