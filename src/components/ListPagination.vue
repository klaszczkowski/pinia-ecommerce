<script setup lang="ts">
import { ref, defineProps, computed, defineEmits } from "vue";
import SupportIcon from "./icons/IconSupport.vue";
import NextIcon from "./icons/IconEcosystem.vue";

const props = defineProps({
  allItemsCount: Number,
  itemsPerPageLimit: Number,
});

const emits = defineEmits(["update"]);

const activePageIndex = ref(0);

const pages = computed(() => {
  const pagesCount = Math.ceil(props.allItemsCount / props.itemsPerPageLimit);
  const tempPages = [];
  for (let i = 0; i < pagesCount; i++) {
    tempPages.push({ index: i });
  }

  return tempPages;
});

function setActivePage(index) {
  activePageIndex.value = index;
  emits("update", index);
}
</script>

<template>
  <div class="pagination">
    <button
      @click="setActivePage(activePageIndex - 1)"
      v-if="activePageIndex > 0"
    >
      <SupportIcon />
    </button>
    <template v-for="paginationOpt in pages" :key="paginationOpt.index">
      <button
        @click="setActivePage(paginationOpt.index)"
        v-if="
          paginationOpt.index > activePageIndex - 3 &&
          paginationOpt.index < activePageIndex + 3
        "
        :class="{ active: paginationOpt.index === activePageIndex }"
      >
        {{ paginationOpt.index + 1 }}
      </button>
    </template>

    <button
      @click="setActivePage(activePageIndex + 1)"
      v-if="activePageIndex < pages.length"
    >
      <NextIcon />
    </button>
  </div>
</template>

<style scoped>
.pagination {
  text-align: center;
}
button {
  background: transparent;
  color: #333;
  margin: 5px;
  border-color: transparent;
  border-radius: 40px;
  cursor: pointer;
}

button.active {
  background: #0090ff;
  color: #fff;
  border-color: transparent;
}
</style>
