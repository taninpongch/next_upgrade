<template>
  <div @click="visit">
    {{ demoData }}
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { getManaContext } from "@manaapp/ui";

const { goVisit } = useManaService();
const _data = useDemoStore();
const lib = await getManaContext();
const { demoData } = storeToRefs(_data);
const { getData, postData } = _data;

await getData('subscriptionId', 'path')

const submitFn = async () => {
  await postData('formData', 'subscriptionId', 'path');
}

const visit = async () => {
  goVisit("subscriptionId", "flow", "endpoindId")
}

</script>

<style></style>