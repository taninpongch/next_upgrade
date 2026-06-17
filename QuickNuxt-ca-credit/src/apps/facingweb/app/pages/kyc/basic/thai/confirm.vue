<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>

    <MuiPage>
      <MuiHeader title="ยืนยันข้อมูลของคุณ" />
      <BizShareManaForm @submit="onSubmit">

        <MuiCard>
          <BizShareListInfoHorizontal heading="ข้อมูลจากบัตร" :infos="infos" />
        </MuiCard>

        <MuiCard>
          <BizShareListInfoVertical heading="ข้อมูลหลังบัตรประชาชน" :infos="infoIdCard" />
        </MuiCard>

        <!-- <BizKYCItemDone /> -->

        <MuiCard>
          <BizShareListInfoVertical heading="ข้อมูลอื่นๆ" :infos="infosOther" />
        </MuiCard>
        <ActionButton text="ยืนยัน" />
      </BizShareManaForm>
    </MuiPage>
  </div>

</template>

<script setup lang="ts">
import { getManaContext, ActionButton } from "@manaapp/ui";

const manaLib = await getManaContext();
const kyc = useKycStore();
const { datakyc, pending } = storeToRefs(kyc);
const { getData, postData, getAddress } = kyc;
const infos = ref<any>([]);
const infoIdCard = ref<any>([]);
const infosOther = ref<any>([]);

getData('get-basic-th-confirm').then(async () => {
  infos.value = [
    { label: "ชื่อ", value: `${datakyc?.value.data.titlename} ${datakyc?.value.data.fristname}` },
    { label: "นามสกุล", value: datakyc?.value.data.lastname },
    { label: "วัน/เดือน/ปีเกิด", value: manaLib.getDateText(datakyc?.value.data.birthday, "date") },
    { label: "เลขบัตรประชาชน", value: datakyc?.value.data.hideidcard },
    { label: "ที่อยู่", value: getAddress(datakyc?.value.data.address) }
  ];

  infoIdCard.value = [
    { label: "เลขหลังบัตรประชาชน", value: datakyc?.value.data.hidebackinfoIdCard },
  ];

  infosOther.value = [
    { label: "อาชีพ", value: datakyc?.value.data.occupation },
    { label: "ที่อยู่ปัจจุบัน", value: getAddress(datakyc?.value.data.currentaddress) },
    { label: "ตรวจสอบเบอร์โทรศัพท์ของคุณ", value: datakyc?.value.data.hidephone }
  ];
});

async function onSubmit() {
  await postData({}, "post-basic-th-comfirm");
}
</script>