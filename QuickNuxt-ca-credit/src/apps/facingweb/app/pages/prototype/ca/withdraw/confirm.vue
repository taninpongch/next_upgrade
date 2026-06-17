<template>
  <MuiPage>
    <MuiHeader title="ยินยันบัญชี" />
    <BizShareManaForm @submit="onSubmit">
      <MuiCard>
        <BizShareItemInfo heading="ธุรกิจที่ถอน" src="https://failfast.blob.core.windows.net/easy/ba/assets/default-ba.png"
          title="Food Prada" />
      </MuiCard>
      <MuiCard>
        <BizShareListInfoHorizontal heading="ถอนไปยังบัญชี" :infos="detailOrigin.details" />
      </MuiCard>
      <MuiCard>
        <BizShareSessionTitle label="จำนวนที่ต้องการถอน" />
        <BizSharePartyHero src="i-heroicons-arrow-up-tray-solid" title="500.00 THB" subtitle="" />
      </MuiCard>
      <MuiCard>
        <BizShareItemInfo heading="หมายเหตุ" title="-" />
      </MuiCard>
      <ActionButton text="ยืนยัน" />
    </BizShareManaForm>
  </MuiPage>
</template>

<script lang="ts" setup>
import { getManaContext, ActionButton } from "@manaapp/ui";
const lib = await getManaContext();
const { goVisit } = useManaService();
const kymStore = useKymStore();
const { getData, postData } = kymStore;

const detailOrigin = {
  details: [
    { label: "ธนาคาร", value: "กรุงไทย" },
    { label: "เลขบัญชี", value: "****56789" },
    {
      label: "ประเภท",
      value: "บัญชีธนาคาร",
    },
    { label: "ชื่อบัญชี", value: "ห้างหุ้นส่วน food prada จำกัด" },
    { label: " ", value: "food prada inc." },
  ],
};
async function onSubmit() {
  // TODO:Implement submit
  await postData({}, "post-ca-withdraw-confirm");
  // await goVisit("kym", "proto-ca-withdraw-confirm-dlg", "ca-withdraw");
  // await navigateTo("resultDialog");
}
</script>

<style></style>
