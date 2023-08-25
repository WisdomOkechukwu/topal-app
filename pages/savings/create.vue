<template>
  <div class="grid grid-cols-12 gap-2 mt-8">
    <div
      class="md:col-span-8 col-span-12 text-custom-primary bg-white rounded-xl sm:shadow-lg p-8 sm:flex items-start justify-center"
    >
      <div
        v-if="status == '0'"
        class="flex flex-col justify-center items-center"
      >
        <h4 class="font-normal text-lg">Savings</h4>
        <div class="mt-[15px]">
          Tapol’s savings product has been designed for you to earn greater
          while you save. The longer you save, the higher your interest rate
          will be, reaching up to 1.88%.
        </div>

        <div class="text-center mt-[15px]">
          Take advantage of our renewal plans: <br />
          1st Renewal (from 1-3 months) – 1.58% <br />
          2nd Renewal (From 3-6months) – 1.68% <br />
          3rd Renewal (From 6-9months) – 1.78% <br />
          4th Renewal (From 9-12months) – 1.88% <br />
        </div>

        <img src="/img/piggy.png" alt="Piggy Bank" class="mt-[15px]" />

        <button
          class="font-normal mt-8 rounded-3xl bg-custom-primary w-fit py-3 px-6 text-white tracking-wider hover:bg-opacity-90 text-sm"
          @click="changeState(1)"
        >
          Get Started
        </button>
      </div>

      <div
        v-if="status == '1'"
        class="flex flex-col justify-center items-center"
      >
        <h4 class="font-normal text-lg">What do you want to save for.</h4>
        <div class="col-span-2 mt-[30px] sm:col-span-1">
          <label class="font-thin text-sm">Name of your goal</label>
          <input
            v-model="form.title"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            type="text"
            name="goal"
            @change="setName()"
          />
        </div>
        <div class="mt-[25px]">
          <button
            style="background: red"
            class="font-normal mt-8 rounded-3xl w-fit py-3 px-6 text-white tracking-wider hover:bg-opacity-90 text-sm"
            @click="changeState(0)"
          >
            Back
          </button>
          <button
            class="font-normal mt-8 rounded-3xl bg-custom-primary w-fit py-3 px-6 ml-3 text-white tracking-wider hover:bg-opacity-90 text-sm"
            @click="setName()"
          >
            Next
          </button>
        </div>
      </div>

      <div
        v-if="status == '3'"
        class="flex flex-col justify-center items-center"
      >
        <h4 class="font-normal text-lg">How much do you want to save.</h4>
        <div class="col-span-2 mt-[30px] sm:col-span-1">
          <label class="font-thin text-sm">Amount</label>
          <input
            v-model="form.total_amount"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            type="number"
            min="500"
            name="amount"
            @change="setAmount()"
          />
          <p class="text-[10px] mt-2 font-extrabold">
            Amount in words: {{ form.total_amount | currency('₦') }}
          </p>
        </div>
        <div class="mt-[25px]">
          <button
            style="background: red"
            class="font-normal mt-8 rounded-3xl w-fit py-3 px-6 text-white tracking-wider hover:bg-opacity-90 text-sm"
            @click="changeState(1)"
          >
            Back
          </button>
          <button
            class="font-normal mt-8 rounded-3xl bg-custom-primary w-fit py-3 px-6 ml-3 text-white tracking-wider hover:bg-opacity-90 text-sm"
            @click="setAmount()"
          >
            Next
          </button>
        </div>
      </div>

      <div
        v-if="status == '4'"
        style="width: 100%"
        class="flex flex-col justify-center items-center"
      >
        <h4 class="font-normal text-lg">Saving Duration.</h4>
        <div
          class="col-span-2 sm:col-span-1"
          style="width: 100%; margin-top: 30px"
        >
          <label class="font-thin text-sm">Start Date</label>
          <input
            v-model="form.start_date"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            type="date"
            name="StartDate"
          />
        </div>
        <div
          class="col-span-2 sm:col-span-1"
          style="width: 100%; margin-top: 30px"
        >
          <label class="font-thin text-sm">Maturity Date</label>
          <input
            v-model="form.end_date"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            type="date"
            name="EndDate"
          />
        </div>
        <div class="mt-[25px]">
          <button
            style="background: red"
            class="font-normal mt-8 rounded-3xl w-fit py-3 px-6 text-white tracking-wider hover:bg-opacity-90 text-sm"
            @click="changeState(3)"
          >
            Back
          </button>
          <button
            class="font-normal mt-8 rounded-3xl bg-custom-primary w-fit py-3 px-6 ml-3 text-white tracking-wider hover:bg-opacity-90 text-sm"
            @click="setDuration()"
          >
            Next
          </button>
        </div>
      </div>

      <div
        v-if="status == '5'"
        class="flex flex-col justify-center items-center"
      >
        <h4 class="font-normal text-lg">How long do you want to save for?</h4>
        <div class="col-span-2 mt-[30px] sm:col-span-1">
          <label class="font-thin text-sm">Start Date</label>
          <input
            v-model="form.start_date"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            type="date"
            name="startdate"
          />
        </div>

        <div class="col-span-2 mt-[30px] sm:col-span-1">
          <label class="font-thin text-sm">End Date</label>
          <input
            v-model="form.withdrawal_date"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            type="date"
            name="endate"
          />
        </div>

        <div class="mt-[25px]">
          <button
            style="background: red"
            class="font-normal mt-8 rounded-3xl w-fit py-3 px-6 text-white tracking-wider hover:bg-opacity-90 text-sm"
            @click="changeState(4)"
          >
            Back
          </button>
          <button
            class="font-normal mt-8 rounded-3xl bg-custom-primary w-fit py-3 px-6 ml-3 text-white tracking-wider hover:bg-opacity-90 text-sm"
            @click="setStartDate()"
          >
            Next
          </button>
        </div>
      </div>

      <div
        v-if="status == '6' && data_respone != null"
        class="flex flex-col justify-center items-center"
      >
        <h4 class="font-normal text-lg">Review your savings.</h4>
        <p class="text-[20px] mt-2 font-extrabold">
          {{ data_respone.saving_title | capitalize }}
          {{ data_respone.amount_to_save | currency('₦') }}
        </p>
        <div class="grid grid-cols-2 gap-8 mt-[50px]">
          <div class="col-span-2 sm:col-span-1">
            <label class="font-thin text-sm">Interest Rate</label>
          </div>

          <div class="col-span-2 sm:col-span-1">
            <p>Upto {{ data_respone.total_interest_rate }}</p>
          </div>

          <div class="col-span-2 sm:col-span-1">
            <label class="font-thin text-sm">Total Interest</label>
          </div>

          <div class="col-span-2 sm:col-span-1">
            <p>{{ data_respone.total_maturity_amount | currency('₦') }}</p>
          </div>

          <div class="col-span-2 sm:col-span-1">
            <label class="font-thin text-sm">Start Date</label>
          </div>

          <div class="col-span-2 sm:col-span-1">
            <p>{{ data_respone.start_date }}</p>
          </div>

          <div class="col-span-2 sm:col-span-1">
            <label class="font-thin text-sm">Maturity Date</label>
          </div>

          <div class="col-span-2 sm:col-span-1">
            <p>{{ data_respone.maturity_date }}</p>
          </div>
          <!-- 58f38ab10e-b10351160d-rhybrg -->
        </div>
        <div class="mt-[25px]">
          <button
            style="background: red"
            class="font-normal mt-8 rounded-3xl w-fit py-3 px-6 text-white tracking-wider hover:bg-opacity-90 text-sm"
            @click="closeBack()"
          >
            Back
          </button>
          <button
            class="font-normal mt-8 rounded-3xl bg-custom-primary w-fit py-3 px-6 ml-3 text-white tracking-wider hover:bg-opacity-90 text-sm"
            @click="completeSavings()"
          >
            Launch Goal
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import { sortByLabel } from '~/lib/string'

