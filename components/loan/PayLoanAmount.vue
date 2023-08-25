<template>
  <SharedModal :is-open="isOpen">
    <div slot="content" class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start w-full">
        <div class="mt-3 sm:mt-0 sm:text-left w-full">
          <h3
            id="modal-title"
            class="text-lg leading-6 font-medium text-gray-900"
          >
            Pay Loan
          </h3>
          <div class="mt-2">
            <p class="text-sm font-light text-gray-500">
              Insert below the amount you choose to repay:</p>
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
          @click.prevent="payLoan"
        >
          Pay
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
  name: 'PayLoanAmount',
  components: {
    SharedModal: () => import('../shared/Modal'),
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    total: Number,
    loan: String,
  },
  data() {
    return {
      amount: 10000
    }
  },
  mounted() {
  },
  methods: {
    async payLoan(){
      const param = {
        amount: this.amount.replaceAll(',', ''),
        email: this.$auth.user.email,
        loan: this.loan
      }

      if(param.amount > this.total){
        this.$toast.alert({
            text:'Amount exceeded loan amount',
            type: 'error',
            time: 3,
            position: 'top',
          })
      } else{
        await this.$apiservice.loanPartPayment(param).then((res) =>{
          this.$toast.alert({
            text: res?.data?.message,
            type: 'success',
            time: 10,
            position: 'top',
          })
          setInterval(() => {
              location.reload();
          }, 3000);
        }).catch((error) => {
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
      }
    },
  },
}
</script>
