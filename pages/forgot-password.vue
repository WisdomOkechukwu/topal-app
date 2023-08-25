<template>
  <div id="login" class="grid grid-cols-12 w-full min-h-screen">
    <div
      class="sm:col-span-7 col-span-12 w-full md:px-16 md:py-8 px-4 flex flex-col items-center"
    >
      <div class="max-w-sm w-full mx-auto mt-16">
        <div>
          <nuxt-link to="/" class="block mb-16 w-fit">
            <img src="/logo.svg" />
          </nuxt-link>
          <legend class="text-3xl font-semibold text-custom-primary">
            Reset Tapol Password
          </legend>
          <p class="text-md text-gray-400 flex gap-x-2 mt-2 font-normal">
            Don't have an account,
            <nuxt-link
              to="/register"
              class="block text-custom-primary hover:underline"
              >Sign Up</nuxt-link
            >
          </p>
        </div>
        <form autocomplete="off" class="mt-24" @submit.prevent="forgotPassword">
          <div class="relative">
            <input
              v-model="email"
              type="email"
              name="email"
              class="peer h-14 w-full placeholder-transparent focus:outline-none focus:border-gray-100 shadow-sm rounded-3xl focus:ring-0 text-custom-primary border-2 border-gray-200 font-semibold"
              autocomplete="false"
              required
            />
            <label
              class="text-custom-primary ml-4 absolute left-0 -top-5 sm:text-sm text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
              for="email"
              >Email</label
            >
          </div>

          <div class="text-right mt-2">
            <nuxt-link
              to="/login"
              class="sm:text-sm text-xs text-custom-primary font-normal"
              >Do you have an account ?</nuxt-link
            >
          </div>
          <recaptcha />
          <button
            type="submit"
            class="font-normal mt-8 rounded-3xl bg-custom-primary w-fit py-3 px-6 text-white tracking-wider hover:bg-opacity-90 text-sm"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
    <div
      class="sm:col-span-5 bg-contain hidden sm:block"
      style="
        background: url('/backgrounds/tapol-side.svg') no-repeat;
        background-size: cover;
      "
    ></div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPasswordPage',
  middleware: 'guest',
  data: () => ({
    email: null,
    //   password: null,
    //   passwordIsVisible: false,
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
    getDeviceType() {
      const ua = navigator.userAgent
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet'
      }
      if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
          ua
        )
      ) {
        return 'mobile'
      }
      return 'desktop'
    },
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
            // agent: navigator.userAgent,
            // time: new Date(),
            // device: this.getDeviceType(),
          },
        })
        console.log(123456)
        this.$router.push('')
      } catch (error) {
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
      }
    },
    async forgotPassword() {
      const params = {
        email: this.email,
      }
      console.log(params)
      // const token = await this.$recaptcha.getResponse()
      // console.log('ReCaptcha token:', token)
      await this.$apiservice
        .forgotpassword(params)
        .then((res) => {
          this.$toast.alert({
            text: res.data.message,
            type: 'success',
            time: 3,
            position: 'top',
          })
          // this.$recaptcha.reset()
          this.$router.push('/login')
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
