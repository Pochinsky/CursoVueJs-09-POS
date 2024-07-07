<script setup>
import Link from "@/components/Link.vue";
import Product from "@/components/Product.vue";
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();
</script>

<template>
  <Link to="add-product">Agregar Producto</Link>
  <h2 class="text-4xl font-black my-10">Productos</h2>
  <p v-if="productsStore.noResults">No hay resultados</p>
  <ul
    v-else
    role="list"
    class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols3 gap-8"
  >
    <Product
      v-for="product in productsStore.productsCollection"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>
