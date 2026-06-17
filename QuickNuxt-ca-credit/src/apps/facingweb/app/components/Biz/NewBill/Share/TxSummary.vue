<template>
  <BizShareSessionTitle :label="heading" />
  <UFormGroup v-for="(item, index) in data" :label="item.description">
    <template #hint>
      <BizShareText :text="item.value" :is-bold="index == data.length - 1"
        :color="index == data.length - 1 ? 'red' : ''" />
      <!-- <BizShareText v-if="index == 3" :text="item.value" :is-bold="index == 3" :color="index == 3 ? 'red' : ''" />
      <BizShareText v-else-if="index == 4" :text="item.value" :is-bold="index == 4" :color="index == 4 ? 'red' : ''" />
      <BizShareText v-else :text="item.value" /> -->
    </template>
  </UFormGroup>
  <UDivider />
  <BizShareSessionTitle label="คูปอง" />
  <BizShareItem title="-" :transparent="true" />

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