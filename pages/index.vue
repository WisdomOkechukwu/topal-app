<template>
  <div class="grid grid-cols-12 gap-8 mt-8">
    <div
      class="md:col-span-8 col-span-12 text-custom-primary bg-white rounded-xl sm:shadow-lg p-8 sm:flex grid grid-cols-2 items-start justify-between"
    >
      <div class="h-full col-span-2">
        <div class="flex space-x-4 items-center">
          <img src="/icons/Wallet.svg" class="h-6" />
          <h3 class="font-normal text-lg">My Wallet</h3>
        </div>
        <div class="mt-8 flex justify-between flex-col gap-y-16">
          <h1 class="font-semibold text-3xl">{{ walletBalance }}</h1>
          <div class="flex space-x-4">
            <button
              class="border border-custom-primary text-xs px-4 py-2 rounded-3xl hover:text-white hover:bg-custom-primary"
              @click.prevent="isFundWalletModalOpen = true"
            >
              Fund Wallet
            </button>
            <nuxt-link
              class="border border-custom-primary text-xs px-4 py-2 rounded-3xl hover:text-white hover:bg-custom-primary"
              to="/withdrawal"
              @click.prevent="active = 'withdrawal'"
            >
              Withdraw
            </nuxt-link>
          </div>
        </div>
      </div>
      <div
        class="bg-custom-white-2 rounded-xl p-8 sm:h-full flex flex-col sm:justify-between col-span-2 mt-8 sm:mt-0 h-fit"
      >
        <h5 class="font-light text-base max-w-[150px] sm:h-full h-fit">
          Enjoy interest rates on your <strong>savings plan</strong>.
        </h5>
        <nuxt-link
          class="border border-custom-primary sm:mt-16 mt-4 text-xs px-4 py-2 rounded-3xl text-center hover:text-white hover:bg-custom-primary"
          to="/savings"
          @click.prevent="active = 'savings'"
        >
          Start a Plan
        </nuxt-link>
      </div>
    </div>
    <div
      v-if="$auth.user.active_loans.length != 0"
      class="md:col-span-4 col-span-12 text-custom-primary bg-custom-blue-3 rounded-xl p-8 flex flex-col justify-between"
    >
      <div class="flex space-x-4 items-center">
        <img src="/icons/MyLoans1.svg" class="h-6" />
        <h3 class="font-normal text-lg">My Loans</h3>
      </div>
      <h5 class="font-light text-sm max-w-[150px] h-full mt-8">
        Payment for {{ $auth.user.active_loans[0].loan_reason }} due in <strong class="text-red-500">{{ $auth.user.active_loans[0].days_left }}.</strong><br />
        Tab below to pay
      </h5>
      <nuxt-link
        to="/loan/request"
        class="border border-custom-primary text-xs px-4 py-2 rounded-3xl w-fit flex items-center gap-x-2 mt-4 sm:mt-0"
      >
        Pay Loan
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3 text-current"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </nuxt-link>
    </div>
    <div
      v-if="$auth.user.waiting_loans.length != 0"
      class="md:col-span-4 col-span-12 text-custom-primary bg-custom-blue-3 rounded-xl p-8 flex flex-col justify-between"
    >
      <div class="flex space-x-4 items-center">
        <img src="/icons/MyLoans1.svg" class="h-6" />
        <h3 class="font-normal text-lg">My Loans</h3>
      </div>
      <h5 class="font-light text-sm h-full mt-8">
        Your loan application is being processed, you will be notified of the
        outcome.
      </h5>
      <nuxt-link
        to="/loan/request"
        class="border border-custom-primary text-xs px-4 py-2 rounded-3xl w-fit flex items-center gap-x-2 mt-4 sm:mt-0"
      >
        View Loan History
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3 text-current"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </nuxt-link>
    </div>
    <div
      v-if="$auth.user.active_loans.length == 0 && $auth.user.waiting_loans.length == 0"
      class="md:col-span-4 col-span-12 text-custom-primary bg-custom-blue-3 rounded-xl p-8 flex flex-col justify-between"
    >
      <div class="flex space-x-4 items-center">
        <img src="/icons/MyLoans1.svg" class="h-6" />
        <h3 class="font-normal text-lg">My Loans</h3>
      </div>
      <h5 class="font-light text-sm max-w-[150px] h-full mt-8">
        No pending loan
      </h5>
      <nuxt-link
        to="/loan/request"
        class="border border-custom-primary text-xs px-4 py-2 rounded-3xl w-fit flex items-center gap-x-2 mt-4 sm:mt-0"
      >
        Apply for loan
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3 text-current"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </nuxt-link>
    </div>
    <div
      class="md:col-span-6 col-span-12 text-custom-primary bg-custom-blue-3 rounded-xl p-8 flex flex-col justify-between"
    >
      <div class="flex space-x-4 justify-items-start items-start flex-col">
        <div class="flex">
          <img src="/icons/Transaction.svg" class="h-6 mr-[10px]" />
          <h3 class="font-semibold text-lg">Transactions</h3>
        </div>

        <div style="margin-left: 0">
          <table class="">
            <tr v-if="loadingSkeleton == true">
              <td class="text-left px-8 py-4">
                <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
              </td>
              <td class="text-left px-8 py-4">
                <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
              </td>
            </tr>

            <tr v-if="loadingSkeleton == true">
              <td class="text-left px-8 py-4">
                <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
              </td>
              <td class="text-left px-8 py-4">
                <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
              </td>
            </tr>

            <tr v-if="loadingSkeleton == true">
              <td class="text-left px-8 py-4">
                <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
              </td>
              <td class="text-left px-8 py-4">
                <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
              </td>
            </tr>

            <tr v-for="(key, i) in transactionResponseData" :key="i">
              <td class="px-8 py-4">
                <div class="flex flex-col justify-center">
                  <p style="font-weight: 300; color: grey">
                    {{ key.created_at | dateFormat('YYYY.MM.DD') }}
                  </p>
                </div>
              </td>
              <td class="px-8 py-4">
                <p style="color: grey">{{ key.message }}</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div
      class="md:col-span-6 col-span-12 text-custom-primary bg-custom-pink-2 rounded-xl p-8 flex flex-col justify-between min-h-[300px]"
    >
      <div class="flex space-x-4 items-center">
        <img src="/icons/Payments.svg" class="h-6" />
        <h3 class="font-semibold text-lg">Payments</h3>
      </div>
      <h5 class="font-light text-sm h-full my-4">
        Get your daily or monthly <strong>subscriptions</strong> running.
      </h5>

      <div role="button" class="flex items-center justify-between">
        <div
          class="flex flex-col flex-1 text-center justify-start gap-y-2 cursor-pointer p-3 px-4 rounded-lg hover:bg-pink-50"
          @click.prevent="isAirtimeModalOpen = true"
        >
          <img src="/icons/Airtime.svg" class="h-8" />
          <h3 class="font-normal text-sm">Airtime</h3>
        </div>
        <div
          class="flex flex-col flex-1 text-center justify-start gap-y-2 cursor-pointer p-3 px-4 rounded-lg hover:bg-pink-50"
          @click.prevent="buydata('./buydata')"
        >
          <img src="/icons/Data_Bundle.svg" class="h-8" />
          <h3 class="font-normal text-sm">Data Bundle</h3>
        </div>
        <div
          class="flex flex-col flex-1 text-center justify-start gap-y-2 cursor-pointer p-3 px-4 rounded-lg hover:bg-pink-50"
          @click.prevent="buydata('./cabletv')"
        >
          <img src="/icons/PowerUtility.svg" class="h-8" />
          <h3 class="font-normal text-sm">Cable TV</h3>
        </div>
      </div>
      <div role="button" class="flex items-center justify-between">
        <div
          class="flex flex-col flex-1 text-center justify-start gap-y-2 cursor-pointer p-3 px-4 rounded-lg hover:bg-pink-50"
          @click.prevent="buydata('./electricity')"
        >
          <img src="/icons/PowerUtility.svg" class="h-8" />
          <h3 class="font-normal text-sm">Electricity</h3>
        </div>

        <div
          class="flex flex-col flex-1 text-center justify-start gap-y-2 cursor-pointer p-3 px-4 rounded-lg hover:bg-pink-50"
          @click.prevent="buydata('./betting')"
        >
          <img src="/icons/PowerUtility.svg" class="h-8" />
          <h3 class="font-normal text-sm">Betting</h3>
        </div>
      </div>
    </div>
    <fund-wallet-modal
      :is-open="isFundWalletModalOpen"
      @close="isFundWalletModalOpen = false"
    />
    <withdraw-wallet-modal
      :is-open="isWithdrawWalletModalOpen"
      @close="isWithdrawWalletModalOpen = false"
    />
    <airtime-modal
      :is-open="isAirtimeModalOpen"
      :providers="airtimeProviders"
      @close="isAirtimeModalOpen = false"
    />
    <mobile-data-modal
      :is-open="isMobileDataModalOpen"
      :providers="mobileDataProviders"
      :bundles="mobileDataProviderBundles"
      @close="isMobileDataModalOpen = false"
      @service-changed="handleMobileServiceProviderChanged"
    />
  </div>
