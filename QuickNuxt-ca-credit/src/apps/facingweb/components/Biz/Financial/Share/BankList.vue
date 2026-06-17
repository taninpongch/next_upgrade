<template>
  <div>
    <BizShareSessionTitle :label="heading" />
    <div v-for="item in data">
      <BizShareItemStatus :src="item.src" :title="item.title" :description="item.description" rightText="เลือก"
        :transparent="true" :is-divider="true" @on-tapped="emits(emitSelectItemName, item)" />
      <UDivider />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    heading: string
    data: {
      id: string,
      src?: string,
      title: string,
      description?: string,
    }[]
  }>(), {}
)

const emitSelectItemName = "onTapped";
const emits = defineEmits([emitSelectItemName]);
</script>