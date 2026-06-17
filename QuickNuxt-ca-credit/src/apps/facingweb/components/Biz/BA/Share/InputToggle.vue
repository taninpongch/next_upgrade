<template>
  <UFormGroup :label="label">
    <div class="relative flex items-start">
      <div class="flex items-center h-5">
        <UToggle :modelValue="modelValue" @update:modelValue="$emit(emitName, $event)" :disabled="disabled" />
      </div>
      <div class="ms-3 flex flex-col">
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-200"
          @click="!disabled && $emit(emitName, !modelValue)">
          {{ textToggle }}
        </label>
        <BizShareText v-if="description" :text="description" color="gray" class="text-sm" />
      </div>
    </div>
  </UFormGroup>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: boolean,
    label?: string,
    textToggle: string,
    description?: string,
    disabled?: boolean
  }>(), {}
)

const emitName = "update:modelValue";
const emits = defineEmits([emitName]);
</script>