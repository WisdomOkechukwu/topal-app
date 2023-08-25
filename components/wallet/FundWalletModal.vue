<template>
  <SharedModal :is-open="isOpen">
    <div slot="content" class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start w-full">
        <div class="mt-3 sm:mt-0 sm:text-left w-full">
          <h3
            id="modal-title"
            class="text-lg leading-6 font-medium text-gray-900"
          >
            Fund your wallet
          </h3>
          <div class="mt-2">
            <p class="text-sm font-light text-gray-500">
              Insert below the amount you choose to fund your wallet with:
            </p>
          </div>
          <div class="mt-4">
            <div class="mt-1 relative rounded-md shadow-sm">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <span class="text-gray-500 sm:text-xl"> NGN </span>
              </div>
              <input
                id="amount"
                v-model="amount"
                v-cleave="{
                  numeral: true,
                  numeralThousandsGroupStyle: 'thousand',
                }"
                type="text"
                name="amount"
                class="focus:ring-custom-primary focus:border-custom-primary block w-full pl-16 pr-12 sm:text-xl font-semibold border-gray-300 rounded-md placeholder:sm:text-xl"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-custom-primary text-base font-light text-white hover:bg-custom-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-primary sm:ml-3 sm:w-auto sm:text-sm"
          @click.prevent="fundWallet"
        >
          Fund Wallet
        </button>
        <button
          type="button"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-light text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          @click.prevent="$emit('close')"
        >
          Cancel
        </button>
      </div>
    </div>
  </SharedModal>
</template>

<script>
export default {
  name: 'FundWalletModal',
  components: {
    SharedModal: () => import('../shared/Modal'),
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      amount: 10000,
    }
  },
  mounted() {},
  methods: {
    async fundReload(reference_id) {
      const param = {
        reference_id,
        customer_id: this.$auth.user.customer_id,
      }
      await this.$apiservice
        .fundReload(param)
        .then((res) => {
          if (res.data.status == 'success') {
            console.log(res.data)
            // this.$notyf.success(res.data.message);
            this.$toast.alert({
              text: res.data.message,
              type: 'success',
              time: 3,
              position: 'top',
            })
            this.$auth.fetchUser()
            $nuxt.$emit('closefunding')
            
          }
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
            text: message || 'An error occured.',
            type: 'error',
            time: 3,
            position: 'top',
          })
          $nuxt.$emit('closefunding')
        })
    },

    async fundWallet() {
      const param = {
        amount: this.amount.replaceAll(',', ''),
        email: this.$auth.user.email,
      }
      await this.$apiservice
        .fundinInitation(param)
        .then((res) => {
          this.$paystack({
            key: 'pk_live_48b8b69f340734b03fea285fb9482b743f8de082', // Replace with your public key.
            email: this.$auth.user.email,
            amount: this.amount.replaceAll(',', '') * 100,
            ref: res.data.reference,
            currency: 'NGN',
            callback: (ng) => {
              // console.log(ng)
              this.fundReload(res.data.reference)
              // Do something.
            },
            onClose: () => {
              // Do something.
              this.amount = 10000
            },
          })
        })
        .catch((error) => {
          console.log(error)
          this.$notyf.error(error.response.data.message)

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
