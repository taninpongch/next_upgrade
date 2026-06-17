<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ตรวจสอบเบอร์โทรศัพท์" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizSharePartyHero src="i-ion-ios-phone-portrait" :title="phoneNumber" />
          <BizKYCInputVerifyPhone label="เบอร์โทรศัพท์ที่ผูกกับบัญชี mana" :hint="textVerify"
            placeholder="กรุณาใส่เบอร์โทรศัพท์ให้ถูกต้อง" inputMode="numeric" @keyup="checkVerifyPhone(dataForm.phone)"
            v-model="dataForm.phone" name="phone" />
        </MuiCard>
        <ActionButton text="ตกลง" />
      </BizShareManaForm>
    </MuiPage>
  </div>

</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { getManaContext, ActionButton } from "@manaapp/ui";
import { z } from "zod";

const manaLib = await getManaContext();
const kyc = useKycStore();
const { datakyc, pending, dataLocal, dataphone } = storeToRefs(kyc);
const { getData, getDataCheckVerifyPhone, postOptionSelect, getOptionDialogSelection } = kyc;
const phoneNumber = ref('')

getData('get-basic-th-verify-phone').then(async () => {
  phoneNumber.value = datakyc?.value.phonenumber;
});


getOptionDialogSelection().then(() => {
  dataForm.phone = dataLocal.value ? dataLocal.value : '';
});

const textVerify = ref('');
const checkphoneVerify = ref<boolean>(false);
const checkVerifyPhone = async (phone: string) => {
  if (phone.length == 10) {
    await getDataCheckVerifyPhone(`post-basic-th-verify-phone?endpointId=${phone}`).then(async () => {
      checkphoneVerify.value = dataphone.value.checkVerifyPhone;
    });
    if (checkphoneVerify.value) {
      textVerify.value = "ข้อมูลถูกต้อง"
    }
    else {
      textVerify.value = "ข้อมูลไม่ถูกต้อง"
    }
  }
  else {
    textVerify.value = ""
  }
}

// TODO: ใช้ ref แทน reactive อย่าลืม .value ใน dataForm ด้วย
const dataForm = reactive({
  phone: '',
});

const validationRules = z.object({
  phone: z.string().min(10, "Invalid request"),
});

type Schema = z.output<typeof validationRules>;


async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (checkphoneVerify.value) {
    await postOptionSelect(event.data);
  }
}

</script>