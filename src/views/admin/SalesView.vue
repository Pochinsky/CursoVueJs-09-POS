<script setup>
import { ref } from "vue";
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import { useSalesStore } from "@/stores/sales";
import SaleDetails from "@/components/SaleDetails.vue";
import { formatCurrency } from "@/helpers";

const formatter = ref({ date: "DD/MM/YYYY", month: "MMMM" });
const salesStore = useSalesStore();
</script>

<template>
  <h2 class="text-4xl font-black my-10">Resumen de Ventas</h2>
  <div class="md:flex md:items-start gap-24">
    <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-center p-5">
      <VueTailwindDatePicker
        i18n="es"
        as-single
        no-input
        v-model="salesStore.date"
        :formatter="formatter"
      />
    </div>
    <div class="md:w-1/2 lg:w-2/3 space-y-5 p-5 pb-32">
      <p v-if="salesStore.isDateSelected" class="text-center text-lg">
        Ventas de la fecha:
        <span class="font-bold">{{ salesStore.date }}</span>
      </p>
      <p v-else class="text-center text-lg">Selecciona una fecha</p>
      <div v-if="salesStore.salesCollection.length" class="space-y-5">
        <SaleDetails
          v-for="sale in salesStore.salesCollection"
          :key="sale.id"
          :sale="sale"
        />
        <p class="text-right text-lg">
          Total del día:
          <span class="font-black">
            {{ formatCurrency(salesStore.totalSalesOfDay) }}
          </span>
        </p>
      </div>
      <p v-else-if="salesStore.noSales" class="text-lg text-center">
        No hay ventas en este día
      </p>
    </div>
  </div>
</template>
