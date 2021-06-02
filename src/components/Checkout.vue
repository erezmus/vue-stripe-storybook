<template>
  <div class="p-6 bg-white rounded-xl shadow-md">
    <div class="text-3xl">Checkout</div>
    <div
      class="rounded-md bg-green-500 text-white py-4 px-6 mt-8"
      v-if="isSuccess"
    >
      {{ successMessage }}
    </div>
    <div class="rounded-md bg-red-500 text-white py-4 px-6 mt-8" v-if="isError">
      {{ errorMessage }}
    </div>
    <div class="py-8 text-xl">Total: ${{ paymentIntent.amount / 100 }}</div>
    <div ref="card"></div>
    <button
      class="rounded-lg bg-blue-500 text-white py-2 px-6 mt-10 disabled:opacity-50"
      @click="onConfirm"
      :disabled="isPending"
    >
      {{ isPending ? "Processing..." : "Confirm" }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Checkout",
  props: {
    paymentIntent: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isPending: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  computed: {
    isSuccess() {
      return this.successMessage !== "";
    },
    isError() {
      return this.errorMessage !== "";
    },
  },
  methods: {
    async onConfirm() {
      this.isPending = true;
      this.successMessage = this.errorMessage = "";
      const result = await this.stripe.confirmCardPayment(
        this.paymentIntent.client_secret
      );
      if (result.error) {
        this.errorMessage = "Card Error, please check and try again.";
      } else {
        this.successMessage = "Payment confirmed";
      }
      this.isPending = false;
    },
  },
  mounted() {
    this.stripe = window.Stripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY);
    this.elements = this.stripe.elements();
    this.card = this.elements.create("card");
    this.card.mount(this.$refs.card);
  },
  beforeDestroy() {
    this.card.destroy();
  },
};
</script>
