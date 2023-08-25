<template>
  <div class="grid grid-cols-12 gap-2 mt-8">
    <div
      class="md:col-span-8 col-span-12 text-custom-primary bg-white rounded-xl sm:shadow-lg p-8 sm:flex items-start justify-between"
    >
      <div class="w-full">
        <div class="flex space-x-4 items-center mb-[5px]">
          <img src="/icons/Wallet.svg" class="h-6" />
          <h3 class="font-normal text-lg">Buy data</h3>
        </div>
        <form
          autocomplete="off"
          class="mt-[50px]"
          @submit.prevent="handleSubmit"
        >
          <div class="mt-[20px]">
            <label class="font-thin text-sm">Network Provider</label>
            <select
              v-model="network"
              class="w-full px-4 pr-12 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
              @change="onChangeNetwork($event)"
            >
              <option :value="null">Choose</option>
              <option
                v-for="(ben, index) in mobileDataProviders"
                :key="index"
                :value="ben.value"
              >
                {{ ben.label | capitalize }}
              </option>
            </select>
          </div>

          <div v-if="mobileDataProviderBundles.length > 0" class="mt-[20px]">
            <label class="font-thin text-sm">Data Provider Bundles</label>
            <select
              v-model="mobilepackage"
              class="w-full px-4 pr-12 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            >
              <option :value="null">Choose</option>
              <option
                v-for="(ben, index) in mobileDataProviderBundles"
                :key="index"
                :value="ben"
              >
                {{ ben.label }} {{ ben.price | currency('₦') }}
              </option>
            </select>
          </div>

          <div class="mt-[20px]">
            <label class="font-thin text-sm">Phone Number</label>
            <input
              class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
              type="text"
              name="account_number"
              @input="debounceSearch"
            />
          </div>

          <div class="mt-[20px]">
            <button
              type="submit"
              class="font-normal mt-8 rounded-3xl bg-custom-primary w-fit py-3 px-6 text-white tracking-wider hover:bg-opacity-90 text-sm"
            >
              Buy Data
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
  data() {
    return {
      sendto: null,
      network: null,
      mobilepackage: null,
      mobileDataProviders: [
        {
          label: 'airtel',
          value: 'airtel',
        },
        {
          label: 'mtn',
          value: 'mtn',
        },
        {
          label: '9mobile',
          value: '9mobile',
        },
        {
          label: 'smile',
          value: 'smile',
        },
        {
          label: 'glo',
          value: 'glo',
        },
        {
          label: 'dstvshowmax',
          value: 'dstvshowmax',
        },
        {
          label: 'spectranet',
          value: 'spectranet',
        },
      ],
      debounce: null,
      showaccountnumber: null,
      accountnumber: null,
      mobileDataProviderBundles: [],
    }
  },
  methods: {
    debounceSearch(event) {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.accountnumber = event.target.value
        if (this.network == 'spectranet') {
          this.onChangeNetworkAcount()
        }
      }, 600)
    },
    async handleSubmit() {
      if (this.mobilepackage == null) {
        return this.$toast.alert({
          text: 'Mobile package is required.',
          type: 'error',
          time: 3,
          position: 'top',
        })
      }
      if (this.accountnumber == null) {
        return this.$toast.alert({
          text: 'Phone number is required.',
          type: 'error',
          time: 3,
          position: 'top',
        })
      }
      const params = {
        network: this.network,
        accountnumber: this.accountnumber,
        amount: this.mobilepackage.price,
        telephone: this.accountnumber,
        data_code: this.mobilepackage.datacode,
      }
      await this.$apiservice
        .sendData(params)
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
    async onChangeNetworkAcount() {
      const params = {
        network: this.network,
        accountnumber: this.accountnumber,
      }
      this.mobileDataProviderBundles = []
      await this.$apiservice
        .providerData(params)
        .then((res) => {
          console.log(res.data.data)
          this.mobileDataProviderBundles = res.data.data
            .map((r) => ({
              label: r.name,
              value: r.price,
              prize: r.prize,
              ...r,
            }))
            .sort(sortByLabel)
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
      console.log(event.target.value)
      this.mobileDataProviderBundles = []
      this.showaccountnumber = null
      if (event.target.value == 'spectranet') {
        this.showaccountnumber = true
        this.$toast.alert({
          text: 'Account number is required',
          type: 'error',
          time: 3,
          position: 'top',
        })
        return
      }
      const params = {
        network: event.target.value,
        accountnumber: this.accountnumber,
      }
      this.mobileDataProviderBundles = []
      await this.$apiservice
        .providerData(params)
        .then((res) => {
          console.log(res.data.data)
          this.mobileDataProviderBundles = res.data.data
            .map((r) => ({
              label: r.name,
              value: r.price,
              prize: r.prize,
              ...r,
            }))
            .sort(sortByLabel)
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
