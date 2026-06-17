<template>
  <BizSharePartyHero :src="src" :title="title" />
  <p><span v-html="paragraph"></span></p>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string,
    src: string,
    paragraph: string
  }>(), {}
)
</script>