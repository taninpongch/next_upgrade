<template>
  <div :class="`text-${textalign}`">
    <p class="font-semibold">{{ title }}</p>
    <p>{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string,
    subtitle?: string,
    textalign?: string
  }>(), { textalign: "center" }
)
</script>