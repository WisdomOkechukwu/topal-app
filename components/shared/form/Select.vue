<template>
  <div
    :class="[
      wrapperOverideClass ? wrapperOverideClass : `col-span-6 sm:col-span-3`,
    ]"
  >
    <label
      for="country"
      :class="[
        labelOverideClass
          ? labelOverideClass
          : `block text-sm text-left font-medium text-gray-700`,
      ]"
      >{{ label }}</label
    >
    <select
      :id="id"
      v-model="selected"
      :name="name"
      :autocomplete="autocomplete"
      :class="[
        inputOverideClass
          ? inputOverideClass
          : `
        mt-1
        block
        w-full
        py-2
        px-3
        border border-gray-300
        bg-white
        rounded-md
        shadow-sm
        focus:outline-none focus:ring-custom-primary focus:border-custom-primary
        sm:text-sm
      `,
      ]"
      @change.prevent="(e) => $emit('value-changed', e.target.value)"
    >
      <option :value="null" disabled>Choose</option>
      <option v-for="(entry, i) in entries" :key="i" :value="entry.value">
        {{ entry.label | capitalize }} {{ entry.prize | currency('₦') }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'DropDown',
  props: {
    labelHtmlFor: {
      type: String,
      default: 'select',
    },
    label: {
      type: String,
      default: 'Select',
    },
    name: {
      type: String,
      default: undefined,
    },
    id: {
      type: String,
      default: undefined,
    },
    wrapperOverideClass: {
      type: String,
      default: undefined,
    },
    labelOverideClass: {
      type: String,
      default: undefined,
    },
    inputOverideClass: {
      type: String,
      default: undefined,
    },
    autocomplete: {
      type: String,
      default: undefined,
    },
    entries: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selected: null,
    }
  },
}
</script>
