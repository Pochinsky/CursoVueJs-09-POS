import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import { useCartStore } from "./cart";

export const useCouponsStore = defineStore("coupon", () => {
  const couponInput = ref("");
  const couponValidationMessage = ref("");
  const discountPercentage = ref(0);
  const discount = ref(0);

  const VALID_COUPONS = [
    { name: "10DESCUENTO", discount: 0.1 },
    { name: "20DESCUENTO", discount: 0.2 },
  ];

  const cartStore = useCartStore();

  function applyCoupon() {
    if (VALID_COUPONS.some((coupon) => coupon.name === couponInput.value)) {
      couponValidationMessage.value = "Aplicando...";
      setTimeout(() => {
        discountPercentage.value = VALID_COUPONS.find(
          (coupon) => coupon.name === couponInput.value
        ).discount;
        couponValidationMessage.value = "¡Descuento aplicado!";
      }, 1500);
    } else couponValidationMessage.value = "No existe ese cupón";

    setTimeout(() => {
      couponValidationMessage.value = "";
    }, 3000);
  }

  function $reset() {
    couponInput.value = "";
    couponValidationMessage.value = "";
    discountPercentage.value = 0;
    discount.value = 0;
  }

  const isValidCoupon = computed(() => discountPercentage.value > 0);

  watch(discountPercentage, () => {
    discount.value = (cartStore.total * discountPercentage.value).toFixed(0);
  });

  return {
    couponInput,
    couponValidationMessage,
    discount,
    isValidCoupon,
    applyCoupon,
    $reset,
  };
});
