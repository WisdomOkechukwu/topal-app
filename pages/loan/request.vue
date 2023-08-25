<template>
  <div class="grid grid-cols-12 gap-8 mt-8">
    <div
      v-if="waitingLoans.length == 0 && activeLoans.length == 0"
      class="col-span-12 md:col-span-9 text-custom-primary bg-white rounded-xl sm:shadow p-8 grid grid-cols-2 items-start justify-between"
    >
      <div class="h-full col-span-12">
        <div class="flex space-x-4 items-center">
          <img src="/icons/MyLoans1.svg" class="h-6" />
          <h3 class="font-medium text-lg">Apply for Loan</h3>
        </div>

        <div v-if="!applicationStatus" class="mt-8 max-w-2xl">
          <form class="grid grid-cols-2 gap-8">
            <div class="col-span-2 sm:col-span-1">
              <label class="font-thin text-sm"
                >How much do you want to borrow?</label
              >
              <input
                v-model.lazy="loanValue"
                v-cleave="{
                  numeral: true,
                  numeralThousandsGroupStyle: 'thousand',
                  prefix: '₦ ',
                }"
                class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl mt-2 text-2xl font-semibold border-none"
                type="text"
                min="15000"
                name="amount"
                @change="response_data = null"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label class="font-thin text-sm">Purpose of the loan?</label>
              <select
                v-model="loanPurpose"
                class="w-full px-4 pr-12 py-3 bg-[#f2f2f2] rounded-3xl mt-2 text-2xl font-semibold border-none"
                @change="loancalculator"
              >
                <option :value="null">Choose</option>
                <!-- <option v-for="(p, i) in loanPurposes" :key="i" :value="p.value">
                  {{ p.label }}
                </option> -->
                <option value="Business loan">Business loan</option>
                <option value="Education loan">Education loan</option>
                <option value="Health care loan">Heath care loan</option>
                <option value="Travel expenses loan">
                  Travel expenses loan
                </option>
                <option value="Consumption loan">Consumption loan</option>
                <option value="Rent loan">Rent loan</option>
                <option value="Pension loan">Pension loan</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div class="col-span-2 grid">
              <label class="font-thin text-sm flex justify-between">
                <span>Loan Tenure / Duration</span>
                <span class="font-medium"
                  >{{ durationInMonths }} month{{
                    durationInMonths > 1 ? 's' : ''
                  }}</span
                >
              </label>
              <input
                v-model.lazy="durationInMonths"
                type="range"
                class="mt-4 rounded-lg overflow-hidden appearance-none bg-[#f2f2f2] h-3 w-full"
                max="12"
                min="1"
                step="1"
                @change="loancalculator"
              />
            </div>
            <div
              v-if="response_data != null"
              class="col-span-2 flex gap-x-8 md:gap-x-16"
            >
              <div>
                <label class="text-[#65c6e7] font-bold text-sm"
                  >Your monthly repayment</label
                >
                <h2 class="text-3xl font-black">
                  {{
                    new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(response_data.monthly_repayment)
                  }}
                </h2>
              </div>
              <div>
                <label class="text-[#65c6e7] font-bold text-sm"
                  >Total repayment</label
                >

                <h2 class="text-3xl font-black">
                  {{
                    new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(response_data.total_repayment)
                  }}
                </h2>
              </div>
            </div>
            <div class="col-span-2">
              <!-- <button class="border border-custom-primary rounded-3xl py-2 px-4 text-sm"
                @click.prevent="loancalculator">
                Loan Calculator
              </button>
               -->
              <button
                v-if="response_data != null"
                class="border border-custom-primary rounded-3xl py-2 px-4 text-sm"
                @click.prevent="requestForLoan"
              >
                Apply Now
              </button>
              <!-- <h5>Loading</h5> -->
            </div>
          </form>
        </div>
        <div v-else class="mt-8 max-w-2xl">
          <h3 class="text-sm">
            Your application has been successfully recieved and is being
            verified at the moment.
          </h3>
          <button
            class="mt-8 border border-custom-primary rounded-3xl py-2 px-4 text-sm"
            @click.prevent="() => $router.push('/')"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="activeLoans.length != 0 || waitingLoans.length != 0 || loanResponseData.length != 0"
      class="col-span-12 text-custom-primary bg-white rounded-xl sm:shadow p-8 grid grid-cols-2 items-start justify-between"
    >
      <div class="h-full col-span-2">
        <div class="flex space-x-4 items-center">
          <img src="/icons/MyLoans1.svg" class="h-6" />
          <h3 class="font-medium text-lg">My Loans</h3>
        </div>

        <div class="grid grid-cols-12 col-span-12 gap-8 mt-8">
          <div class="md:col-span-4 col-span-12">
            <div
              v-if="activeLoans.length != 0"
              class="flex space-x-4 justify-items-start items-start flex-col text-custom-primary bg-custom-blue-3 rounded-x rounded-xl p-8"
            >
              <div class="flex flex-col">
                <h3 class="font-semibold text-sm">Loan Disbursed</h3>
                <h1 class="font-semibold text-lg">{{ (activeLoans[0].total_repayment - activeLoans[0].paid_amount) | currency('₦') }}</h1>
                <p class="mt-[15px]">
                  Due Date in
                  <span style="color: red">
                    {{ activeLoans[0].days_left }}
                  </span>
                </p>
                <p>please top up your wallet before proceeding to make payment of your loan</p>
                <div class="mt-[15px]">
                  <button
                    class="border border-custom-primary text-xs px-4 py-2 rounded-3xl hover:text-white hover:bg-custom-primary"
                    @click.prevent="isPayLoan = true"
                  >
                    Pay Loan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="md:col-span-9 col-span-12">
          <div class="text-custom-primary
            bg-custom-white-2
            rounded-xl
            p-8">
            <div class="flex mb-[10px]">
              <img src="/icons/Transaction.svg" class="h-6 mr-[10px]" />
              <h3 class="font-semibold text-lg">Loan History ({{ $auth.user.loans.length }})</h3>
            </div>

            <table class="">
              <tr>
                <td class="text-left px-8 py-4"> <div class="h-6 w-11/12 rounded-md bg-gray-300 "></div></td>
                <td class="text-left px-8 py-4"> <div class="h-6 w-11/12 rounded-md bg-gray-300 "></div></td>
                <td class="text-left px-8 py-4"> <div class="h-6 w-11/12 rounded-md bg-gray-300 "></div></td>
              </tr>
              <tr>
                <td class="text-left px-8 py-4"> <div class="h-6 w-11/12 rounded-md bg-gray-300 "></div></td>
                <td class="text-left px-8 py-4"> <div class="h-6 w-11/12 rounded-md bg-gray-300 "></div></td>
                <td class="text-left px-8 py-4"> <div class="h-6 w-11/12 rounded-md bg-gray-300 "></div></td>
              </tr>
              <tr>
                <td class="text-left px-8 py-4"> <div class="h-6 w-11/12 rounded-md bg-gray-300 "></div></td>
                <td class="text-left px-8 py-4"> <div class="h-6 w-11/12 rounded-md bg-gray-300 "></div></td>
                <td class="text-left px-8 py-4"> <div class="h-6 w-11/12 rounded-md bg-gray-300 "></div></td>
              </tr>
              <tr>
                <td class=" px-8 py-4">
                  <div class="flex flex-col justify-center">
                    <p style="font-weight: 300; color: grey;">October 11, 2022</p>
                    3 Repayments left
                  </div>
                </td>
                <td class=" px-8 py-4"><p style="color: red;">{{ 3000000 | currency('₦') }}</p></td>
                <td class=" px-8 py-4">
                  <div class="flex">
                    <div style="width: 20px;height: 20px;background: red;display: inherit;border-radius: 100%; margin-right: 10px;"></div>
                    <p style="font-weight: 300; color: grey;">Pending</p>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div> -->

        <div class="grid grid-cols-12 col-span-12 gap-8 mt-8">
          <div class="md:col-span-12 col-span-12">
            <div
              class="md:col-span-12 col-span-12 rounded-xl p-8 flex flex-col justify-between text-custom-primary bg-custom-white-2"
              style="height: 400px; overflow-y: scroll"
            >
              <div
                class="flex space-x-4 justify-items-start items-start flex-col"
              >
                <div class="flex justify-between w-full">
                  <!-- sm:flex-col -->
                  <div class="relative mt-12">
                    <input
                      v-model="search_text"
                      type="text"
                      name="search_text"
                      class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-semibold"
                      autocomplete="false"
                      @change="loanList()"
                    />
                    <label
                      class="text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >Search Text</label
                    >
                  </div>

                  <div class="relative mt-12">
                    <input
                      v-model="start_date"
                      type="date"
                      name="start_date"
                      class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-semibold"
                      autocomplete="false"
                      @change="loanList()"
                    />
                    <label
                      class="text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >Start Date</label
                    >
                  </div>

                  <div class="relative mt-12">
                    <input
                      v-model="end_date"
                      type="date"
                      name="end_date"
                      class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-semibold"
                      autocomplete="false"
                      @change="loanList()"
                    />
                    <label
                      class="text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >End Date</label
                    >
                  </div>

                  <div class="relative mt-12">
                    <select
                      id="statuses"
                      v-model="status"
                      name="statues"
                      class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-semibold"
                      @change="loanList()"
                    >
                      <option :value="null">Choose</option>
                      <option value="0">New Loan</option>
                      <option value="1">Approved Loan</option>
                      <option value="2">Rejected Loan</option>
                    </select>
                    <label
                      class="text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >Status</label
                    >
                  </div>
                </div>

                <div style="margin-left: 0">
                  <table class="">
                    <tbody v-if="loadingSkeleton == true">
                      <tr>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                      </tr>

                      <tr>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                      </tr>

                      <tr>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                      </tr>

                      <tr>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                        <td class="text-left px-8 py-4">
                          <div class="h-6 w-11/12 rounded-md bg-gray-300"></div>
                        </td>
                      </tr>
                    </tbody>

                    <tbody
                      v-if="
                        loadingSkeleton == false && loanResponseData.length != 0
                      "
                    >
                      <tr v-if="loadingSkeleton == false">
                        <th>S/N</th>
                        <th class="text-left px-8 py-4">Date Created</th>
                        <th class="text-left px-8 py-4">Amount</th>
                        <th class="text-left px-8 py-4">Monthly Interest</th>
                        <th class="text-left px-8 py-4">Monthly Repayments</th>
                        <th class="text-left px-8 py-4">Status</th>
                        <th class="text-left px-8 py-4">Loan Purpose</th>
                      </tr>

                      <tr v-for="(key, i) in loanResponseData" :key="i">
                        <td>{{ i + 1 }}</td>
                        <td class="px-8 py-4">
                          <div class="flex flex-col justify-center">
                            <p style="font-weight: 300; color: grey">
                              {{ key.created_at | dateFormat('YYYY.MM.DD') }}
                            </p>
                          </div>
                        </td>
                        <td class="px-8 py-4">
                          <div class="flex flex-col justify-center">
                            <p style="font-weight: 300; color: grey">
                              {{ key.amount | currency('₦') }}
                            </p>
                          </div>
                        </td>
                        <td class="px-8 py-4">
                          <div class="flex flex-col justify-center">
                            <p style="font-weight: 300; color: grey">
                              {{ key.monthly_interest | currency('₦') }}
                            </p>
                          </div>
                        </td>
                        <td class="px-8 py-4">
                          <div class="flex flex-col justify-center">
                            <p style="font-weight: 300; color: grey">
                              {{ key.monthly_repayment | currency('₦') }}
                            </p>
                          </div>
                        </td>
                        <td class="px-8 py-4">
                          <p v-if="key.status == 0" style="color: rgb(238, 207, 5)">Pending</p>
                          <p v-if="key.status == 1" style="color: green">Active</p>
                          <p v-if="key.status == 2" style="color: red">Rejected</p>
                          <p v-if="key.status == 3" style="color: green">Completed</p>
                        </td>
                        <td class="px-8 py-4">
                          <p style="color: grey">{{ key.loan_purpose }}</p>
                        </td>
                      </tr>
                    </tbody>

                    <tbody
                      v-if="
                        loadingSkeleton == false && loanResponseData.length == 0
                      "
                    >
                      <tr v-if="loadingSkeleton == false">
                        <th>S/N</th>
                        <th class="text-left px-8 py-4">Date Created</th>
                        <th class="text-left px-8 py-4">Amount</th>
                        <th class="text-left px-8 py-4">Monthly Interest</th>
                        <th class="text-left px-8 py-4">Monthly Repayments</th>
                        <th class="text-left px-8 py-4">Loan Purpose</th>
                      </tr>

                      <tr>
                        <td
                          style="
                            text-align: center;
                            font-size: 40px;
                            font-weight: bold;
                          "
                          colspan="6"
                        >
                          No Record
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="mt-[15px] flex justify-between">
                <div class="">
                  <button
                    class="border border-custom-primary text-xs px-4 py-2 rounded-3xl hover:text-white hover:bg-custom-primary"
                    @click="listPaginate(loanResponse.prev_page_url)"
                  >
                    Previous
                  </button>
                  <button
                    class="border border-custom-primary text-xs px-4 py-2 rounded-3xl hover:text-white hover:bg-custom-primary"
                    @click="listPaginate(loanResponse.next_page_url)"
                  >
                    Next
                  </button>
                </div>
                <div class="flex items-center justify-center">
                  <h3 class="font-medium text-lg ml-3">Page Number</h3>
                  <input
                    v-model="page_size"
                    type="number"
                    name="new-page_size"
                    class="ml-2 peer w-2/4 placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-semibold"
                    autocomplete="false"
                    @change="loanList()"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pay-loan
      :is-open="isPayLoan"
      :total="activeLoans.length !== 0 ?(activeLoans[0].total_repayment - activeLoans[0].paid_amount) : 0"
      :loan ="activeLoans.length !== 0 ? activeLoans[0].loanid : ''"
      @close="isPayLoan = false"
    />

  </div>
