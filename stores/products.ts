export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as any[],
    pagination: {
      page: 1,
      limit: 5,
      rows: 0,
    },
  }),
  actions: {
    async getAll() {
      const res = await fetch(`/api/products?page=${this.pagination.page}&limit=${this.pagination.limit}`);
      const { data, pagination: { rows } } = await res.json();
      this.products = data;
      this.pagination.rows = rows;
    },
    setPage(page: number) {
      this.pagination.page = page;
    },
    setLimit(limit: number) {
      this.pagination.limit = limit;
    },
  },
  getters: {
    pagesCount: (state) => Math.ceil(state.pagination.rows / state.pagination.limit),
  },
});