<template>
  <div
    id="register"
    class="w-full min-h-screen container mx-auto md:py-8 px-4 sm:px-0"
  >
    <nuxt-link to="/" class="block my-16 w-fit">
      <img src="/logo.svg" />
    </nuxt-link>
    <div class="grid grid-cols-12 md:gap-8 w-full items-start">
      <div class="sm:col-span-4 col-span-12 w-full mx-auto">
        <div>
          <legend class="text-3xl mb-8 font-normal text-custom-primary">
            Sign Up
          </legend>
          <p class="text-xl text-gray-400 opacity-90 flex gap-x-2 font-light">
            Our form only takes a few minutes to complete.
          </p>
          <p
            class="text-xl text-gray-400 opacity-90 flex gap-x-2 mt-4 font-light"
          >
            Let's make this easier! (ready, set go)
          </p>
        </div>
      </div>

      <div
        class="sm:col-span-8 col-span-12 mt-16 shadow-lg rounded-xl overflow-hidden max-w-xl"
      >
        <!-- Insert tab -->
        <tab
          :menu-items="['personal', 'work status', 'confirm profile']"
          :active="component"
          @handleOnClick="handleOnClick"
        />
        <!-- Insert components -->
        <recaptcha />
        <keep-alive>
          <component :is="component" @submit="handleSubmit" />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  components: {
    personal: () => import('~/components/register/personal'),
    'work-status': () => import('~/components/register/work-status'),
    'confirm-profile': () => import('~/components/register/confirm-profile'),
    tab: () => import('~/components/register/tab'),
  },
  middleware: 'guest',
  data: () => ({
    component: 'personal',
    formData: {},
  }),
  created() {
    // console.log(this.$device.db)
    // let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    // if (isMobile) {
    //     //Conditional script here
    //   console.log("Console Mobile");
    //   window.location.assign('getapp')
    // }
  },
  methods: {
    handleOnClick(data) {
      this.component = data.toLowerCase().replaceAll(' ', '-')
    },
    handleSubmit(data) {
      if (data?.stage === 'personal') {
        this.component = 'work-status'
        this.formData = { ...this.formData, ...data.data }
      }
      if (data?.stage === 'work-status') {
        this.component = 'confirm-profile'
        console.log(data.data)
        this.formData = {
          ...this.formData,
          ...data.data,
          // work_status: {
          //   ...this.formData.work_status,
          //   ...data.data,
          // },
        }
      }
      if (data?.stage === 'confirm-profile') {
        this.formData = {
          ...this.formData,
          ...data.data,
        }
        this.register()
      }
    },
    async register() {
      try {
        // const token = await this.$.getResponse()
        // console.log('ReCaptcha token:', token)
        const response = await this.$axios.post(
          '/customerauth/register',
          this.formData
        )
        if (response.status === 200) {
          this.$toast.alert({
            text: `Account created successfully, please login with registered credentials.`,
            type: 'success',
            time: 3,
            position: 'top',
          })
          this.$router.push('/login')
        }
        // await this.$recaptcha.reset()
      } catch (error) {
        let message
        if ([419, 401, 400].includes(error?.response?.status)) {
          message = error?.response.data?.message || error?.response.data?.error
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
      }
    },
  },
}
</script>
