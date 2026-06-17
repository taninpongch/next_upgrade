<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="แจ้งยกเลิกระงับเครดิต" />
      <BizShareManaForm @submit="onSubmit">
        <MuiCard>
          <BizShareSessionTitle label="ผู้ส่ง" />
          <BizSharePartyHero :src="displayImage" :title="data?.baName" :subtitle="consentDate" />
        </MuiCard>
        <MuiCard>
          <div>
            <BizShareText text="สถานะของคุณ" alignment="center" />
            <BizShareText text="ใช้เครดิตได้ตามปกติ" color="blue" alignment="center" :is-bold="true" />
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

getData('get-nexum-unsuspendcredit').then(async () => {
  consentDate.value = manaLib.getDateText(data?.value?.createdDate);
  displayImage.value = manaLib.getUrl(data.value?.baPicUrl?.host ? data.value?.baPicUrl?.host : "failfast.blob.core.windows.net", data.value?.baPicUrl?.path ? data.value?.baPicUrl?.path : "mcontent-imgs/defaults/dfshop.png");
});

async function onSubmit() {
  await postData({}, "post-nexum-unsuspendcredit");
}
</script>