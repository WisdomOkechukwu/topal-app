<template>
  <div class="mt-8 px-8 sm:px-0">
    <div
      v-if="status === 'success'"
      class="max-w-[450px] rounded-xl border border-gray-200 bg-white mx-auto sm:p-8 p-4"
    >
      <legend
        class="text-xl font-light text-center mb-4 text-custom-primary w-fit mx-auto"
      >
        Success 🎉
      </legend>
      <p class="font-light text-base text-gray-500 text-center">
        Your payment was processed successfully.
      </p>
      <nuxt-link
        to="/"
        class="mt-4 font-light text-center text-sm block text-gray-600 border-b border-custom-primary w-fit mx-auto"
        >Proceed to dashboard</nuxt-link
      >
    </div>
    <div
      v-else
      class="max-w-[450px] rounded-xl border border-gray-200 bg-white mx-auto sm:p-8 p-4"
    >
      <legend class="text-xl font-light text-center mb-4 text-custom-primary">
        Failed 💔
      </legend>
      <p class="font-light text-base text-gray-500 text-center">
        Your payment failed to be processed successfully.
      </p>
      <nuxt-link
        to="/"
        class="mt-4 font-light text-center text-sm block text-gray-600 border-b border-custom-primary w-fit mx-auto"
        >Proceed to dashboard</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentsCallbackPage',
  layout: 'callback',
  middleware: 'auth',
  data() {
    return {
      status: undefined,
    }
  },
  beforeMount() {
    this.status = new URL(window.location.href).searchParams.get(
      'transaction_status'
    )
  },
}
</script>
