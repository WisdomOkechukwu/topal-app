<template>
  <div class="sm:p-8 py-8 px-4 mb-12 sm:mb-0">
    <h3 class="text-2xl font-light text-custom-primary">
      Your Location & Work Information
    </h3>
    <form
      autocomplete="off"
      class="mt-12 grid grid-cols-12 sm:gap-8 gap-y-8"
      @submit.prevent="submit"
    >
      <div class="relative col-span-12">
        <input
          v-model="form.residential_address"
          type="text"
          name="residential_address"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal"
          placeholder="Residential Address"
          autocomplete="false"
        />
        <label
          class="font-normal text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="residential_address"
          >Residential Address</label
        >
      </div>
      <div class="relative sm:col-span-12 col-span-12">
        <select
          id="employment_status"
          v-model="form.employment_status"
          name="employment_status"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal capitalize"
          autocomplete="false"
        >
          <option :value="null" disabled>Choose</option>
          <option value="employed">employed</option>
          <option value="unemployed">unemployed</option>
          <option value="self-employed">self-employed</option>
          <!-- <option value="student">student</option> -->
        </select>
        <label
          class="text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="employment_status"
          >Employment Status</label
        >
      </div>
      <div
        v-if="form.employment_status != 'unemployed'"
        class="relative sm:col-span-6 col-span-12"
      >
        <input
          id="company_name"
          v-model="form.company_name"
          type="text"
          name="company_name"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal"
          autocomplete="false"
          placeholder="Name of Company"
          @change="changeCompl()"
        />
        <label
          class="text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="company_name"
          >Name of Company</label
        >
      </div>
      <div
        v-if="form.employment_status != 'unemployed'"
        class="relative sm:col-span-6 col-span-12"
      >
        <input
          id="company_name"
          v-model="form.company_location"
          type="text"
          name="company_name"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal"
          autocomplete="false"
          placeholder="Company Location"
        />
        <label
          class="text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="company_name"
          >Company Location</label
        >
      </div>
      <div class="relative sm:col-span-6 col-span-12">
        <select
          id="state"
          v-model="form.state"
          name="state"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal capitalize"
          autocomplete="false"
        >
          <option :value="null" disabled>Choose</option>
          <option v-for="(state, i) in states" :key="i" :value="state">
            {{ state }}
          </option>
        </select>
        <label
          class="text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="state"
          >State</label
        >
      </div>
      <div class="relative sm:col-span-6 col-span-12">
        <select
          id="city"
          v-model="form.city"
          name="city"
          class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-normal capitalize"
          autocomplete="false"
        >
          <option :value="null" disabled>Choose</option>
          <option v-for="(lga, i) in lgas" :key="i" :value="lga">
            {{ lga }}
          </option>
        </select>
        <label
          class="text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="city"
          >City/L.G.A.</label
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
import States from '~/lib/states-and-capital'
export default {
  name: 'WorkStatusRegisteration',
  props: {},
  data: () => ({
    states: [],
    lgas: [],
    form: {
      residential_address: null,
      company_name: null,
      business_location: null,
      city: null,
      state: null,
      employment_status: null,
    },
  }),
  watch: {
    'form.state'(newVal) {
      const find = States.find((state) => state.state === newVal)
      this.form.city = null
      if (find) {
        this.lgas = find.lgas
      } else this.lgas = []
    },
  },
  beforeMount() {
    this.states = States.map((state) => state.state)
  },
  methods: {
    changeCompl() {
      if (this.form.employment_status == 'unemployed') {
        this.form.company_location = ''
        this.form.company_name = ''
      }
    },
    submit() {
      this.$emit('submit', {
        stage: 'work-status',
        data: this.form,
      })
    },
  },
}
</script>
