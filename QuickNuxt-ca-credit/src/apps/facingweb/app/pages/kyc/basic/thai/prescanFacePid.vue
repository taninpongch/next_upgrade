<template>
  <MuiPage>
    <MuiHeader title="การยืนยันตัวตน" />
    <MuiCard>
      <BizShareText text="ถ่ายรูปใบหน้าคู่บัตรประชาชน" alignment="center" :isBold="true" />
      <BizKYCPreScan color="green" />
    </MuiCard>
    <ActionButton text="ถ่ายรูปใบหน้าคู่บัตรประชาชน" @click="navigateToBrowsePhoto()" />
  </MuiPage>
</template>

<script lang="ts" setup>
import { getManaContext, ActionButton, setupEnvironment } from "@manaapp/ui";

const manaLib = await getManaContext();
const kyc = useKycStore();
const { postData } = kyc;
// const { goVisit } = useManaService();
const endpointId = useRoute().query["endpointId"] as any;
const initiBrowsePhoto = ref(false);

const navigateToBrowsePhoto = async () => {
  // HACK: Fix bug in case browsePhoto does not respond (Android)
  // Verifying if any photo has been selected on the device
  var interval = setInterval(() => {
    if (initiBrowsePhoto.value) {
      manaLib.getPhotoInfo(manaLib.pageId).then((it: any) => {
        if (it) {
          clearInterval(interval);
          // goVisit("kyc", "kyc-basic-th-create", endpointId)
          postData({}, "post-th-prescan-face-pid");
        }
      })
    }
  }, 1000);

  initiBrowsePhoto.value = true;
  await manaLib.browsePhoto().then((it: any) => {
    if (it?.selection?.isComplete) {
      clearInterval(interval);
      // goVisit("kyc", "kyc-basic-th-create", endpointId)
      postData({}, "post-th-prescan-face-pid");
    }
  })
}

import { useWindowFocus } from '@vueuse/core'
const focused = useWindowFocus()
watch(focused, (isFocused) => {
  if (isFocused) {
    setupEnvironment();
  }
})
</script>