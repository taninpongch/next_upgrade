<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
  <MuiPage>
    <MuiHeader title="Profile" />
    <MuiCard>
      <BizSharePartyHero :src="imgProfile" :title="data?.data?.datakyc?.profile?.displayName"
        :subtitle="`#${data?.data?.datakyc?.mrid}`" />
    </MuiCard>

    <MuiCard>
      <BizShareItemLink title="เบอร์โทรและอีเมล" description="ใช้บัญชีของ mana" :transparent="true"
        @click="underconstruction" />
      <UDivider />
      <BizShareItemLink title="ความปลอดภัย" description="PIN, รักษาความปลอดภัยของเครื่อง" :transparent="true"
        @click="underconstruction" />
    </MuiCard>
    <MuiCard>
      <BizShareItemLink title="การยืนยันตัวตน KYC" description="การระบุตัวตนที่ใช้ทำธุรกรรม" :transparent="true"
        :rightText="data?.data?.datakyc?.statusflowkyc.textRightKYC"
        :rightColor="data?.data?.datakyc?.statusflowkyc.colortextRightKYC" @on-tapped="goToKyc" />

      <!-- <BizShareItemLink title="ทดสอบ Verify ใบหน้า" :transparent="true" @on-tapped="goToVerifyFacial" /> -->

      <!-- <BizShareItemLink title="ข้อมูลส่วนตัว" description="การอนุญาตให้ใช้ข้อมูลของคุณ" :transparent="true"
        @click="underconstruction" /> -->
    </MuiCard>
    <MuiCard>
      <BizShareItemLink title="ที่อยู่ส่งของ" :transparent="true" @click="underconstruction" />
      <UDivider />

      <BizShareItemLink title="ที่อยู่ออกใบกำกับภาษี" :transparent="true" @click="underconstruction" />
    </MuiCard>

    <MuiCard>
      <BizShareItemLink title="แจ้งเตือน" :transparent="true" @click="underconstruction" />
    </MuiCard>

    <MuiCard>
      <BizShareItemLink title="อื่นๆ" :transparent="true" @click="underconstruction" />
    </MuiCard>
  </MuiPage>
  </div>

</template>

<script lang="ts" setup>
import { getManaContext } from "@manaapp/ui";
import { useWindowFocus } from "@vueuse/core";
import { watch } from 'vue'

const manaLib = await getManaContext();
const store = useProfileStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;
const { goVisit } = useManaService();
const endpointid = ref('')
const focused = useWindowFocus();

getData("get-profile-main").then(async () => {
  endpointid.value = data?.value.data.datakyc?.statusflowkyc?.endpointKYC
})

watch(focused, (isFocused) => {
  if (isFocused) {
    getData("get-profile-main").then(async () => {
      endpointid.value = data?.value.data.datakyc?.statusflowkyc?.endpointKYC
    })
  }
});

const imgProfile = computed(() => {
  if (data?.value?.data?.logo == null) {
    return "";
  }
  return manaLib.getUrl(data?.value?.data?.logo.host, data?.value?.data?.logo.path)
})

const goToKyc = async () => {
  await goVisit("kyc", data?.value.data.datakyc?.statusflowkyc?.endpointKYC, data?.value.data?.datakyc?.statusflowkyc.endpointIdKYC);
}

// const goToKycMainStatus = async () => {
//   await goVisit("kyc", "kyc-basic-th-main", "~newid");
// }

const goToVerifyFacial = async () => {
  await goVisit("sub-face", "n2p-verify-face", "~newid");
}

const underconstruction = async () => {
  await manaLib.visit("profile", 'default/underconstruction-dlg?endpointId=closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg');
}
</script>