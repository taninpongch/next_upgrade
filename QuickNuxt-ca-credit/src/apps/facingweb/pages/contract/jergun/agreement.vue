<template>
  <MuiPage>
    <MuiHeader title="รายละเอียดสัญญา" />


    <MuiCard>
      <BizShareText :isBold="true" alignment="center" :text="data?.titleTH" />
      <!-- <BizShareText alignment="" :text="data?.agreementText" /> -->
      <p><span v-html="data?.agreementText"></span></p>
    </MuiCard>
  </MuiPage>

</template>


<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ConsentButtonsBand, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const _data = useJergunStore();
const { dataJergun, pending } = storeToRefs(_data);
const { getData } = _data;
const data = ref<any>();

getData("get-agreement").then(async () => {
  data.value = dataJergun.value;
});
</script>