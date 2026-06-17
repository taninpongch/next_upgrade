<template>
  <UFormGroup :label="label" > 
    <template #hint>
      <p v-if="hint == 'ข้อมูลไม่ถูกต้อง'" class="text-red-500">{{ hint }}</p>
      <p v-else class="text-blue-600">{{ hint }}</p>
    </template>
    <UInput :placeholder="placeholder" :type="type" :inputMode="inputMode" :value="modelValue" @input="handleInput"
      :ui="{ base: 'disabled:bg-gray-200 dark:disabled:bg-black' }" v-bind:disabled="$attrs.disabled" />
  </UFormGroup>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    hint: string,
    modelValue?: string,
    label: string,
    placeholder?: string,
    type?: string,
    inputMode?: string,
  }>(), {}
)

const emitName = "update:modelValue";
const emits = defineEmits([emitName]);
function handleInput($ev: any) {
  const evalue = $ev.target.value;
  $ev.target.parentNode.dataset.replicatedValue = evalue;
  emits(emitName, evalue);
}
</script>