<template>
  <div class="grid grid-cols-12 gap-8 mt-8">
    <div
      class="col-span-12 text-custom-primary bg-white rounded-xl sm:shadow p-8 sm:flex grid grid-cols-12 items-start justify-between"
      style="overflow-x: scroll"
    >
      <div class="h-full col-span-12 w-screen flex justify-between flex-col">
        <div class="flex items-center justify-between">
          <div class="flex mr-2">
            <img src="/icons/Wallet.svg" class="h-6" />
            <h3 class="font-medium text-lg ml-3">My Savings</h3>
          </div>
          <div class="flex items-center justify-end mb-[20px] mr-[20px]">
            <nuxt-link
              to="/savings/create"
              class="border border-custom-primary text-xs px-4 py-2 rounded-3xl hover:text-white hover:bg-custom-primary"
            >
              Create Savings
            </nuxt-link>
          </div>
        </div>

        <div class="flex justify-between w-full">
          <!-- sm:flex-col -->
          <div class="relative mt-12">
            <input
              v-model="search_text"
              type="text"
              name="search_text"
              class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-semibold"
              autocomplete="false"
              @change="listTransaction()"
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
              @change="listTransaction()"
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
              @change="listTransaction()"
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
              @change="listTransaction()"
            >
              <option :value="null">Choose</option>
              <option value="0">Active Savings</option>
              <option value="1">Completed Savings</option>
            </select>
            <label
              class="text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
              >Status</label
            >
          </div>
        </div>

        <div class="grid grid-cols-12 gap-8 mt-8 col-span-12">
          <div
            class="md:col-span-12 col-span-12 rounded-xl p-8 flex flex-col justify-between"
            style="height: 400px; overflow-y: scroll"
          >
            <div
              class="flex space-x-4 justify-items-start items-start flex-col"
            >
              <div style="margin-left: 0">
                <table class="">
                  <tr v-if="loadingSkeleton == false">
                    <th>S/N</th>
                    <th class="text-left px-8 py-4">Date Created</th>
                    <th class="text-left px-8 py-4">Title</th>
                    <th class="text-left px-8 py-4">Amount</th>
                    <th class="text-left px-8 py-4">Interest Due</th>
                    <th class="text-left px-8 py-4">Total Maturity Amount</th>
                  </tr>
                  <tr v-if="loadingSkeleton == true">
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

                  <tr v-if="loadingSkeleton == true">
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

                  <tr v-if="loadingSkeleton == true">
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

                  <tr v-if="loadingSkeleton == true">
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

                  <tr v-if="loadingSkeleton == true">
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

                  <tr v-for="(key, i) in transactionResponseData" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td class="px-8 py-4">
                      <div class="flex flex-col justify-center">
                        <p style="font-weight: 300; color: grey">
                          {{ key.created_at | dateFormat('YYYY.MM.DD') }}
                        </p>
                      </div>
                    </td>
                    <td class="px-8 py-4">
                      <p style="color: grey">{{ key.saving_title }}</p>
                    </td>

                    <td class="px-8 py-4">
                      <p style="color: grey">
                        {{ key.amount_to_save | currency('₦') }}
                      </p>
                    </td>
                    <td class="px-8 py-4">
                      <p style="color: grey">
                        {{ key.interest_due | currency('₦') }}
                      </p>
                    </td>
                    <td class="px-8 py-4">
                      <p style="color: grey">
                        {{ key.total_maturity_amount | currency('₦') }}
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <div class="mt-[15px] flex justify-between">
              <div class="">
                <button
                  class="border border-custom-primary text-xs px-4 py-2 rounded-3xl hover:text-white hover:bg-custom-primary"
                  @click="listPaginate(transactionResponse.prev_page_url)"
                >
                  Previous
                </button>
                <button
                  class="border border-custom-primary text-xs px-4 py-2 rounded-3xl hover:text-white hover:bg-custom-primary"
                  @click="listPaginate(transactionResponse.next_page_url)"
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
                  @change="listTransaction()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionsPage',
  layout: 'auth',
  data() {
    return {
      loadingSkeleton: false,
      transactionResponse: null,
      transactionResponseData: [],
      page_size: 10,
      start_date: null,
      end_date: null,
      search_text: null,
      status: '0',
    }
  },
  head() {
    return {
      title: 'Transactions | Tapol',
    }
  },
  mounted() {
    this.listTransaction()
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
      this.loadingSkeleton = true
      this.transactionResponse = null
      this.transactionResponseData = []
      await this.$apiservice.listPaginate(param, url).then((res) => {
        this.loadingSkeleton = false
        console.log(res.data.savings)
        this.transactionResponseData = res.data.savings.data
        this.transactionResponse = res.data.savings
        // this.loanResponse = res.data.loans
        // this.response_data = res.data
      })
    },
    async listTransaction() {
      const param = {
        search_text: this.search_text,
        status: this.status,
        start_date: this.start_date,
        end_date: this.end_date,
        page_size: this.page_size,
      }
      this.loadingSkeleton = true
      this.transactionResponse = null
      this.transactionResponseData = []
      await this.$apiservice.listSaving(param).then((res) => {
        this.loadingSkeleton = false
        console.log(res.data.savings)
        this.transactionResponseData = res.data.savings.data
        this.transactionResponse = res.data.savings
        // this.loanResponse = res.data.loans
        // this.response_data = res.data
      })
    },
  },
}
</script>
