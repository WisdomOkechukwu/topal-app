<template>
  <aside
    id="side"
    class="w-full hidden md:flex md:items-center col-span-3 mt-8 sticky top-0"
  >
    <div class="flex flex-col">
      <div class="nav-menu flex flex-col items-center w-full">
        <div class="flex flex-col font-light text-theme-green mt-12">
          <nuxt-link
            class="nav-item flex gap-x-2 items-center text-custom-primary text-sm font-light"
            :class="[active === 'index' ? 'menu-active' : '']"
            to="/"
            @click.prevent="active = 'index'"
          >
            <img class="h-6" src="/icons/MyHome.png" />
            Home</nuxt-link
          >

          <nuxt-link
            class="nav-item flex gap-x-2 items-center text-custom-primary text-sm font-light"
            :class="[active == 'loan-request' ? 'menu-active' : '']"
            to="/loan/request"
            @click.prevent="active = 'loan-request'"
          >
            <img class="h-6" src="/icons/MyLoans1.svg" />
            My Loan
          </nuxt-link>

          <nuxt-link
            class="nav-item flex gap-x-2 items-center text-custom-primary text-sm font-light"
            :class="[active === 'savings' ? 'menu-active' : '']"
            to="/savings"
            @click.prevent="active = 'savings'"
          >
            <img class="h-6" src="/icons/Wallet.svg" />
            My Savings</nuxt-link
          >
          <nuxt-link
            class="nav-item flex gap-x-2 items-center text-custom-primary text-sm font-light"
            :class="[active === 'transactions' ? 'menu-active' : '']"
            to="/transactions"
            @click.prevent="active = 'transactions'"
          >
            <img class="h-6" src="/icons/Transaction.svg" />
            Transactions</nuxt-link
          >
          <nuxt-link
            class="nav-item flex gap-x-2 items-center text-custom-primary text-sm font-light"
            :class="[active === 'profile' ? 'menu-active' : '']"
            to="/profile"
            @click.prevent="active = 'profile'"
          >
            <img class="h-6" src="/icons/MyAccount.svg" />
            My Account</nuxt-link
          >
          <button
            class="nav-item flex gap-x-2 items-center text-custom-primary text-sm font-light"
            :class="[active === 'index' ? 'menu-active' : '']"
            to="/"
            @click.prevent="logout"
          >
            <img class="h-6" src="/icons/Logout.svg" />
            Logout
          </button>
        </div>
        <div class="w-4/5 flex flex-col items-center justify-center h-2/5">
          <div class="bottom-nav p-5 border border-custom-primary">
            <p class="text-custom-primary mb-2 text-sm font-light">
              Enjoy our interest <br />
              rates for your <b>savings</b> plan.
            </p>
            <button
              class="border border-custom-primary calltoact px-4 py-2 flex items-center justify-center text-custom-primary rounded-3xl"
              @click.prevent="isFundWalletModalOpen = true"
            >
              <img class="h-6" src="/icons/MyLoans1.svg" />
              &nbsp; Fund Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
    <fund-wallet-modal
      :is-open="isFundWalletModalOpen"
      @close="isFundWalletModalOpen = false"
    />
  </aside>
</template>

<script>
export default {
  name: 'SideBar',
  components: {
    'fund-wallet-modal': () => import('../wallet/FundWalletModal'),
  },
  props: {
    user: {
      default: () => {},
      type: Object,
    },
  },
  data() {
    return {
      active: 'index',
      isFundWalletModalOpen: false,
    }
  },
  watch: {
    $route(val) {
      console.log(val)
      this.active = val.name
    },
  },
  beforeMount() {
    this.active = this.$route.name
    console.log(this.$route)
  },
  methods: {
    async logout() {
      await this.$auth.logout('laravelJWT')
      await this.$router.replace('/login')
    },
  },
}
</script>

<style scoped>
#side {
  padding: 1.2rem 0;
}

.nav-menu {
  height: 100vh;
}

#logo {
  height: 36px;
  width: 36px;
}

.greeting-text {
  margin: 50px 0 30px;
  font-weight: 600;
  text-align: center;
  color: red;
}

.calltoact {
  font-size: 11px;
  font-weight: 500;
}

.nav-item {
  font-weight: 500;
  padding: 15px 25px;
  margin-bottom: 5px;
  width: 100%;
  cursor: pointer;
  transition-property: opacity, background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease;
  background-color: transparent;
  border-radius: 8px;
}

.nav-item:hover {
  opacity: 0.9;
  background-color: #dde1e7;
}

.nav-item.menu-active {
  background-color: rgb(226 232 240);
}

.bottom-nav {
  margin-top: 100px;
  border-radius: 8px;
  padding: 12px;
}
</style>
