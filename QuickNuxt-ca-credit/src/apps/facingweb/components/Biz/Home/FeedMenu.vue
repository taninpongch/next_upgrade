<template>
  <BizHomeFeed v-if="data && data.length > 0" v-for="(item, index) of data" :key="index" v-bind="item" @on-tapped="emits(emitName, item)" />
  <div v-else class="text-center pt-48">
    <UIcon name="i-material-symbols-light-notifications-outline" class="w-20 h-20 text-gray-300" />
  </div>
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    data: {
      src: string,
      title: string,
      description: string,
      expirationDate: string,
      endpointUrl: string,
      status?: string,
      subscriptionId?: string
    }[]
  }>(), {}
)
const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>
