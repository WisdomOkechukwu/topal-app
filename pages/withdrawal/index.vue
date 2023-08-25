<template>
  <div class="grid grid-cols-12 gap-2 mt-8">
    <div
      class="md:col-span-8 col-span-12 text-custom-primary bg-white rounded-xl sm:shadow-lg p-8 sm:flex items-start justify-between"
    >
      <div v-if="status == 0" class="w-full">
        <div class="flex space-x-4 items-center mb-[5px]">
          <img src="/icons/Wallet.svg" class="h-6" />
          <h3 class="font-normal text-lg">Withdrawal</h3>
        </div>
        <form
          autocomplete="off"
          class="mt-[50px]"
          @submit.prevent="handleSubmit"
        >
          <div class="col-span-2 sm:col-span-1">
            <label class="font-thin text-sm">Amount</label>
            <input
              v-model="wamount"
              v-cleave="{
                numeral: true,
                numeralThousandsGroupStyle: 'thousand',
                prefix: '₦ ',
              }"
              class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
              type="text"
              min="15000"
              name="amount"
            />
            <p class="text-[10px] mt-2 font-extrabold">
              Account Balance: {{ balance | currency('₦') }}
            </p>
          </div>

          <div class="mt-[20px]">
            <label class="font-thin text-sm">Send To</label>
            <select
              v-model="sendto"
              class="w-full px-4 pr-12 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            >
              <option
                v-for="(ben, index) in beneficaries"
                :key="index"
                :value="ben"
              >
                {{ ben.fullname }}
              </option>
              <option :value="null">Choose</option>
              <option value="new">New Contact</option>
            </select>
          </div>

          <div v-if="sendto == 'new'" class="mt-[20px]">
            <label class="font-thin text-sm">Account Number</label>
            <input
              v-model="form.accountnumber"
              class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
              type="text"
              name="account_number"
            />
          </div>

          <div v-if="sendto == 'new'" class="mt-[20px]">
            <label class="font-thin text-sm">Bank</label>
            <select
              v-model="form.bankcode"
              class="w-full px-4 pr-12 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            >
              <option :value="null">Choose</option>
              <option
                v-for="(bank, index) in banks"
                :key="index"
                :value="bank.code"
              >
                {{ bank.name }}
              </option>
            </select>
          </div>

          <div class="mt-[20px]">
            <label class="font-thin text-sm">Add a note</label>
            <textarea
              v-model="form.note"
              class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            >
            </textarea>
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

      <div v-if="status == 1" class="w-full">
        <div class="flex space-x-4 items-center mb-[5px]">
          <img src="/icons/Wallet.svg" class="h-6" />
          <h3 class="font-normal text-lg">Withdrawal Confirmation</h3>
        </div>
        <form
          autocomplete="off"
          class="grid grid-cols-2 gap-8 mt-[50px]"
          @submit.prevent="confirmTransfer"
        >
          <div class="col-span-2 sm:col-span-1">
            <label class="font-thin text-sm">From</label>
            <p>{{ $auth.user.customer_id }}</p>
          </div>

          <div class="col-span-2 sm:col-span-1">
            <label class="font-thin text-sm">Transaction Fee</label>
            <p>{{ '50' | currency('₦') }}</p>
          </div>

          <div class="col-span-2 sm:col-span-1">
            <label class="font-thin text-sm">Transfer To</label>
            <p>{{ intationResponse.recipient_name }}</p>
          </div>

          <div class="col-span-2 sm:col-span-1">
            <label class="font-thin text-sm">Amount</label>
            <p>{{ form.amount | currency('₦') }}</p>
          </div>

          <div class="col-span-2 sm:col-span-1">
            <label class="font-thin text-sm">Beneficary Bank</label>
            <p>{{ bankselected }}</p>
          </div>

          <div class="col-span-2 sm:col-span-1">
            <label class="font-thin text-sm">Description </label>
            <p>{{ form.note }}</p>
          </div>

          <div class="col-span-2 sm:col-span-1">
            <label class="font-thin text-sm">OTP</label>
            <input
              v-model="otp"
              class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
              type="text"
              minLength="6"
              name="amount"
            />
          </div>

          <div class="mt-[20px] col-span-2 sm:col-span-2">
            <button
              type="submit"
              class="font-normal mt-8 rounded-3xl bg-custom-primary w-fit py-3 px-6 text-white tracking-wider hover:bg-opacity-90 text-sm mr-[20px]"
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
  name: 'WithdrawalList',
  components: {},
  layout: 'auth',
  middleware: 'auth',
  async asyncData({ params, $axios }) {
    try {
      const banks = await $axios.get(`utility/banks`)
      const beneficaries = await $axios.get(`customer/beneficiaries/list`)
      console.log(beneficaries.data.recipients)
      return {
        banks: banks.data.data,
        beneficaries: beneficaries.data.recipients,
      }
    } catch (error) {
      console.log(error)
      // window.location.assign('')
    }
  },
  data() {
    return {
      sendto: null,
      status: 0,
      isFundWalletModalOpen: false,
      isWithdrawWalletModalOpen: false,
      balance: 0,
      wamount: null,
      banks: [],
      beneficaries: [],
      intationResponse: null,
      otp: null,
      form: {
        amount: null,
        bankcode: null,
        accountnumber: null,
        note: null,
        accountname: null,
      },
    }
  },

  head() {
    return {
      title: 'Withdrawal | Tapol',
    }
  },
  computed: {
    bankselected () {
      return this.banks.find((e) => e.code == this.form.bankcode).name
    },
  },
  watch: {
    async wamount(newQuestion, oldQuestion) {
      const amnt = this.wamount
        ?.toString()
        .replace('₦ ', '')
        .replace(',', '')
        .replace(',', '')
      this.form.amount = amnt
    },
    async sendto(newBen, oldBen) {
      console.log(typeof newBen)
      if (newBen != null && newBen != 'new') {
        console.log(newBen)
        this.form.bankcode = newBen.bankcode
        this.form.accountnumber = newBen.accountnumber
      }
    },
  },
  created() {
    this.balance = this.$auth.user?.wallet?.balance
  },
  async beforeMount() {},
  methods: {
    validateForm() {
      console.log(this.form)
      if (this.form.accountnumber == null || this.form.accountnumber == '') {
        this.$toast.alert({
          text: 'Account number is required',
          type: 'error',
          time: 3,
          position: 'top',
        })
        return
      }

      if (this.form.amount == null || this.form.amount == '') {
        this.$toast.alert({
          text: 'Amount is required',
          type: 'error',
          time: 3,
          position: 'top',
        })
        return
      }
      if (this.form.bankcode == null || this.form.bankcode == '') {
        this.$toast.alert({
          text: 'Bank is required',
          type: 'error',
          time: 3,
          position: 'top',
        })
        return
      }
      if (this.form.note == null || this.form.note == '') {
        this.$toast.alert({
          text: 'Note is required',
          type: 'error',
          time: 3,
          position: 'top',
        })
        
      }
    },
    async confirmTransfer() {
      if (this.otp == null || this.otp == '') {
        this.$toast.alert({
          text: 'OTP is required',
          type: 'error',
          time: 3,
          position: 'top',
        })
        return
      }
      const params = {
        customer_id: this.$auth.user.customer_id,
        reference_id: this.intationResponse.reference_id,
        otp: this.otp,
      }
      await this.$apiservice
        .confirmTransfer(params)
        .then((res) => {
          this.intationResponse = res.data
          console.log(this.intationResponse)
          swal('Success', this.intationResponse.message, 'success').then(
            (value) => {
              console.log(value)
              if (value == true) {
                this.$router.push('./')
              }
              this.$router.push('./')
            }
          )
          return
          this.status = 1
        })
        .catch((error) => {
          let message
          if ([419, 401, 400].includes(error?.response?.status)) {
            message = error?.response.data?.message
          }
          if ([422].includes(error?.response?.status)) {
            message = Object.values(error?.response.data?.errors)[0][0]
          }

          this.$toast.alert({
            text: message || 'An error occured while trying to login',
            type: 'error',
            time: 3,
            position: 'top',
          })
        })
    },
    async handleSubmit() {
      this.validateForm()
      console.log(this.form)
      const params = this.form
      await this.$apiservice
        .initiateTransfer(params)
        .then((res) => {
          this.intationResponse = res.data
          console.log(this.intationResponse)
          this.status = 1
        })
        .catch((error) => {
          let message
          if ([419, 401, 400].includes(error?.response?.status)) {
            message = error?.response.data?.message
          }
          if ([422].includes(error?.response?.status)) {
            message = Object.values(error?.response.data?.errors)[0][0]
          }

          this.$toast.alert({
            text: message || 'An error occured while trying to login',
            type: 'error',
            time: 3,
            position: 'top',
          })
        })
    },
  },
}
</script>
