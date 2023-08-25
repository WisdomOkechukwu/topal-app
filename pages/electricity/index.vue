<template>
  <div class="grid grid-cols-12 gap-2 mt-8">
    <div
      class="md:col-span-8 col-span-12 text-custom-primary bg-white rounded-xl sm:shadow-lg p-8 sm:flex items-start justify-between"
    >
      <div class="w-full">
        <div class="flex space-x-4 items-center mb-[5px]">
          <img src="/icons/PowerUtility.svg" class="h-6" />
          <h3 class="font-normal text-lg">Buy Power</h3>
        </div>
        <form
          autocomplete="off"
          class="mt-[50px]"
          @submit.prevent="handleSubmit"
        >
          <div class="mt-[20px]">
            <label class="font-thin text-sm">Electricity Provider</label>
            <select
              v-model="provider"
              class="w-full px-4 pr-12 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            >
              <option :value="null">Choose</option>
              <option
                v-for="(ben, index) in providers"
                :key="index"
                :value="ben"
              >
                {{ ben.name }}
              </option>
            </select>
          </div>

          <div class="mt-[20px]">
            <label class="font-thin text-sm">Account Number</label>
            <input
              v-model="accountnumber"
              class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
              type="text"
              name="accountnumber"
            />
          </div>

          <div class="mt-[20px]">
            <label class="font-thin text-sm">Amount</label>
            <input
              v-model="amount"
              class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
              type="number"
              name="amount"
            />
            <p>{{ amount | currency('₦') }}</p>
          </div>

          <div class="mt-[20px]">
            <button
              type="submit"
              class="font-normal mt-8 rounded-3xl bg-custom-primary w-fit py-3 px-6 text-white tracking-wider hover:bg-opacity-90 text-sm"
            >
              Send Money
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import { sortByLabel } from '~/lib/string'
export default {
  layout: 'auth',
  middleware: 'auth',
  async asyncData({ params, $axios }) {
    try {
      const providers = await $axios.get(`baxi/electricity/providers`)
      console.log(providers.data.data)
      return {
        providers: providers.data.data,
        // beneficaries: beneficaries.data.recipients
      }
    } catch (error) {
      console.log(error)
      window.location.assign('')
    }
  },
  data() {
    return {
      smartcard_number: null,
      product_code: null,
      addon: null,
      accountnumber: null,
      network: null,
      amount: null,
      providers: [],
      provider: null,
      bundle: null,
      listproducts: [],
      listaddons: [],
    }
  },
  methods: {
    async handleSubmit() {
      if (this.provider == null) {
        this.$toast.alert({
          text: 'Provider is required.',
          type: 'error',
          time: 3,
          position: 'top',
        })
        return
      }
      if (this.amount == null) {
        this.$toast.alert({
          text: 'Amount is required.',
          type: 'error',
          time: 3,
          position: 'top',
        })
        return
      }
      if (this.accountnumber == null) {
        this.$toast.alert({
          text: 'Account number is required.',
          type: 'error',
          time: 3,
          position: 'top',
        })
        return
      }

      const params = {
        accountnumber: this.accountnumber,
        service_type: this.provider.service_type,
        amount: this.amount,
      }
      // baxi/cable/buy
      console.log(params)

      await this.$apiservice
        .buyPower(params)
        .then((res) => {
          console.log(res.data.message)

          swal('Success', res.data.message, 'success').then((value) => {
            console.log(value)
            if (value == true) {
              this.$router.push('./')
            }
            this.$router.push('./')
          })
          
        })
        .catch((error) => {
          console.log(error)
          let message
          if ([419, 401, 400].includes(error?.response?.status)) {
            message = error?.response.data?.message
          }
          if ([422].includes(error?.response?.status)) {
            message = Object.values(error?.response.data?.errors)[0][0]
          }
          this.$toast.alert({
            text: message || 'An error occured while trying.',
            type: 'error',
            time: 3,
            position: 'top',
          })
        })
    },
    async onChangeNetwork(event) {
      console.log(this.network.service_type)
      this.listproducts = []
      this.listaddons = []
      ;(this.product_code = null),
        (this.addon = null),
        await this.listProducts()
      await this.listAddon()
    },
    async listProducts() {
      const params = { tv: this.network.service_type }
      this.listproducts = []
      await this.$apiservice
        .listProduct(params)
        .then((res) => {
          this.listproducts = res.data.data
          console.log(res.data.data[0])
        })
        .catch((error) => {
          console.log(error)
          let message
          if ([419, 401, 400].includes(error?.response?.status)) {
            message = error?.response.data?.message
          }
          if ([422].includes(error?.response?.status)) {
            message = Object.values(error?.response.data?.errors)[0][0]
          }
          this.$toast.alert({
            text: message || 'An error occured while trying.',
            type: 'error',
            time: 3,
            position: 'top',
          })
        })
    },

    async listAddon() {
      const params = { tv: this.network.service_type }
      this.listaddons = []
      await this.$apiservice
        .listAddons(params)
        .then((res) => {
          console.log(res.data)
          this.listaddons = res.data.data
        })
        .catch((error) => {
          console.log(error)
          let message
          if ([419, 401, 400].includes(error?.response?.status)) {
            message = error?.response.data?.message
          }
          if ([422].includes(error?.response?.status)) {
            message = Object.values(error?.response.data?.errors)[0][0]
          }
          this.$toast.alert({
            text: message || 'An error occured while trying.',
            type: 'error',
            time: 3,
            position: 'top',
          })
        })
    },
  },
}
</script>
