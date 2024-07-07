<script setup>
import { storeToRefs } from "pinia";
import { useProductsStore } from "../stores/products";
import MainNav from "../components/MainNav.vue";
import ProductCard from "../components/ProductCard.vue";

const productsStore = useProductsStore();
const { productsFiltered, noResults } = storeToRefs(productsStore);
</script>

<template>
  <MainNav />
  <main class="pt-16 lg:flex lg:h-screen lg:overflow-y-hidden">
    <div class="lg:w-2/3 lg:screen lg:overflow-y-scroll py-24 px-10">
      <p v-if="noResults" class="text-center text-4xl">No hay productos</p>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
        <ProductCard
          v-for="product in productsFiltered"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
    <aside class="lg:w-2/3 lg:screen lg:overflow-y-scroll py-24 px-10">
      <p>Carrito</p>
    </aside>
  </main>
</template>
