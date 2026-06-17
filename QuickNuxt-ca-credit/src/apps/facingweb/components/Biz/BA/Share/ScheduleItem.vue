<template>
  <MuiCard :ui="{ body: { base: 'grid grid-cols-4' } }">
    <BizBAShareInputToggle :modelValue="modelValue" :textToggle="label" :description="description"
      @update:modelValue="$emit(emitUpdateValue, $event)" class="col-span-3" />
    <BizShareSessionTitle label=" " :button="{ icon: '', label: 'แก้ไข' }" @on-tapped="emits(emitName)" />
  </MuiCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: boolean,
    label: string,
    description?: string
  }>(), {}
)

const emitName = "onTapped";
const emitUpdateValue = "update:modelValue";
const emits = defineEmits([emitName, emitUpdateValue]);
</script>