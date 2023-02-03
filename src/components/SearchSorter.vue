<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { Sorting } from "../enums";

const props = defineProps({
  text: String,
});

const emits = defineEmits(["sortUpdate"]);
defineExpose({
  resetSort,
});

const currentSorting = ref(Sorting.Neutral);

function resetSort() {
  currentSorting.value = Sorting.Neutral;
}

function toggleSort() {
  if (currentSorting.value === Sorting.Neutral) {
    currentSorting.value = Sorting.Descending;
  } else if (currentSorting.value === Sorting.Descending) {
    currentSorting.value = Sorting.Ascending;
  } else if (currentSorting.value === Sorting.Ascending) {
    currentSorting.value = Sorting.Neutral;
  }

  emits("sortUpdate", {
    property: props.text,
    sortingType: currentSorting.value,
  });
}
</script>

<template>
  <button
    @click="toggleSort()"
    :class="{ active: currentSorting !== Sorting.Neutral }"
  >
    <span v-if="currentSorting === Sorting.Ascending"> ↑ </span>
    <span v-else-if="currentSorting === Sorting.Descending"> ↓ </span>
    {{ props.text }}
  </button>
</template>

<style scoped>
button {
  background-color: #eee;
  border-color: #eee;
  cursor: pointer;
}

button.active {
  border-color: #0090ff;
  background: #0090ff;
  color: #fff;
}
</style>
