<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>

    <MuiPage>
      <MuiHeader title="การยืนยันตัวตน" />
      <MuiCard>
        <p v-if="checkStatus == 'pending'" @click="gotoDialogWaitingKycVerify()" class="text-right">แก้ไขข้อมูล</p>
        <p v-else @click="gotoEditCreate()" class="text-right">แก้ไขข้อมูล</p>
        <BizSharePartyHero :src="logoProfile" :title='`${datakyc?.data?.firstName} ${datakyc?.data?.lastName}`' />
      </MuiCard>
      <BizShareItemStatus v-if="checkStatus == 'pending'" title="ยืนยันตัวตน" rightText="รออนุมัติ" />
      <BizShareItemStatus v-if="checkStatus == 'approve'" title="ยืนยันตัวตน" rightText="ทำแล้ว" rightColor="blue" />
      <BizShareItemStatus v-if="checkStatus == 'reject'" title="ยืนยันตัวตน" rightText="ไม่ผ่าน" rightColor="red" />

      <!-- <BizShareItemStatus title="ยืนยันตัวตนแบบขั้นสูง" src="i-ion-checkmark-circle-outline" rightText="ยังไม่ทำ" /> -->
      <BizShareActionNormal @click="gotoEditCreate()" v-if="checkStatus == 'reject'" icon="i-ph-camera-fill"
        :rounded="true" label="ทำใหม่อีกครั้ง" />
      <MuiCard v-if="datakyc?.data?.recommen && checkStatus == 'reject'" class="bg-gray-500  text-white">
        <div class="flex items-center">
          <UIcon name="i-ion-ios-person-outline" class="w-5 h-5" />
          <p class="text-white">ข้อแนะนำ</p>
        </div>
        <p>{{ datakyc?.data?.recommen }}</p>
      </MuiCard>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const kyc = useKycStore();
const { datakyc, pending } = storeToRefs(kyc);
const { getData, postData } = kyc;
const { goVisit } = useManaService();
const checkStatus = ref('');

const gotoEditCreate = () => {
  goVisit("kyc", "kyc-basic-agreement", "~newid")
}

const gotoDialogWaitingKycVerify = async () => {
  await manaLib.visit("kyc", 'default/waiting-verify-kyc-dlg?endpointId=closedlgkyc&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlgkyc');
}

const logoProfile = computed(() => {
  if (datakyc?.value == null) {
    return "";
  }
  return manaLib.getUrl(datakyc?.value.data?.logo?.host, datakyc?.value.data?.logo?.path)
})

getData('get-basic-th-main-status').then(async () => {
  // TODO: check เงื่อนไขใน file .lua
  if (datakyc?.value.data?.requestedDate && datakyc?.value.data?.rejectedDate && datakyc?.value.data?.approvedDate) {
    if (new Date(datakyc?.value.data?.requestedDate) > new Date(datakyc?.value.data?.rejectedDate) && new Date(datakyc?.value.data?.requestedDate) > new Date(datakyc?.value.data?.approvedDate)) {
      checkStatus.value = 'pending'
    }
    else if (new Date(datakyc?.value.data?.rejectedDate) > new Date(datakyc?.value.data?.requestedDate) && new Date(datakyc?.value.data?.rejectedDate) > new Date(datakyc?.value.data?.approvedDate)) {
      checkStatus.value = 'approve'
    }
    else {
      checkStatus.value = 'approve'
    }
  }
  else if (datakyc?.value.data?.requestedDate && datakyc?.value.data?.approvedDate) {
    if (new Date(datakyc?.value.data?.requestedDate) > new Date(datakyc?.value.data?.approvedDate)) {
      checkStatus.value = 'pending'
    }
    else {
      checkStatus.value = 'approve'
    }
  }

  else if (datakyc?.value.data?.requestedDate && datakyc?.value.data?.rejectedDate) {
    if (new Date(datakyc?.value.data?.requestedDate) > new Date(datakyc?.value.data?.rejectedDate)) {
      checkStatus.value = 'pending'
    }
    else {
      checkStatus.value = 'reject'
    }
  }
  else if (datakyc?.value.data?.requestedDate) {
    checkStatus.value = 'pending'
  }
});

</script>