export default {
  name: 'WithdrawalList',
  layout: 'auth',
  middleware: 'auth',
  data() {
    return {
      status: 0,
      data_respone: null,
      form: {
        saving_name: null,
        type: null,
        total_amount: null,
        frequency_type: null,
        start_date: null,
        withdrawal_date: null,
      },
    }
  },
  head() {
    return {
      title: 'Withdrawal | Tapol',
    }
  },
  methods: {
    closeBack() {
      this.form.saving_name = null
      this.form.type = null
      this.form.total_amount = null
      this.form.frequency_type = null
      this.form.start_date = null
      this.form.end_date = null
      this.form.withdrawal_date = null
      this.changeState(0)
    },
    selectType(data) {
      this.form.type = data
      this.changeState(2)
    },
    // changeState(6)
    setDuration() {
      this.form.saving_title = this.form.title
      this.form.amount_to_save = this.form.total_amount
      if (this.form.start_date == null || this.form.start_date == '') {
        return this.$toast.alert({
          text: 'Start date is required',
          type: 'error',
          time: 4,
          position: 'top',
        })
      }

      if (this.form.end_date == null || this.form.end_date == '') {
        return this.$toast.alert({
          text: 'End date is required',
          type: 'error',
          time: 4,
          position: 'top',
        })
      }
      this.form.maturity_date = this.form.end_date
      this.intSaving()
    },
    setAmount() {
      if (this.form.total_amount == null || this.form.total_amount == '') {
        return this.$toast.alert({
          text: 'Amount is required',
          type: 'error',
          time: 4,
          position: 'top',
        })
      }
      this.changeState(4)
    },
    setName() {
      if (this.form.title == null || this.form.title == '') {
        return this.$toast.alert({
          text: 'Savings name is required.',
          type: 'error',
          time: 4,
          position: 'top',
        })
      }
      this.changeState(3)
    },

    setFrequency() {
      if (this.form.frequency_type == null || this.form.frequency_type == '') {
        return this.$toast.alert({
          text: 'Savings frequency is required.',
          type: 'error',
          time: 4,
          position: 'top',
        })
      }
      this.changeState(5)
    },
    setStartDate() {
      if (this.form.start_date == null || this.form.start_date == '') {
        return this.$toast.alert({
          text: 'Start date is required.',
          type: 'error',
          time: 4,
          position: 'top',
        })
      }

      if (
        this.form.withdrawal_date == null ||
        this.form.withdrawal_date == ''
      ) {
        return this.$toast.alert({
          text: 'Withdrawal date is required.',
          type: 'error',
          time: 4,
          position: 'top',
        })
      }
      this.intSaving()
    },

    async intSaving() {
      await this.$apiservice
        .initateSavings(this.form)
        .then((res) => {
          this.data_respone = res.data
          this.status = 6
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

    async completeSavings() {
      const parmas = this.data_respone
      await this.$apiservice
        .completeSavings(parmas)
        .then((res) => {
          console.log(res.data)
          // this.data_respone = res.data;
          // this.status = 6
          // // this.data_respone =
          swal('Success', res.data.message, 'success').then((value) => {
            console.log(value)
            if (value == true) {
              this.$router.push('./')
            }
            this.$router.push('./')
          })
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

    // completeSavings
    changeState(status) {
      this.status = status
    },
  },
}
</script>

<style scoped>
.typeblock {
  background: #e2e8f0;
  border-radius: 8px;
}

.typeblock:hover {
  background: #68387d;
  color: #e2e8f0;
  border-radius: 8px;
}
</style>
