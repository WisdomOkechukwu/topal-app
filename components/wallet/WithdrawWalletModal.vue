<template>
  <SharedModal :is-open="isOpen">
    <div slot="content" class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start w-full">
        <div class="mt-3 sm:mt-0 sm:text-left w-full">
          <h3
            id="modal-title"
            class="text-lg leading-6 font-medium text-gray-900"
          >
            Withdraw from your wallet
          </h3>
          <div class="mt-2">
            <p class="text-sm font-light text-gray-500">
              Insert below the amount you choose to withdraw from your wallet
              with:
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
            <template v-if="!$auth.user.bank_account">
              <hr class="mt-4" />
              <div>
                <Select
                  wrapper-overide-class="mt-4"
                  label-overide-class="block text-sm font-medium text-custom-primary"
                  input-overide-class="mt-1
        block
        w-full
        py-2
        px-3
        border border-gray-300
        bg-white
        rounded-md
        shadow-sm
        focus:outline-none focus:ring-custom-primary focus:border-custom-primary
        sm:text-xl"
                  label="Choose bank"
                  :entries="banks"
                  @value-changed="bankSelected"
                />
                <div class="relative rounded-md shadow-sm mt-4">
                  <label
                    for="account"
                    :class="['block text-sm font-medium text-custom-primary']"
                    >Account Number</label
                  >
                  <input
                    id="accountNumber"
                    v-model="accountNumber"
                    v-cleave="{
                      delimiters: ['-'],
                      blocks: [3, 3, 4],
                      uppercase: true,
                    }"
                    type="text"
                    name="accountNumber"
                    class="mt-1 focus:ring-custom-primary focus:border-custom-primary block w-full p-2 sm:text-2xl font-semibold border-gray-300 rounded-md placeholder:sm:text-2xl"
                    placeholder="XXX-XXX-XXXX"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-custom-primary text-base font-light text-white hover:bg-custom-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-primary sm:ml-3 sm:w-auto sm:text-sm"
          @click.prevent="withdrawFromWallet"
        >
          Withdraw
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
  name: 'WithdrawWalletModal',
  components: {
    SharedModal: () => import('../shared/Modal'),
    Select: () => import('../shared/form/Select'),
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      amount: '10000',
      accountNumber: '',
      banks: [],
      bankAccount: {
        bank_name: null,
        account_number: null,
        bank_code: null,
      },
    }
  },
  mounted() {},
  async beforeMount() {
    await this.getBankList()
  },
  methods: {
    bankSelected(value) {
      const bank = this.banks.find((b) => b.value === value)
      if (bank) {
        this.bankAccount.bank_name = bank.label
        this.bankAccount.bank_code = value
      }
    },
    async getBankList() {
      try {
        const {
          data: { data },
        } = await this.$axios.get('/utility/banks')
        this.banks = data
          .filter((bank) => bank.active && !bank.is_deleted)
          .map((bank) => ({ label: bank.name, value: bank.code }))
      } catch (error) {
        return {}
      }
    },
    async withdrawFromWallet() {
      try {
        await this.$axios.post('/wallet/withdraw', {
          bank: this.bankAccount.bank_code
            ? {
                ...this.bankAccount,
                account_number: this.accountNumber.replaceAll('-', ''),
              }
            : undefined,
          amount: this.amount.replaceAll(',', ''),
        })

        this.$toast.alert({
          text: 'Your withdrawal request is being processed.',
          type: 'success',
          time: 3,
          position: 'top',
        })

        this.$emit('close')
      } catch (error) {
        let message
        if ([419, 401, 400, 403].includes(error?.response?.status)) {
          message = error?.response.data?.message
        }
        if ([422].includes(error?.response?.status)) {
          message = Object.values(error?.response.data?.errors)[0][0]
        }

        this.$toast.alert({
          text:
            message || 'An error occured while trying to process your request',
          type: 'error',
          time: 3,
          position: 'top',
        })
      }
    },
  },
}
</script>