</template>

<script>
export default {
  name: 'LoanApplicationPage',
  components: {
    'pay-loan': () => import('../../components/loan/PayLoanAmount.vue'),
  },
  layout: 'auth',
  middleware: ['auth'],
  data() {
    return {
      start_date: null,
      end_date: null,
      search_text: null,
      status: '0',
      page_size: 10,
      loanPurpose: null,
      durationInMonths: 3,
      loanValue: 50000,
      applicationStatus: false,
      loanPurposes: [],
      response_data: null,
      loadingSkeleton: false,
      loanResponse: null,
      loanResponseData: [],
      activeLoans: [],
      waitingLoans: [],
      isPayLoan: false,
    }
  },
  computed: {
    monthlyRepayment() {
      const value = +this.form.loanValue
        ?.toString()
        .replace('₦ ', '')
        .replace(',', '')
      const percentage = +((this.form.loanPurpose ?? '&').split('&')[1] || 1)
      return value / this.form.durationInMonths + value * (percentage / 100)
    },
    totalRepayment() {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      }).format(this.monthlyRepayment * this.form.durationInMonths)
    },
    walletBalance() {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      }).format(+(this.$auth.user?.wallet?.balance ?? 0.0) / 100)
    },
  },
  watch: {
    // whenever question changes, this function will run
    // async response_data(newQuestion, oldQuestion)
    // {
    //   const amnt = this.loanValue?.toString().replace('₦ ', '').replace(',', '');
    //   const params = {
    //     amount: amnt,
    //     duration: this.durationInMonths
    //   };
    //   await this.$apiservice.loancalculator(params).then((res) =>
    //   {
    //     this.response_data = res.data
    //   });
    // }
  },
  mounted() {
    this.loanList()
  },

  methods: {
    async listPaginate(url) {
      console.log(url)
      if (url == null) {
        this.$toast.alert({
          text: 'No Data.',
          type: 'error',
          time: 3,
          position: 'top',
        })
        return
      }
      const param = {
        search_text: this.search_text,
        status: this.status,
        start_date: this.start_date,
        end_date: this.end_date,
        page_size: this.page_size,
      }
      this.loanResponse = null
      // this.loanResponseData = []
      await this.$apiservice.listPaginate(param, url).then((res) => {
        this.loadingSkeleton = false
        console.log(res.data.results)
        this.loanResponse = res.data.loans
        this.loanResponseData = res.data.loans.data
      })
    },
    debounceSearch(event) {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.form.durationInMonths = event.target.value
        this.loancalculator()
      }, 600)
    },
    debounceLoanValue(event) {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.form.loanValue = event.target.value
        this.loancalculator()

      }, 600)
    },
    async loanList() {
      this.loadingSkeleton = true
      // this.loanResponseData = []
      const param = {
        search_text: this.search_text,
        status: this.status,
        start_date: this.start_date,
        end_date: this.end_date,
        page_size: this.page_size,
      }
      await this.$apiservice.listLoan(param).then((res) => {
        this.loadingSkeleton = false
        console.log(res);
        this.loanResponse = res.data.loans
        this.loanResponseData = res.data.loans.data
        this.activeLoans = res.data.active
        this.waitingLoans = res.data.waiting
        // this.response_data = res.data
      })
    },
    async loancalculator() {
      this.response_data = null
      const amnt = this.loanValue?.toString().replace('₦ ', '').replace(',', '')
      const params = {
        amount: amnt,
        duration: this.durationInMonths,
        purpose: this.loanPurpose,
      }
      if (params.amount < 5000) {
        return this.$toast.alert({
          text: 'Amount should be more than 5000.',
          type: 'error',
          time: 4,
          position: 'top',
        })
      }

      if (params.duration < 1) {
        return this.$toast.alert({
          text: 'Amount should be more than 5000.',
          type: 'error',
          time: 4,
          position: 'top',
        })
      }

      if (params.purpose == null) {
        return this.$toast.alert({
          text: 'Loan purpose is required.',
          type: 'error',
          time: 4,
          position: 'top',
        })
      }
      /// loanapply
      await this.$apiservice
        .loancalculator(params)
        .then((res) => {
          console.log(res.data)
          this.response_data = res.data
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
    async requestForLoan() {
      const loanPurpose = this.loanPurpose
      if (!loanPurpose) {
        return this.$toast.alert({
          text: 'Please select the purpose of this loan.',
          type: 'error',
          time: 4,
          position: 'top',
        })
      }

      if (this.response_data == null) {
        return this.$toast.alert({
          text: 'Calculate Loan first.',
          type: 'error',
          time: 4,
          position: 'top',
        })
      }

      const amount = +this.loanValue
        ?.toString()
        .replace('₦ ', '')
        .replace(',', '')
      const payload = {
        amount: this.response_data.amount,
        duration: this.response_data.duration,
        monthly_repayment: this.response_data.monthly_repayment,
        total_repayment: this.response_data.total_repayment,
        monthly_interest: this.response_data.monthly_interest,
        loan_purpose: this.loanPurpose,
      }

      try {
        const response = await this.$apiservice.loanapply(payload)
        if (response.status === 200) {
          this.applicationStatus = true

          this.$toast.alert({
            text: 'Your loan request is being processed.',
            type: 'success',
            time: 4,
            position: 'top',
          })
        }
      } catch (error) {
        let message
        if ([419, 401, 400].includes(error?.response?.status)) {
          message = error?.response.data?.message
        }
        if ([422].includes(error?.response?.status)) {
          message = Object.values(error?.response.data?.errors)[0][0]
        }
        this.$toast.alert({
          text: message || 'An error occured while requesting for a loan.',
          type: 'error',
          time: 4,
          position: 'top',
        })
      }
    },
    async getListOfLoanPurposes() {
      try {
        const response = await this.$axios.get('/loan/purposes')
        this.loanPurposes = response.data
          .map((r) => ({
            label: r.title,
            value: r.id + '&' + r.percentage,
          }))
          .sort(sortByLabel)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
