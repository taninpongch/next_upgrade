<template>
  <BizShareActionNormal :icon="icon" :label="label" color="black"
    variant="ghost" @on-tapped="emits(emitName)"/>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    icon?: string,
    label?: string
  }>(), { }
)
const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>