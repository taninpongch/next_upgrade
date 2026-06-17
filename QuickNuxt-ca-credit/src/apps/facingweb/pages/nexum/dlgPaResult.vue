<template>
  <MuiPage>
    <BizShareResultDialog :data="data.Result" />
  </MuiPage>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const _data = useResultDlgStore();
const { data } = storeToRefs(_data);
const { getData } = _data;
await getData();
</script>
