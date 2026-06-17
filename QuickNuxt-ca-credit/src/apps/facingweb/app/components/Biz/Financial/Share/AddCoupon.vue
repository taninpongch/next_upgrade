<template>
  <div>
    <BizShareSessionTitle :label="heading" :button="button" @on-tapped="emits(emitTappedName)" />
    <BizShareItem v-for="(item) in data" :src="item.src" :title="item.title" :transparent="true">
    </BizShareItem>
  </div>
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    heading: string,
    button?: {
      icon: string,
      label: string
    }
    data?: {
      id?: string,
      src?: string,
      title: string
    }[]
  }>(), {}
);

const emitTappedName = "onTapped";
const emits = defineEmits([emitTappedName]);
</script>