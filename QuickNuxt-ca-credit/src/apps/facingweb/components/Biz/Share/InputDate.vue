<template>
  <UFormGroup :label="label">
    <UPopover :ui="{ trigger: '' }" :popper="{ placement: 'bottom-start' }" v-bind:disabled="$attrs.disabled">
      <UInput :placeholder="placeholder" :ui="{ base: 'disabled:bg-gray-200 dark:disabled:bg-black' }"
      :value="modelValue ? format(date, 'd MMMM yyyy') : ''" v-bind:disabled="$attrs.disabled" />
        
      <template #panel="{ close }">
        <MuiDatePicker v-model="date" @close="close" @update:model-value="handleInput" />
      </template>
    </UPopover>
  </UFormGroup>
</template>

<script setup lang="ts">
import { format } from "date-fns";
const props = withDefaults(
  defineProps<{
    modelValue?: string,
    label: string,
    placeholder?: string
  }>(), {}
)

const initDate = computed(() => {
  return props.modelValue ? new Date(props.modelValue) : new Date();
});

const date = ref(initDate)

const emitName = "update:modelValue";
const emits = defineEmits([emitName]);
function handleInput(value: any) {
emits(emitName, value.toISOString())
}
</script>
