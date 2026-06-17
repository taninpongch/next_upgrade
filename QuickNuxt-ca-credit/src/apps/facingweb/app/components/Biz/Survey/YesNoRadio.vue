<!-- components/YesNoRadio.vue -->
<template>
  <div class="flex flex-col w-full max-w-md mx-auto space-y-4">
    <URadio v-model="modelValue" :value="options[0]" :label="options[0]" class="text-center" :disabled="disabled" />
    <URadio v-model="modelValue" :value="options[1]" :label="options[1]" class="text-center" :disabled="disabled" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  options: string[]
  disabled?: boolean
}>()

const modelValue = defineModel<string>()
</script>
