<template>
  <div :class="displayPadding">
    <BizSharePartyHero :src="src" :title="title" :subtitle="description" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string,
    title: string
    description: string,
    padding?: string
  }>(), { padding: 'lg' }
)

const displayPadding = computed(() => {
  let value = 0;
  switch (props.padding) {
    case 'xs': value = 0;
      break;
    case 'sm': value = 12;
      break;
    case 'md': value = 24;
      break;
    case 'lg':
    default: value = 48;
      break;
  }
  return `pt-${value}`;
});
</script>