</template>

<script>
import swal from 'sweetalert'
import { sortByLabel } from '~/lib/string'
export default {
  name: 'IndexPage',
  components: {
    'fund-wallet-modal': () => import('../components/wallet/FundWalletModal'),
    'withdraw-wallet-modal': () =>
      import('../components/wallet/WithdrawWalletModal'),
    'airtime-modal': () => import('../components/airtime/AirtimeModal'),
    'mobile-data-modal': () => import('../components/mobile-data/MobileData'),
  },
  layout: 'auth',
  middleware: 'auth',
  async asyncData({ params, $axios }) {
    try {
      const banks = await $axios.post(`baxi/airtime-data/providers`, {
        type: 'airtime',
      })
      console.log(banks.data.data.providers)
      return {
        airtimeProviders: banks.data.data.providers.map((r) => ({
          label: r.name,
          value: r.service_type,
          shortname: r.shortname,
          biller_id: r.biller_id,
          product_id: r.product_id,
        })),
        // beneficaries: beneficaries.data.recipients
      }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      showBundle: true,
      isFundWalletModalOpen: false,
      isWithdrawWalletModalOpen: false,
      isAirtimeModalOpen: false,
      isMobileDataModalOpen: false,
      loadingSkeleton: false,
      airtimeProviders: [],
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
      mobileDataProviderBundles: [],
      electricityProviders: [],
      transactionResponse: null,
      transactionResponseData: [],
      electricityProviderBundles: [],
    }
  },

  head() {
    return {
      title: 'Home | Tapol',
    }
  },
  computed: {
    walletBalance() {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      }).format(+(this.$auth.user?.wallet?.balance ?? 0.0))
    },
  },
  created() {
    this.$nuxt.$on('closefunding', () => {
      this.isFundWalletModalOpen = false
    })
    console.log(this.$auth.user.forgot_password_status)
    if (this.$auth.user.forgot_password_status == '1') {
      swal('Notification', 'Proceed to Settings to change your password.').then(
        (res) => {
          this.$router.push('/profile')
        }
      )
    }
  },
  async beforeMount() {
    try {
      await Promise.all([
        await this.$auth.fetchUser(),
        await this.listTransaction(),
        // await this.getAirtimeProviders(),
        // await this.getMobileDataProviders(),
        await this.getElectricityProviders(),
      ])
    } catch (error) {}
  },
  methods: {
    buydata(value) {
      this.$router.push(value)
    },
    showMobileModal() {
      const nav = document.getElementById('responsive-dropdown')
      const checker = document.getElementById('dropdown-checker')

      if (checker.value === 'closed') {
        document
          .getElementById('responsive-dropdown')
          .classList.remove('hidden')
        document.getElementById('responsive-dropdown').classList.add('flex')
        checker.value = 'opened'
      } else {
        document.getElementById('responsive-dropdown').classList.remove('flex')
        document.getElementById('responsive-dropdown').classList.add('hidden')
        checker.value = 'closed'
      }
    },

    async listTransaction() {
      const param = {
        page_size: 3,
      }
      this.loadingSkeleton = true
      this.transactionResponse = null
      this.transactionResponseData = []
      await this.$apiservice.listTransaction(param).then((res) => {
        this.loadingSkeleton = false
        console.log(res.data.results)
        this.transactionResponseData = res.data.results.data
        this.transactionResponse = res.data.results
        // this.loanResponse = res.data.loans
        // this.response_data = res.data
      })
    },

    async getElectricityProviders() {
      try {
        const response = await this.$axios.get('/baxi/electricity/providers')
        this.electricityProviders = response.data
          .map((r) => ({
            label: r.name,
            value: r.service_type,
          }))
          .sort(sortByLabel)
      } catch (error) {}
    },
    async getAirtimeProviders() {
      try {
        const response = await this.$axios.get('/airtime/providers')
        this.airtimeProviders = response.data
          .map((r) => ({
            label: r.name,
            value: r.service_type,
          }))
          .sort(sortByLabel)
      } catch (error) {}
    },
    async getMobileDataProviders() {
      try {
        const response = await this.$axios.get('/mobile-data/providers')
        this.mobileDataProviders = response.data
          .map((r) => ({
            label: r.name,
            value: r.service_type,
          }))
          .sort(sortByLabel)
          .filter((a) => !['Multichoice', 'Smile'].includes(a.label))
      } catch (error) {}
    },

    async handleMobileServiceProviderChanged(value) {
      console.log(value)
      const params = {
        network: value,
        accountnumber: null,
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
