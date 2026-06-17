<template>
  <UButton :block="blocked" :size="size"
    :ui="{ rounded: rounded ? 'rounded-full' : 'round-md', font: 'font-semibold', variant: { solid: ' dark:bg-{color}-500 dark:text-white' }, base: 'disabled:opacity-50 dark:disabled:opacity-50 ' }"
    :icon="icon" :label="label" :color="color"  @click="emits(emitName)"/>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    icon?: string,
    label?: string,
    rounded?: boolean
    blocked?: boolean
    color?: string,
    size?: string
  }>(), { blocked: true, color: "red", size: "xl" }
)

const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>