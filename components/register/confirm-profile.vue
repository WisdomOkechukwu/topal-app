<template>
  <div class="sm:p-8 py-8 px-4 mb-12 sm:mb-0">
    <h3 class="text-2xl font-light text-custom-primary">Confirm Profile</h3>
    <form
      autocomplete="off"
      class="mt-12 grid grid-cols-12 sm:gap-8 gap-y-8"
      @submit.prevent="submit"
    >
      <div class="relative col-span-12">
        <input
          v-model="form.bvn"
          type="number"
          name="bvn"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal"
          placeholder="Residential Address"
          autocomplete="false"
        />
        <label
          class="font-normal text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="bvn"
          >Bank Verification Number</label
        >
      </div>
      <div class="relative sm:col-span-12 col-span-12">
        <select
          id="bankcode"
          v-model="form.bankcode"
          name="bankcode"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal capitalize"
          autocomplete="false"
        >
          <option :value="null" disabled>Choose</option>
          <option v-for="bank in banks" :key="bank.id" :value="bank.code">
            {{ bank.name }}
          </option>
        </select>
        <label
          class="text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="employment_status"
          >Select Bank</label
        >
      </div>

      <div class="relative col-span-12">
        <input
          v-model="form.accountnumber"
          type="number"
          name="accountnumber"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal"
          placeholder="Residential Address"
          autocomplete="false"
        />
        <label
          class="font-normal text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="bvn"
          >Account Number</label
        >
      </div>

      <div class="relative col-span-12">
        <input
          v-model="form.telephone"
          type="number"
          name="telephone"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal"
          placeholder="Residential Address"
          autocomplete="false"
        />
        <label
          class="font-normal text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="telephone"
          >Phone Number</label
        >
      </div>
      <div class="relative col-span-12">
        <input
          v-model="form.password"
          :type="show_password == false ? 'password' : 'text'"
          name="password"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal"
          placeholder="Password"
          autocomplete="false"
        />
        <label
          class="font-normal text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="password"
          >Password</label
        >
        <img
          v-if="!show_password"
          src="/icons/eye.svg"
          style="
            position: relative;
            top: -43px;
            left: 88%;
            height: 30px;
            width: 30px;
            color: #68387d;
          "
          @click="show_password = !show_password"
        />

        <img
          v-if="show_password"
          src="/icons/eyeslash.svg"
          style="
            position: relative;
            top: -43px;
            left: 88%;
            height: 30px;
            width: 30px;
            color: #68387d;
          "
          @click="show_password = !show_password"
        />
      </div>

      <div class="relative col-span-12">
        <input
          v-model="form.password_confirm"
          :type="show_new_password == false ? 'password' : 'text'"
          name="password"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal"
          placeholder="Password Confirmation"
          autocomplete="false"
        />
        <label
          class="font-normal text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="password"
          >Password Confirmation</label
        >

        <img
          v-if="!show_new_password"
          src="/icons/eye.svg"
          style="
            position: relative;
            top: -43px;
            left: 88%;
            height: 30px;
            width: 30px;
            color: #68387d;
          "
          @click="show_new_password = !show_new_password"
        />

        <img
          v-if="show_new_password"
          src="/icons/eyeslash.svg"
          style="
            position: relative;
            top: -43px;
            left: 88%;
            height: 30px;
            width: 30px;
            color: #68387d;
          "
          @click="show_new_password = !show_new_password"
        />
      </div>
      <button
        type="submit"
        class="col-span-12 font-normal rounded-3xl bg-custom-blue-2 py-4 text-custom-primary tracking-wider hover:bg-opacity-90 text-lg"
      >
        Continue
      </button>
    </form>
  </div>
</template>

<script>
import Banks from '~/lib/banklist'
export default {
  name: 'ConfirmProfileRegisteration',
  data: () => ({
    banks: [],
    show_password: false,
    show_new_password: false,
    form: {
      bvn: null,
      password_confirm: null,
      telephone: null,
      password: null,
      bankcode: null,
      accountnumber: null,
    },
  }),
  beforeMount() {
    this.banks = Banks.sort((a, b) => a - b)
  },
  methods: {
    submit() {
      this.$emit('submit', {
        stage: 'confirm-profile',
        data: this.form,
      })
    },
  },
}
</script>
