<template>
  <MuiPage>
    <BizShareResultDialog :data="data" />
    <BizShareInputText label="EndpointId" v-model="dataForm.endpointId" />
    <BizShareActionLink class="py-6" label="gotoreceivePA" @on-tapped="gotoreceivePA" />
    <BizShareLine />
    <BizShareActionLink class="py-6" label="gotoreceiveBA" @on-tapped="gotoreceiveBA" />
    <BizShareLine />
    <BizShareActionLink class="py-6" label="gotoPayScanQr" @on-tapped="gotoPayScanQr" />
    <BizShareLine />
    <BizShareActionLink class="py-6" label="gotoConsentBa" @on-tapped="gotoConsentBa" />
    <BizShareLine />
    <UButton @click="console.log('Go to Receive PA Create', dataForm.endpointId)">Check EndpointId</UButton>
  </MuiPage>

</template>

<script setup lang="ts">
const { goVisit } = useManaService();
import { z } from "zod";
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const dataForm = reactive({
  endpointId: "",
});

const data = ref<any>({
  Title: "ระบบสร้างเมนูทางลัด ",
  Logo: "i-heroicons-information-circle",
  Message: "เพื่อคความสะดวกในการใช้งานที่หน้าโฮม",
});

const gotoreceivePA = async () => {
  await goVisit("ims3rd", "ims-receive-pa-create", "endpointReceivePaCreate");

};
const gotoreceiveBA = async () => {
  await goVisit("ims3rd", "ims-receive-ba-create", "endpointReceiveBaCreate");

};
const gotoPayScanQr = async () => {
  console.log("dataForm.endpointId", dataForm.endpointId);

  await goVisit("ims", "ims-pay-create", dataForm.endpointId);

};

const gotoConsentBa = async () => {
  await goVisit("ims", "ims-consent-shop", "endpointConsentBa");

};

</script>