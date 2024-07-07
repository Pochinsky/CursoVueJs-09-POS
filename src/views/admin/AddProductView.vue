<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import Link from "@/components/Link.vue";
import useImage from "@/composables/useImage";
import { useProductsStore } from "@/stores/products";

const formData = reactive({
  name: "",
  category: "",
  price: "",
  stock: "",
  image: "",
});

const { url, imageIsUploaded, onFileChange } = useImage();
const productsStore = useProductsStore();
const router = useRouter();

const submitHandler = async (data) => {
  const { image, ...values } = data;
  try {
    await productsStore.createProduct({ ...values, image: url.value });
    router.push({ name: "products" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
    <Link to="products">Volver</Link>
    <h2 class="text-4xl font-black my-10">Nuevo Producto</h2>
    <div class="flex justify-center bg-white shadow">
      <div class="p-12 w-full 2xl:w-2/4">
        <FormKit
          type="form"
          submit-label="Agregar Producto"
          :incomplete-message="'No se pudo agregar'"
          @submit="submitHandler"
          :value="formData"
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
            type="file"
            label="Imagen del producto"
            name="image"
            validation="required"
            :validation-messages="{
              required: 'La imagen del producto es obligatoria',
            }"
            accept=".jpg"
            @change="onFileChange"
            v-model="formData.image"
          />
          <div v-if="imageIsUploaded">
            <p class="font-black">Imagen del producto:</p>
            <img
              :src="imageIsUploaded"
              alt="Imagen del producto"
              class="w-32"
            />
          </div>
          <FormKit
            type="select"
            label="Categoría"
            name="category"
            validation="required"
            :validation-messages="{
              required: 'La categoría del producto es obligatoria',
            }"
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
            v-model.number="formData.stock"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>
