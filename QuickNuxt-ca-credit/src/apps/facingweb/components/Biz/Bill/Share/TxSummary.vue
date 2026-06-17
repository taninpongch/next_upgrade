<template>
  <BizShareSessionTitle :label="heading" />
  <UFormGroup v-for="(item, index) in data" :label="item.description">
    <template #hint>
      <BizShareText :text="item.value" :is-bold="index == data.length - 1"
        :color="index == data.length - 1 ? 'red' : ''" />
    </template>
  </UFormGroup>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    heading: string
    data: {
      description: string,
      value: string
    }[],
  }>(), {}
)
</script>