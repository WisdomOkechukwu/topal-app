<template>
  <SharedModal :is-open="isOpen">
    <div slot="content" class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start w-full">
        <div class="mt-3 sm:mt-0 sm:text-left w-full">
          <h3
            id="modal-title"
            class="text-lg leading-6 font-medium text-gray-900"
          >
            Mobile Data Recharge
          </h3>
          <div class="mt-2">
            <p class="text-sm font-light text-gray-500">
              Insert below the amount you choose to recharge your phone with:
            </p>
          </div>
          <div class="mt-4">
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
              label="Choose network provider"
              :entries="providers"
              @value-changed="providerSelected"
            />
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
              label="Choose data bundle"
              :entries="bundles"
              @value-changed="bundleSelected"
            />
            <span v-if="bundle" class="text-xs font-normal text-red-600">{{
              `${formatToCurrency(bundle.price)}`
            }}</span>

            <div v-if="bundle" class="relative rounded-md shadow-sm mt-4">
              <label
                for="phoneNumber"
                :class="['block text-sm font-medium text-custom-primary']"
                >Phone Number</label
              >
              <input
                id="phoneNumber"
                v-model="phoneNumber"
                v-cleave="{
                  phone: true,
                  phoneRegionCode: 'NG',
                  blocks: [4, 3, 4],
                  uppercase: true,
                }"
                type="text"
                name="phoneNumber"
                class="mt-1 focus:ring-custom-primary focus:border-custom-primary block w-full p-2 sm:text-2xl font-semibold border-gray-300 rounded-md placeholder:sm:text-2xl"
                placeholder="XXXX-XXX-XXXX"
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
          @click.prevent="sendMobileDataBundle"
        >
          Continue
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
import { formatToCurrency } from '~/lib/string'
export default {
  name: 'MobileDataModal',
  components: {
    SharedModal: () => import('../shared/Modal'),
    Select: () => import('../shared/form/Select'),
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    providers: {
      type: Array,
      default: () => [],
    },
    bundles: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      amount: '50',
      phoneNumber: '',
      serviceType: null,
      bundle: null,
      formatToCurrency,
    }
  },
  methods: {
    providerSelected(value) {
      console.log(value)
      this.$emit('service-changed', value)
      // const provider = this.providers.find((p) => p.value === value)
      // if (provider) {
      //   this.serviceType = value
      //   this.$emit('service-changed', value)
      // }
    },
    bundleSelected(value) {
      this.bundle = this.bundles.find((p) => p.datacode === +value)
    },
    async sendMobileDataBundle() {
      try {
        await this.$axios.post('/mobile-data', {
          service_type: this.serviceType,
          phone: this.phoneNumber,
          datacode: this.bundle?.datacode,
        })

        this.$toast.alert({
          text: 'Your mobile data recharge request is being processed.',
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
