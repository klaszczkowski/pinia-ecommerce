<script setup lang="ts">
import PageItem from "./PageItem.vue";
import ListPagination from "./ListPagination.vue";


import { onMounted, ref } from "vue";

import { useProductsStore } from "../stores/products";
const productsStore = useProductsStore();

const paginationOptions = ref([10, 25, 50, 100]);
const selectedPaginationOption = ref(10);

function paginationUpdate(page) {
  productsStore.searchByPage(selectedPaginationOption.value, page);
}

onMounted(() => {
  productsStore.fetchAllCategories();
  productsStore.searchByPage(selectedPaginationOption.value, 1);
});
</script>

<template>
  <PageItem>
    <template #heading>Front End Challenge</template>

    <label for="searchByText">Search:</label>t
    <input
      id="searchByText"
      placeholder="What are you looking for?"
      type="text"
      v-model="productsStore.searchText"
      @keyup="productsStore.searchByText(productsStore.searchText)"
    />

    <label for="categories">Category:</label>

    <select
      name="categories"
      v-model="productsStore.searchCategory"
      @change="productsStore.searchByCategory(productsStore.searchCategory)"
    >
      <option value="">Select category</option>
      <option
        v-for="category in productsStore.searchCategories"
        :value="category"
        :key="category"
      >
        {{ category }}
      </option>
    </select>

    <hr />

    <div class="pagination-info">
      {{ productsStore.searchedProducts.length }} of
      {{ productsStore.totalItemsForActualParameters }} results
    </div>

    <div class="search-results">
      <div
        class="card"
        v-for="product in productsStore.searchedProducts"
        :key="product.id"
      >
        <img :src="product.thumbnail" />
        <h3>{{ product.title }}</h3>

        {{ product.description }}
        <br />
        ${{
          parseFloat(
            product.price - (product.price * product.discountPercentage) / 100
          ).toFixed(2)
        }}

        <br />
        <br />
        <br />
        <small class="priceBeforeDiscount"
          >normalPrice: ${{ parseFloat(product.price).toFixed(2) }}
        </small>

        <p class="stars">☆☆☆☆☆★</p>
      </div>
    </div>

    <select
      name="pagination"
      v-model="selectedPaginationOption"
      @change="productsStore.searchByPage(selectedPaginationOption, 1)"
    >
      <option
        v-for="paginationOpt in paginationOptions"
        :value="paginationOpt"
        :key="paginationOpt"
      >
        {{ paginationOpt }}
      </option>
    </select>

    <ListPagination
      :allItemsCount="productsStore.totalItemsForActualParameters"
      :itemsPerPageLimit="selectedPaginationOption"
      @update="paginationUpdate"
    />
  </PageItem>
</template>

<style scoped>
.card {
  width: 250px;
  /* UI Properties */
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #707070;
  height: 500px;
  opacity: 1;
  margin: 10px;
}

.priceBeforeDiscount {
  text-decoration: line-through;
}

.card img {
  width: 248px;
}

/****** Style Star Rating Widget *****/

.stars {
  width: 89px;
  height: 27px;
  text-align: left;
  font: normal normal bold 20px/27px Open Sans;
  letter-spacing: 0px;
  color: rgba(0, 144, 255, 1);
  opacity: 1;
}
.search-results {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.pagination-info {
  text-align: right;
}
</style>
