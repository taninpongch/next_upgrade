<template>
  <img class="w-96 h-28 rounded-lg"
    :src="src ? src : 'https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/dfrestBanner.png'" />
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    src: string,
  }>(), {}
)

</script>