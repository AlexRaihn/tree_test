<style src="./MButton.sass" scoped lang="sass" />

<script setup lang="ts">
defineProps({
  bg: {
    type: String,
    required: false,
    default: 'bg-black',
  },
  text_color: {
    type: String,
    required: false,
    default: 'text-white',
  },
  isLoading: {
    type: Boolean,
    required: false,
  },
})
</script>

<template>
  <div>
    <component
      :is="'button'"
      class="MButton"
      :class="[
        bg,
        text_color,
        isLoading ? '-disabled pointer-events-none' : '',
      ]"
      :disabled="isLoading"
    >
      <div v-if="!isLoading">
        <slot />
      </div>
      <div v-else>Загрузка...</div>
    </component>
  </div>
</template>
