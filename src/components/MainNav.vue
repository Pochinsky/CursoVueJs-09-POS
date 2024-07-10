<script setup>
import { useProductsStore } from "../stores/products";
import Link from "./Link.vue";
import Logo from "./Logo.vue";

const productsStore = useProductsStore();
</script>

<template>
  <header
    class="px-10 py-5 bg-gray-700 flex flex-col lg:flex-row gap-4 lg:justify-between lg:items-center absolute top-0 w-full z-10"
  >
    <div>
      <Logo />
      <div class="flex gap-4 text-white items-center">
        <h2 class="text-lg font-bold">Filtros:</h2>
        <div
          class="flex items-center gap-2"
          v-for="category in productsStore.categories"
          :key="category.id"
        >
          <input
            type="radio"
            name="category"
            :value="category.id"
            :checked="productsStore.categoriesSelected === category.id"
            @change="productsStore.categoriesSelected = +$event.target.value"
            class="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label class="text-gray-100">
            {{ category.name }}
          </label>
        </div>
      </div>
    </div>
    <nav>
      <Link to="sales"> Administrar </Link>
    </nav>
  </header>
</template>
