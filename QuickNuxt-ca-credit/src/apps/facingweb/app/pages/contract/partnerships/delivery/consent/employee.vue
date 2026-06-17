<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <!-- TODO add title -->
      <MuiHeader title="ขออนุญาตทำสัญญา" />
      <MuiCard>
        <BizSharePartyHero :src="displayBaLogo" :title="data?.baName" :subtitle="displayCreateDate" />
      </MuiCard>
      <MuiCard>
        <BizShareItemInfo heading="รายละเอียดสัญญา" :title="data?.contract?.info" />
        <BizShareItemInfo heading="ตำแหน่ง" :title="data?.employee?.role" />
      </MuiCard>
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizShareSessionTitle label="สถานะการยืนยันตัวตน" />
          <BizShareValidateItem v-model="dataForm.isKyc" name="isKyc">
            <BizShareItemStatus title="การยืนยันข้อมูล" :rightText="kycStatus.status" :transparent="true" @on-tapped=""
              :right-color="kycStatus.color" />
          </BizShareValidateItem>
          <BizShareValidateItem v-model="dataForm.displayName" name="displayName">
            <BizShareSessionTitle label="ตั้งชื่อ Displayname" />
            <BizShareItemLink :title="displayname.name" :description="displayname.status"
              @on-tapped="onSelectDisplayName" />
          </BizShareValidateItem>
        </MuiCard>
        <ConsentButtonsBand accept-app-text="Accept" reject-app-text="Reject" accept-text="Accept" reject-text="Reject"
          :v-model="dataForm.acceptances"></ConsentButtonsBand>
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ConsentButtonsBand, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
const lib = await getManaContext();

const store = useDeliveryStore();
const { data, pending } = storeToRefs(store);
const { getData, postSubmitConsentData } = store;
const displayCreateDate = ref('')

getData('get-partnerships-delivery-consent-employee').then(async () => {
  if (data.value?.isKyc) {
    dataForm.value.isKyc = data.value?.isKyc;
  }
  displayCreateDate.value = lib.getDateText(data?.value.createdDate);

});

// data.value = {
//   _id: "123",
//   baName: "DemoDelivery",
//   baPicUrl: {
//     host: "failfast.blob.core.windows.net/mcontent-imgs/temps/delivery",
//     path: "dfdelivery.png"
//   },
//   createdDate: "12/03/2024 17.00 น.",
//   isKyc: false,
//   session: {
//     createdDate: "2025-03-12T08:46:12.352Z",
//   },
//   contract: {
//     info: "ขออนุญาตเชื่อมระบบกับบัญชี mana ของคุณ",
//     moreInfo: "",
//   },
//   employee:
//   {
//     _id: "123",
//     role: "Rider",
//     logoUrl: "https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/dfdelivery.png"
//   }
// };

const _kycStatus = ref({
  status: "ยังไม่ทำ",
  color: "red",
});
const kycStatus = computed(() => {
  if (lib && data.value && data.value.isKyc) {
    _kycStatus.value = {
      status: "ทำแล้ว",
      color: "blue",
    }
  }
  return _kycStatus.value;
});

const _displayBaLogo = ref("https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/dfdelivery.png");
const displayBaLogo = computed(() => {
  if (lib && data.value && data.value?.baPicUrl && data.value?.baPicUrl?.host && data.value?.baPicUrl?.path) {
    _displayBaLogo.value = data.value?.baPicUrl?.host == 'icon' ? data.value?.baPicUrl?.path : lib.getUrl(data.value?.baPicUrl?.host, data.value?.baPicUrl?.path);
  }
  return _displayBaLogo.value;
})


const _displayname = ref(
  {
    name: "",
    status: "ยังไม่ระบุ"
  });
const displayname = computed(() => {
  return _displayname.value;
})

const validationRules = z.object({
  acceptances: z.string(),
  isKyc: z.string().min(1, "Invalid request"),
  displayName: z.string().min(1, "Invalid request"),
});

type Schema = z.output<typeof validationRules>;

const dataForm = ref({
  acceptances: "",
  isKyc: "",
  displayName: ""
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    dataForm.value.acceptances = data.value?._id;
    var formdata = {
      Acceptances: [dataForm.value.acceptances],
      DisplayName: dataForm.value.displayName
    };
    await postSubmitConsentData(formdata, "post-partnerships-delivery-consent-employee", data?.value?.subscriptionId);
  }
}

const onSelectDisplayName = async () => {
  let optionDlgResult = await lib.showOptionDlg(
    "partnerships-delivery-consent-employeeInfo",
    "1btn",
    JSON.stringify({ displayName: dataForm.value?.displayName }),
    "close",
    "",
    "f"
  );
  if (optionDlgResult && !optionDlgResult.isCancel) {
    _displayname.value.name = optionDlgResult?.selection?.displayName;
    _displayname.value.status = "";
    dataForm.value.displayName = _displayname.value.name;
  }
}
</script>
