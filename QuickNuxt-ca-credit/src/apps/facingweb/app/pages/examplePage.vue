<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <pre>{{ demoData }}</pre>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const _data = useDemoStore();
const { demoData, pending } = storeToRefs(_data);
const { getData } = _data;
getData('subscriptionId', 'path')
</script>