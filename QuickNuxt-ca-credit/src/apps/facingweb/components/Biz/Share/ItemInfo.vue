<template>
  <div>
    <BizShareSessionTitle :label="heading" :button="titleButton" @on-tapped="emits(emitName)"/>
    <BizShareItem :src="src" :title="title" :description="description" :transparent="true" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    heading: string,
    src?: string,
    title: string,
    description?: string,
    titleButton?: {
      icon: string,
      label: string
    }
  }>(), {}
)

const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>