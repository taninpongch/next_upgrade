<template>
  <div class="flex flex-wrap items-center gap-4"
    v-bind:class="{ 'justify-end': rightAlignment, 'justify-between': !rightAlignment }">
    <div class="flex flex-wrap items-center gap-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    rightAlignment?: boolean
  }>(), { rightAlignment: false }
)
</script>