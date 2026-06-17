<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="แจ้งระงับเครดิตชั่วคราว" />
      <BizShareManaForm @submit="onSubmit">
        <MuiCard>
          <BizShareSessionTitle label="ผู้ส่ง" />
          <BizSharePartyHero :src="displayImage" :title="data?.baName" :subtitle="consentDate" />
        </MuiCard>
        <MuiCard>
          <div>
            <BizShareText text="สถานะของคุณ" alignment="center" />
            <BizShareText text="ถูกระงับการใช้เครดิตชั่วคราว" color="red" alignment="center" :is-bold="true" />
            <BizShareText text="(สามารถจ่ายบิลได้ตามปกติ)" color="red" alignment="center" :is-bold="true" />
            <BizShareText :text="`กรุณาติดต่อ ${data?.baName}`" alignment="center" />
            <BizShareText text="หากต้องการรายละเอียดเพิ่มเติม" alignment="center" />
          </div>
        </MuiCard>
        <ActionButton text="ตกลง" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext, ActionButton } from "@manaapp/ui";

const manaLib = await getManaContext();
const nexumStore = useNexumStore();
const { getData, postData } = nexumStore;
const { data, pending } = storeToRefs(nexumStore);
const displayImage = ref();
const consentDate = ref();

getData('get-nexum-suspendcredit').then(async () => {
  consentDate.value = manaLib.getDateText(data?.value?.createdDate);
  displayImage.value = manaLib.getUrl(data.value?.baPicUrl?.host ? data.value?.baPicUrl?.host : "failfast.blob.core.windows.net", data.value?.baPicUrl?.path ? data.value?.baPicUrl?.path : "mcontent-imgs/defaults/dfshop.png");
});

async function onSubmit() {
  await postData({}, "post-nexum-suspendcredit");
}
</script>