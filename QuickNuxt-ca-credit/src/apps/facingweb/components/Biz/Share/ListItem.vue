<template>
  <BizShareSessionTitle :label="heading" :button="button" @on-tapped="emits(emitTappedName)" />
  <BizShareItem v-for="(item) in data" :src="item.src" :title="item.title" :description="item.description"
    @on-tapped="emits(emitSelectItemName, item)">
  </BizShareItem>
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    heading: string,
    button?: {
      icon: string,
      label: string
    }
    data: {
      id?: string,
      src?: string,
      title: string,
      description?: string,
      path: string
    }[]
  }>(), {}
)

const emitTappedName = "onTapped";
const emitSelectItemName = "onSelectItem";
const emits = defineEmits([emitTappedName, emitSelectItemName]);
</script>