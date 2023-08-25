<template>
  <div class="grid grid-cols-12 gap-2 mt-8">
    <div
      class="md:col-span-8 col-span-12 text-custom-primary bg-white rounded-xl sm:shadow-lg p-8 sm:flex items-start justify-between"
    >
      <div class="w-full">
        <div class="flex space-x-4 items-center mb-[5px]">
          <img src="/icons/Wallet.svg" class="h-6" />
          <h3 class="font-normal text-lg">Fund BetWay</h3>
        </div>
        <form
          autocomplete="off"
          class="mt-[50px]"
          @submit.prevent="handleSubmit"
        >
          <div class="mt-[20px]">
            <label class="font-thin text-sm">Account Number</label>
            <input
              v-model="accountnumber"
              class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
              type="text"
              name="account_number"
            />
          </div>

          <div class="mt-[20px]">
            <label class="font-thin text-sm">Amount</label>
            <input
              v-model="amount"
              class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
              type="number"
              name="account_number"
            />
            <p>{{ amount | currency('₦') }}</p>
          </div>

          <div class="mt-[20px]">
            <button
              type="submit"
              class="font-normal mt-8 rounded-3xl bg-custom-primary w-fit py-3 px-6 text-white tracking-wider hover:bg-opacity-90 text-sm"
            >
              Submit
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
      amount: null,
      accountnumber: null,
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
      if (this.amount == null) {
        return this.$toast.alert({
          text: 'Amount is required.',
          type: 'error',
          time: 3,
          position: 'top',
        })
      }
      if (this.accountnumber == null) {
        return this.$toast.alert({
          text: 'Account number is required.',
          type: 'error',
          time: 3,
          position: 'top',
        })
      }
      const params = {
        accountnumber: this.accountnumber,
      }
      await this.$apiservice
        .verifyBetway(params)
        .then((res) => {
          console.log(res.data.message)
          this.fundBetway()
          // swal("Success", res.data.message, "success").then((value) => {
          // 	console.log(value)
          // 	if(value == true) {
          // 		this.$router.push('./')
          // 	}
          // 	this.$router.push('./')
          // });
          
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
    async fundBetway() {
      const params = {
        accountnumber: this.accountnumber,
        amount: this.amount,
      }
      await this.$apiservice
        .fundBetway(params)
        .then((res) => {
          console.log(res.data.data)
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
