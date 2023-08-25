<template>
  <div
    class="flex justify-between w-full items-center text-custom-white bg-custom-primary px-8"
  >
    <button
      v-for="(item, i) in menuItems"
      :key="i"
      class="sm:text-[18px] text-sm font-light hover:opacity-100 block w-fit sm:py-4 sm:px-4 sm:border-b-8 p-2 border-b-4 capitalize"
      :class="[
        item,
        active === item.replace(/\s/g, '-')
          ? 'border-custom-pink opacity-100'
          : 'opacity-50 border-transparent',
      ]"
      @click="() => $emit('handleOnClick', item)"
    >
      {{ item }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'TabForRegisteration',
  props: {
    menuItems: {
      type: Array,
      default: () => [],
    },
    active: {
      type: String,
      default: 'personal',
    },
  },
  data: () => ({}),
}
</script>
