<template>
  <div>
    <BizShareSessionTitle :label="heading" />
    <BizShareItem v-for="(item, i) in infos" :title="item?.label" :src="item?.src" :description="item?.value"
      :transparent="true" :ui="{ wrapper: '-mb-4', padding: 'py-4 pl-2.5 pr-4' }" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    heading: string,
    infos: {
      src?: string,
      label: string,
      value: string,
    }[]
  }>(), {}
)
</script>