<template>
  <UForm class="space-y-4" :schema="schema" :state="state" @submit="onSubmit">
    <slot></slot>
  </UForm>
</template>

<script setup lang="ts">
const props = defineProps<{
  schema?: unknown,
  state?: Record<string, any>,
}>();

const emit = defineEmits(['submit']);

function onSubmit(event: any) {
  emit('submit', event);
}
</script>