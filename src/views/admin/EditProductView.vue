<script setup>
import { watch, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { doc } from "firebase/firestore";
import { useFirestore, useDocument } from "vuefire";
import Link from "@/components/Link.vue";
import { useProductsStore } from "@/stores/products";
import useImage from "@/composables/useImage";

const route = useRoute();
const router = useRouter();
const db = useFirestore();
const docRef = doc(db, "products", route.params.id);
const product = useDocument(docRef);

const { onFileChange, url, imageIsUploaded } = useImage();
const productsStore = useProductsStore();

const formData = reactive({
  name: "",
  category: "",
  price: "",
  stock: "",
  image: "",
});

watch(product, (product) => {
  if (!product) router.push({ name: "products" });
  Object.assign(formData, product);
});

const submitHandler = async (data) => {
  try {
    await productsStore.updateProduct(docRef, { ...data, url });
    router.push({ name: "products" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <Link to="products"> Volver </Link>
  <h1 class="text-4xl my-10 font-extrabold">Editar Producto</h1>

  <div class="flex justify-center bg-white shadow">
    <div class="mx-auto mt-10 p-10 w-full 2xl:w-2/4">
      <FormKit
        type="form"
        :value="formData"
        submit-label="Guardar Cambios"
        incomplete-message="No se pudieron realizar los cambios"
        @submit="submitHandler"
        :actions="false"
      >
        <FormKit
          type="text"
          label="Nombre"
          name="name"
          placeholder="Ej: Zapatillas deportivas"
          validation="required"
          :validation-messages="{
            required: 'El nombre del producto es obligatorio',
          }"
          v-model.trim="formData.name"
        />

        <FormKit
          type="select"
          label="Categoría"
          name="category"
          validation="required"
          :validation-messages="{ required: 'La Categoría es Obligatoria' }"
          :options="productsStore.categoryOptions"
          v-model.number="formData.category"
        />

        <FormKit
          type="number"
          label="Precio"
          name="price"
          placeholder="Ej: 55000"
          validation="required"
          :validation-messages="{
            required: 'El precio del producto es obligatorio',
          }"
          min="1"
          v-model.number="formData.price"
        />

        <FormKit
          type="number"
          label="Stock disponible"
          name="stock"
          placeholder="Ej: 10"
          validation="required"
          :validation-messages="{
            required: 'El stock del producto es obligatorio',
          }"
          min="0"
          v-model.number="formData.stock"
        />

        <div v-if="imageIsUploaded">
          <p class="font-black">Imagen Nueva:</p>
          <img :src="url" alt="Imagen nuevo producto" class="w-52" />
        </div>

        <div v-else>
          <p class="font-black">Imagen Actual:</p>
          <img
            :src="formData.image"
            :alt="'Imagen de ' + formData.name"
            class="w-52"
          />
        </div>

        <FormKit
          type="file"
          label="Cambiar Imagen"
          name="image"
          multiple="false"
          accept=".jpg"
          @change="onFileChange"
        />

        <FormKit type="submit">Guardar Cambios</FormKit>
      </FormKit>
    </div>
  </div>
</template>
