<template>
  <div class="grid grid-cols-12 gap-2 mt-8">
    <div
      class="md:col-span-8 col-span-12 text-custom-primary bg-white rounded-xl sm:shadow-lg p-8 sm:flex items-start justify-between"
    >
      <div class="w-full">
        <div class="flex space-x-4 items-center mb-[5px]">
          <img src="/icons/Wallet.svg" class="h-6" />
          <h3 class="font-normal text-lg">Buy Cable TV</h3>
        </div>
        <form
          autocomplete="off"
          class="mt-[50px]"
          @submit.prevent="handleSubmit"
        >
          <div class="mt-[20px]">
            <label class="font-thin text-sm">Cable Network</label>
            <select
              v-model="network"
              class="w-full px-4 pr-12 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
              @change="onChangeNetwork($event)"
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

          <div v-if="listproducts.length > 0" class="mt-[20px]">
            <label class="font-thin text-sm">List Bundle</label>
            <select
              v-model="product_code"
              class="w-full px-4 pr-12 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
              @change="onChangeBundle($event)"
            >
              <option :value="null">Choose</option>
              <option
                v-for="(ben, index) in listproducts"
                :key="index"
                :value="ben"
              >
                {{ ben.name }}
                {{ ben.availablePricingOptions[0].price | currency('₦') }}
              </option>
            </select>
          </div>

          <div v-if="product_code != null" class="mt-[20px]">
            <label class="font-thin text-sm">Plan Months</label>
            <select
              v-model="plan_amount"
              class="w-full px-4 pr-12 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            >
              <option :value="null">Choose</option>
              <option
                v-for="(ben, index) in product_code.availablePricingOptions"
                :key="index"
                :value="ben"
              >
                {{ product_code.name }} {{ ben.monthsPaidFor }}
                {{ ben.monthsPaidFor | pluralize('month') }}
                {{ ben.price | currency('₦') }}
              </option>
            </select>
          </div>

          <div v-if="listaddons.length > 0" class="mt-[20px]">
            <label class="font-thin text-sm">List Addons</label>
            <select
              v-model="addon"
              class="w-full px-4 pr-12 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            >
              <option :value="null">Choose</option>
              <option
                v-for="(ben, index) in listaddons"
                :key="index"
                :value="ben"
              >
                {{ ben.name }}
                {{ ben.availablePricingOptions[0].price | currency('₦') }}
              </option>
            </select>
          </div>

          <div v-if="addon != null" class="mt-[20px]">
            <label class="font-thin text-sm">Addon Months</label>
            <select
              v-model="addon_amount"
              class="w-full px-4 pr-12 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            >
              <option :value="null">Choose</option>
              <option
                v-for="(ben, index) in addon.availablePricingOptions"
                :key="index"
                :value="ben.price"
              >
                {{ addon.name }} {{ ben.monthsPaidFor }}
                {{ ben.monthsPaidFor | pluralize('month') }}
                {{ ben.price | currency('₦') }}
              </option>
            </select>
          </div>

          <div class="mt-[20px]">
            <label class="font-thin text-sm">Smart Card Number</label>
            <input
              v-model="smartcard_number"
              class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
              type="text"
              name="smartcard_number"
            />
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
      const providers = await $axios.get(`baxi/cable/providers`)
      return {
        providers: providers.data.data.providers,
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
      plan_amount: null,
      addon_amount: null,
      addon: null,
      network: null,
      providers: [],
      bundle: null,
      listproducts: [],
      listaddons: [],
    }
  },
  methods: {
    onChangeBundle(event) {
      this.plan_amount = null
      this.addon_amount = null
    },
    async handleSubmit() {
      console.log(this.product_code.availablePricingOptions[0].price)
      if (this.product_code == null) {
        this.$toast.alert({
          text: 'Product is required.',
          type: 'error',
          time: 3,
          position: 'top',
        })
        return
      }

      if (this.plan_amount == null) {
        this.$toast.alert({
          text: 'Plan amount is required.',
          type: 'error',
          time: 3,
          position: 'top',
        })
        return
      }
      // addon_amount

      if (this.smartcard_number == null) {
        this.$toast.alert({
          text: 'Smart Card Number is required.',
          type: 'error',
          time: 3,
          position: 'top',
        })
        return
      }
      if (this.network == null) {
        this.$toast.alert({
          text: 'Network is required.',
          type: 'error',
          time: 3,
          position: 'top',
        })
        return
      }
      let addon_price = 0
      if (this.addon != null) {
        addon_price = this.addon.availablePricingOptions[0].price
      }
      const params = {
        smartcard_number: this.smartcard_number,
        product_code: this.product_code.code,
        addon_code: this.addon?.code,
        month: this.plan_amount.monthsPaidFor,
        tv: this.network.service_type,
        amount: this.addon_amount + this.plan_amount.price,
      }
      // baxi/cable/buy
      console.log(params)

      await this.$apiservice
        .sendTv(params)
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
