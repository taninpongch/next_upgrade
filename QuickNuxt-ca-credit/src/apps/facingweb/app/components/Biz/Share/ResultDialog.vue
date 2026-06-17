<template>
  <div class="text-center">
    <p>{{ data.Title }}</p>
    <BizShareImage :src="data.Logo" />
    <p>{{ data.Message }}</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    data: any,
  }>(), {}
)
</script>