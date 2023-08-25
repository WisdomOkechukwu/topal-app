<template>
  <div class="sm:p-8 py-8 px-4 mb-12 sm:mb-0">
    <h3 class="text-2xl font-light text-custom-primary">
      Let's get to know you better
    </h3>
    <form
      autocomplete="off"
      class="mt-12 grid grid-cols-12 sm:gap-8 gap-y-8"
      @submit.prevent="submit"
    >
      <div class="relative sm:col-span-6 col-span-12">
        <input
          id="firstname"
          v-model="form.firstname"
          type="text"
          name="firstname"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal"
          autocomplete="false"
          placeholder="Your first name"
        />
        <label
          class="text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="firstname"
          >First Name</label
        >
      </div>
      <div class="relative sm:col-span-6 col-span-12">
        <input
          id="lastname"
          v-model="form.lastname"
          name="lastname"
          type="text"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal"
          autocomplete="false"
          placeholder="Your last name"
        />
        <label
          class="text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="lastname"
          >Last Name</label
        >
      </div>
      <div class="relative col-span-12">
        <input
          v-model="form.email"
          type="email"
          name="email"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal"
          placeholder="Your email address"
          autocomplete="false"
        />
        <label
          class="font-normal text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="email"
          >Email Address</label
        >
      </div>

      <div class="relative sm:col-span-6 col-span-12">
        <select
          id="gender"
          v-model="form.gender"
          name="gender"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal"
          autocomplete="false"
        >
          <option :value="null">Choose</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label
          class="text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="gender"
          >Gender</label
        >
      </div>

      <div class="relative sm:col-span-6 col-span-12">
        <select
          id="marital_status"
          v-model="form.marital_status"
          name="marital_status"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal capitalize"
          autocomplete="false"
        >
          <option :value="null">Choose</option>
          <option value="single">single</option>
          <option value="married">married</option>
          <option value="seperated">seperated</option>
          <option value="divorced">divorced</option>
          <option value="widowed">widowed</option>
        </select>
        <label
          class="text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="marital_status"
          >Marital Status</label
        >
      </div>
      <button
        type="submit"
        class="col-span-12 font-normal rounded-3xl bg-custom-blue-2 py-4 text-custom-primary tracking-wider hover:bg-opacity-90 text-lg"
      >
        Next
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PersonalRegisteration',
  data: () => ({
    form: {
      firstname: null,
      lastname: null,
      email: null,
      gender: null,
      marital_status: null,
    },
  }),
  methods: {
    submit() {
      this.$emit('submit', {
        stage: 'personal',
        data: this.form,
      })
    },
  },
}
</script>
