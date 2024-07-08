<script setup>
import { useCouponsStore } from "../stores/coupons";

const couponsStore = useCouponsStore();
</script>

<template>
  <p class="mt-5 py-5 font-bold border-t border-gray-200">¿Tienes un cupón?</p>
  <div class="flex">
    <input
      type="text"
      placeholder="Ingresa un cupón"
      class="p-2 bg-white border-gray-300 w-full rounded-l"
      v-model="couponsStore.couponInput"
    />
    <button
      type="button"
      class="p-3 bg-green-400 font-bold rounded-r disabled:opacity-30 disabled:cursor-not-allowed"
      @click="couponsStore.applyCoupon"
      :disabled="couponsStore.isValidCoupon"
    >
      Canjear
    </button>
  </div>
  <p class="py-2 text-sm font-bold">
    {{ couponsStore.couponValidationMessage }}
  </p>
</template>
