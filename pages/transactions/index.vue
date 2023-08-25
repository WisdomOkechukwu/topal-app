<template>
  <div class="grid grid-cols-12 gap-8 mt-8">
    <div
      class="col-span-12 text-custom-primary bg-white rounded-xl sm:shadow p-8 sm:flex grid grid-cols-12 items-start justify-between"
      style="overflow-x: scroll"
    >
      <div class="h-full col-span-12 w-screen">
        <div class="flex items-center justify-between">
          <div class="flex mr-2">
            <img src="/icons/Transaction.svg" class="h-6" />
            <h3 class="font-medium text-lg ml-3">My Transaction</h3>
          </div>
          <div class="flex mr-2">
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
                  <tr>
                    <th>S/N</th>
                    <th class="text-left px-8 py-4">Date Created</th>
                    <th class="text-left px-8 py-4">Status</th>
                    <th class="text-left px-8 py-4">Description</th>
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
                      <div
                        class=""
                        :class="{
                          error: key.type == 'debit',
                          success: key.type == 'credit',
                        }"
                      >
                        {{ key.type }}
                      </div>
                    </td>
                    <td class="px-8 py-4">
                      <p style="color: grey">{{ key.message }}</p>
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
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
export default {
  name: 'TransactionsPage',
  layout: 'auth',
  data() {
    return {
      loadingSkeleton: false,
      transactionResponse: null,
      transactionResponseData: [],
      page_size: 10,
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
        page_size: this.page_size,
      }
      this.loadingSkeleton = true
      this.transactionResponse = null
      this.transactionResponseData = []
      await this.$apiservice.listPaginate(param, url).then((res) => {
        this.loadingSkeleton = false
        console.log(res.data.results)
        this.transactionResponseData = res.data.results.data
        this.transactionResponse = res.data.results
        // this.loanResponse = res.data.loans
        // this.response_data = res.data
      })
    },
    async listTransaction() {
      const param = {
        page_size: this.page_size,
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
  },
}
</script>

<style>
.error {
  background: red;
  text-align: center;
  border-radius: 10px;
  color: white;
  font-size: 14px;
}

.success {
  background: #68387d;
  text-align: center;
  border-radius: 10px;
  color: white;
  font-size: 14px;
}
</style>
