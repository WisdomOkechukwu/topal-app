<template>
  <div id="login" class="grid grid-cols-12 w-full min-h-screen">
    <div
      class="sm:col-span-7 col-span-12 w-full md:px-16 md:py-8 px-4 flex flex-col items-center"
    >
      <div class="max-w-sm w-full mx-auto mt-16">
        <div style="margin-bottom: 40px">
          <nuxt-link to="/" class="block mb-16 w-fit">
            <img src="/logo.svg" />
          </nuxt-link>
          <legend class="text-3xl font-semibold text-custom-primary">
            Welcome to myTapol
          </legend>
          <p class="text-md text-gray-400 flex gap-x-2 mt-2 font-normal">
            Congratulations, you have successfully verifed your account.
          </p>
        </div>
        <nuxt-link
          to="/"
          class="font-normal mt-8 rounded-3xl bg-custom-primary w-fit py-3 px-6 text-white tracking-wider hover:bg-opacity-90 text-sm"
        >
          Proceed
        </nuxt-link>
      </div>
    </div>
    <div
      class="sm:col-span-5 bg-contain hidden sm:block"
      style="
        background: url('/backgrounds/tapol-side.svg') no-repeat;
        background-size: cover;
      "
    ></div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  middleware: 'guest',
}
</script>
