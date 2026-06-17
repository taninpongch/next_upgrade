<template>
  <UAlert :title="title" :ui="{ title: 'text-center' }" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
  }>(), { title: "ไม่มีรายการ" }
)
</script>