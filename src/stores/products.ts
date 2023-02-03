import { ref } from "vue";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("counter", () => {
  const count = ref(2);

  const searchedProducts = ref([]);
  const searchText = ref("");
  const searchCategory = ref("");
  const searchCategories = ref([]);
  const totalItemsForActualParameters = ref();

  function fetchProducts() {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        totalItemsForActualParameters.value = res.total;
        searchedProducts.value;
      });
  }

  function fetchAllCategories() {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((res) => {
        searchCategories.value = res;
      });
  }

  function searchByPage(limitOnPage: number, destinyPageNumber: number) {
    const resultsToSkip = (destinyPageNumber - 1) * limitOnPage;
    // ?limit=10&skip=10&select=title,price')
    fetch(`https://dummyjson.com/products?limit=${limitOnPage}&skip=${resultsToSkip}`)
      .then((res) => res.json())
      .then((res) => {
        totalItemsForActualParameters.value = res.total;
        searchedProducts.value = res.products;
      });
  }

  function searchByText(text: string) {
    fetch("https://dummyjson.com/products/search?q=" + text)
      .then((res) => res.json())
      .then((res) => {
        totalItemsForActualParameters.value = res.total;
        searchedProducts.value = res.products;
      });
  }

  function searchByCategory(category: string) {
    fetch("https://dummyjson.com/products/category/" + category)
      .then((res) => res.json())
      .then((res) => {
        totalItemsForActualParameters.value = res.total;
        searchedProducts.value = res.products;
      });
  }

  return {
    count,
    searchByCategory,
    searchByPage,
    fetchAllCategories,
    totalItemsForActualParameters,
    searchedProducts,
    fetchProducts,
    searchByText,
    searchText,
    searchCategory,
    searchCategories,
  };
});
