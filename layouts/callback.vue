<template>
  <div id="callback" class="bg-theme-blue grid fixed w-full">
    <div class="w-full bg-white">
      <nav
        class="flex justify-between items-center md:px-20 md:py-6 max-w-6xl mx-auto w-full"
      >
        <div class="lg:p-0 py-4 pl-8">
          <nuxt-link to="/" class="block w-fit">
            <img src="/logo.svg" class="h-12" />
          </nuxt-link>
        </div>
        <a
          class="h-10 w-10 p-0.5 flex items-center justify-center bg-theme-white rounded-full shadow-sm cursor-pointer"
        >
          <img
            id="logo"
            class="rounded-full mx-auto h-8 w-8"
            src="/images/logo.svg"
          />
        </a>
      </nav>
    </div>
    <div
      id="content-wrapper"
      class="w-full h-full grid grid-cols-12 max-w-6xl mx-auto overflow-y-scroll"
      :style="{ height: height }"
    >
      <div
        id="content"
        class="bg-theme-white md:rounded-tl-2xl h-full w-full pt-12 col-span-12"
      >
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CallbackLayout',
  middleware: ['auth', 'email'],
  data() {
    return {
      height: '100vh',
    }
  },
  computed: {},
  mounted() {
    window.addEventListener('resize', (e) => {
      this.height = e.target.innerHeight + 'px'
    })
  },
}
</script>

<style scoped>
#callback {
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
</style>
