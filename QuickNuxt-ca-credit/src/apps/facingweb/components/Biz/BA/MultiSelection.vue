<template>
  <BizShareSessionTitle :label="heading" />
  <div v-for="item in data">
    <BizShareInputCheckbox v-model="item.isCheck" :textCheckbox="item.label" />
    <UDivider class="pt-4" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    heading: string
    data: {
      isCheck?: boolean,
      label: string,
    }[]
  }>(), {}
)
</script>