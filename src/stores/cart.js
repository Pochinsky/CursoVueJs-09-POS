import { ref, computed, watchEffect } from "vue";
import { defineStore } from "pinia";
import { collection, addDoc, runTransaction, doc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { useCouponsStore } from "./coupons";
import { getCurrentDate } from "../helpers";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);
  const subtotal = ref(0);
  const taxes = ref(0);
  const total = ref(0);

  const MAX_PRODUCTS = 5;
  const TAX_RATE = 0.19;

  const couponsStore = useCouponsStore();
  const db = useFirestore();

  function addItem(item) {
    const index = isItemInCart(item.id);
    if (index >= 0) {
      if (isProductAvailable(item, index)) {
        alert("Has alcanzado el límite");
        return;
      }
      items.value[index].quantity++;
    } else items.value.push({ ...item, quantity: 1, id: item.id });
  }

  function updateQuantity(id, quantity) {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id);
  }

  async function checkout() {
    try {
      await addDoc(collection(db, "sales"), {
        items: items.value.map((item) => {
          const { stock, category, ...data } = item;
          return data;
        }),
        subtotal: subtotal.value,
        taxes: taxes.value,
        discount: couponsStore.discount,
        total: total.value,
        date: getCurrentDate(),
      });
      // sustract quantity of the stock
      items.value.forEach(async (item) => {
        const productRef = doc(db, "products", item.id);
        await runTransaction(db, async (transaction) => {
          const currentProduct = await transaction.get(productRef);
          const stock = currentProduct.data().stock - item.quantity;
          transaction.update(productRef, { stock });
        });
      });
      // reset states
      $reset();
      couponsStore.$reset();
    } catch (error) {
      console.log(error);
    }
  }

  function $reset() {
    items.value = [];
    subtotal.value = 0;
    taxes.value = 0;
    total.value = 0;
  }

  const isItemInCart = (id) => items.value.findIndex((item) => item.id === id);

  const isProductAvailable = (item, index) =>
    items.value[index].quantity >= item.stock ||
    items.value[index].quantity >= MAX_PRODUCTS;

  const isEmpty = computed(() => items.value.length === 0);

  const checkProductStock = computed(() => {
    return (product) => (product.stock < 5 ? product.stock : MAX_PRODUCTS);
  });

  watchEffect(() => {
    subtotal.value = items.value.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    taxes.value = parseInt((subtotal.value * TAX_RATE).toFixed(0));
    total.value = subtotal.value + taxes.value - couponsStore.discount;
  });

  return {
    items,
    subtotal,
    taxes,
    total,
    isEmpty,
    checkProductStock,
    addItem,
    updateQuantity,
    removeItem,
    checkout,
  };
});
