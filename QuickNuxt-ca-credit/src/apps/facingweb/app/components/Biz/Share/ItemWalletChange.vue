<template>
  <div>
    <BizShareSessionTitle :label="heading" :button="button" @on-tapped="emits(emitName)" :is-bold="isBold" />
    <BizShareItemStatus :src="src" :title="title" :rightText="rightText" :transparent="true"
      @on-tapped="emits(emitName)" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    heading: string,
    src?: string,
    title: string,
    rightText?: string,
    button?: {
      icon: string,
      label: string
    }
    isBold?: boolean,
  }>(), { rightText: "" }
)

const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>