<template>
  <UFormGroup :label="label" :ui="{ label: { base: isBold ? 'font-bold' : '' } }">
    <template #hint v-if="button">
      <BizShareActionNormal variant="soft" color="gray" v-bind="button" size="sm" @on-tapped="emits(emitName)" />
    </template>
  </UFormGroup>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string,
    button?: {
      icon: string,
      label: string
    },
    isBold?: boolean,
  }>(), { isBold: false }
)

const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>