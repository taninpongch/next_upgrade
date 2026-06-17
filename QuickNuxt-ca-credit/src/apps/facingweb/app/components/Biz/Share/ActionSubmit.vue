<template>
  <BizShareActionNormal :label="label" type="submit" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string
  }>(), { label: "ตกลง" }
)
</script>