<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="การเข้าร่วมสัญญา" />
      <BizShareManaForm @submit="onSubmit">
        <MuiCard>
          <BizShareSessionTitle label="ผู้ส่งสัญญา" />
          <BizSharePartyHero :src="displayImage" :title="data?.consentfrom?.name"
            :subtitle="consentDate" />
        </MuiCard>
        <MuiCard>
          <BizShareItemInfo heading="สถานะการทำสัญญา"
            :title="`บริษัท ${data?.consentfrom?.name} เชื่อมต่อระบบกับธุรกิจ '${data?.baName}' ของคุณสำเร็จแล้ว`" />
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

getData('get-nexum-announce-shopStatus').then(async () => {
  consentDate.value = manaLib.getDateText(data?.value?.consentfrom?.createdDate);
  displayImage.value = manaLib.getUrl(data.value?.consentfrom?.logoHost ? data.value?.consentfrom?.logoHost : "failfast.blob.core.windows.net", data.value?.consentfrom?.logoPath ? data.value?.consentfrom?.logoPath : "mcontent-imgs/defaults/dfshop.png");
});

async function onSubmit() {
  await postData({}, "post-nexum-announce-shopStatus");
}
</script>