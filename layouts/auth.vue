<template>
  <div id="auth" class="bg-theme-blue grid fixed w-full">
    <div class="w-full bg-white hpd">
      <nav
        class="flex justify-between items-center md:px-18 md:py-6 mx-auto w-full"
        style="height: 65px"
      >
        <div class="lg:p-0 py-4 pl-4">
          <nuxt-link to="/" class="block w-fit">
            <img src="/logo.svg" class="h-12" />
          </nuxt-link>
        </div>
        <a
          class="h-10 w-10 p-0.5 flex items-center justify-center bg-theme-white rounded-full shadow-sm cursor-pointer"
        >
          <img
            v-if="$auth.user.profile_picture_link != null"
            id="logo"
            class="rounded-full mx-auto h-8 w-8"
            :src="$auth.user.profile_picture_link"
          />
          <img
            v-else
            id="logo"
            class="rounded-full mx-auto h-8 w-8"
            src="/img/proimg.png"
          />
        </a>
      </nav>
    </div>
    <div
      id="content-wrapper"
      class="w-full h-full grid grid-cols-12 mx-auto overflow-y-scroll pb-28 px-8"
      :style="{ height: height }"
    >
      <!-- max-w-6xl -->
      <side-bar :user="$auth.user" />
      <div
        id="content"
        class="bg-theme-white md:rounded-tl-2xl h-full w-full pt-12 md:col-span-9 col-span-12"
      >
        <legend
          class="greeting-text text-3xl font-light capitalize text-custom-primary"
        >
          Hi,
          <nuxt-link to="/profile" class="text-theme-green capitalize"
            >{{ $auth.user.firstname }}!</nuxt-link
          >
        </legend>
        <div
          class="dark-mode:text-gray-200 dark-mode:bg-gray-800 w-full bg-white text-gray-700 sm:hidden"
        >
          <div
            class="mx-auto flex max-w-screen-xl flex-col px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8"
          >
            <div class="flex flex-row items-center justify-between p-4">
              <button
                class="focus:shadow-outline rounded-lg focus:outline-none md:hidden"
                @click.prevent="showMobileModal()"
              >
                <svg fill="currentColor" viewBox="0 0 20 20" class="h-6 w-6">
                  <path
                    x-show="!open"
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <nav
              id="responsive-dropdown"
              class="hidden flex-grow flex-col pb-4 md:flex md:flex-row md:justify-end md:pb-0"
            >
              <input id="dropdown-checker" type="hidden" value="closed" />
              <nuxt-link
                to="/"
                class="dark-mode:bg-transparent dark-mode:text-gray-200 px px-4 py-2 text-sm font-semibold md:ml-4 md:mt-0"
                >Home</nuxt-link
              >
              <nuxt-link
                to="/loan/request"
                class="dark-mode:bg-transparent dark-mode:text-gray-200 px px-4 py-2 text-sm font-semibold md:ml-4 md:mt-0"
                >Loan</nuxt-link
              >
              <nuxt-link
                to="/savings"
                class="dark-mode:bg-transparent dark-mode:text-gray-200 px px-4 py-2 text-sm font-semibold md:ml-4 md:mt-0"
                >Savings</nuxt-link
              >
              <nuxt-link
                to="/transactions"
                class="dark-mode:bg-transparent dark-mode:text-gray-200 px px-4 py-2 text-sm font-semibold md:ml-4 md:mt-0"
                >Transactions</nuxt-link
              >
              <nuxt-link
                to="/Profile"
                class="dark-mode:bg-transparent dark-mode:text-gray-200 px px-4 py-2 text-sm font-semibold md:ml-4 md:mt-0"
                >Profile</nuxt-link
              >
              <button
                to="/"
                class="dark-mode:bg-transparent dark-mode:text-gray-200 px px-4 py-2 text-sm font-semibold md:ml-4 md:mt-0"
                @click.prevent="logout"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '~/components/shared/SideBar'
export default {
  name: 'AuthLayout',
  components: {
    SideBar,
    'fund-wallet-modal': () => import('../components/wallet/FundWalletModal'),
  },
  middleware: ['auth', 'email'],
  data() {
    return {
      height: '100vh',
      isFundWalletModalOpen: false,
    }
  },
  computed: {},
  async mounted() {
    try {
      await this.$recaptcha.init()
    } catch (e) {
      console.error(e)
    }
    window.addEventListener('resize', (e) => {
      this.height = e.target.innerHeight + 'px'
    })
  },
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
    showMobileModal() {
      const nav = document.getElementById('responsive-dropdown')
      const checker = document.getElementById('dropdown-checker')

      if (checker.value === 'closed') {
        document
          .getElementById('responsive-dropdown')
          .classList.remove('hidden')
        document.getElementById('responsive-dropdown').classList.add('flex')
        checker.value = 'opened'
      } else {
        document.getElementById('responsive-dropdown').classList.remove('flex')
        document.getElementById('responsive-dropdown').classList.add('hidden')
        checker.value = 'closed'
      }
    },
    async logout() {
      await this.$auth.logout('laravelJWT')
      await this.$router.replace('/login')
    },
  },
}
</script>

<style scoped>
#auth {
  min-height: 100vh;
  background: #f9f9fa;
}

#side {
  max-width: 230px;
}

#content-wrapper {
  min-height: inherit;
}

#content {
  min-height: inherit;
  width: inherit;
}

@media screen and (max-width: 640px) {
  #content-wrapper {
    width: inherit;
  }

  #content-wrapper > nav {
    width: 100%;
    top: 0;
    left: 0;
    padding: 20px;
    display: flex;
    margin: 0;
    z-index: 20;
  }
}

#content-wrapper #content {
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

*::-webkit-scrollbar {
  /* WebKit */
  width: 0;
  height: 0;
}

.hpd {
  padding-left: 60px;
  padding-right: 60px;
}
</style>
