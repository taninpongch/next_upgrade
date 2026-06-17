<template>
  <MuiPage>
    <MuiHeader title="ข้อมูลการยืนยันตัวตนของผู้เปิดธุรกิจ" />
    <BizShareSessionTitle label="ข้อมูลขั้นพื้นฐานของคุณ" />
    <MuiCard>
      <BizShareListInfoHorizontal heading="" :infos="kycinfo" />
    </MuiCard>
  </MuiPage>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useBAStore();
const { dataLocal } = storeToRefs(store);
const { getOptionDialogSelection } = store;

getOptionDialogSelection().then(async () => {
});

const kycinfo = computed(() => {
  return [
    { label: "ชื่อ", value: dataLocal.value?.kycInfo?.firstName ?? "" },
    { label: "นามสกุล", value: dataLocal.value?.kycInfo?.lastName ?? "" },
    { label: "วัน/เดือน/ปีเกิด", value: displayBirthday(dataLocal.value?.kycInfo?.birthDay)},
    { label: "เลขบัตร ปปช.", value: dataLocal.value?.kycInfo?.pid ?? "" },
    { label: "เลขหลังบัตร ปปช.", value: dataLocal.value?.kycInfo?.laserId ?? "" },
    { label: "ที่อยู่", value: displayFullAddress(dataLocal.value?.kycInfo?.address) ?? "" },
    { label: "อาชีพ", value: dataLocal.value?.kycInfo?.occupation?.title ?? "" },
    { label: "เบอร์โทรศัพท์", value: dataLocal.value?.kycInfo?.mobile ?? "" },
  ]
});

const displayFullAddress = (data: any) => {
  return `${data?.line1 ?? ""} ${data?.district ?? ""} ${data?.city ?? ""} ${data?.province ?? ""} ${data?.postalCode ?? ""}`
};

const displayBirthday = (data: any) => {
  return data ? manaLib.getDateText(data,'date') : "";
};
</script>