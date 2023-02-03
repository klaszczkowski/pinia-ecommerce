import { toRaw, ref } from "vue";
import { defineStore } from "pinia";
import { Sorting } from "../enums";

export const useProductsStore = defineStore("products", () => {
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
    fetch(
      `https://dummyjson.com/products?limit=${limitOnPage}&skip=${resultsToSkip}`
    )
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

  function sortResults(sorterConfig: any) {
    const sortedProducts = searchedProducts.value.sort((x, y) => {
      const compareProperty = sorterConfig.property;
      const xValue = toRaw(x)[compareProperty];
      const yValue = toRaw(y)[compareProperty];
      if (sorterConfig.sortingType === Sorting.Neutral) {
        return 0;
      } else if (sorterConfig.sortingType === Sorting.Ascending) {
        return xValue - yValue;
      } else if (sorterConfig.sortingType === Sorting.Descending)
        return yValue - xValue;
    });

    searchedProducts.value = toRaw(sortedProducts);
  }

  return {
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
    sortResults,
  };
});
