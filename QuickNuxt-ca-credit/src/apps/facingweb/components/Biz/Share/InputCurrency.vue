<template>
  <UFormGroup :label="label">
    <UInput :placeholder="placeholder" :ui="{ base: 'disabled:bg-gray-200 dark:disabled:bg-black' }"
      v-bind:disabled="$attrs.disabled" type="number" :value="modelValue" @input="handleInput" step="0.01">
      <template #trailing>
        <span class="text-gray-500 dark:text-gray-400 text-xs">{{ currency }}</span>
      </template>
    </UInput>
  </UFormGroup>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string,
    label: string,
    placeholder?: string,
    currency?: string,
  }>(), { currency: "THB" }
)
const emits = defineEmits(['update:modelValue']);
function handleInput($ev: any) {
  const evalue = $ev.target.value;
  $ev.target.parentNode.dataset.replicatedValue = evalue;
  emits('update:modelValue', evalue)
}
</script>