<template>
  <MuiPage>
    <MuiHeader title="การยืนยันตัวตน" />
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit" @input="handleInputChange">
      <BizShareSessionTitle label="ข้อมูลจากบัตร" />
      <MuiCard>
        <BizShareInputSelect label="คำนำหน้าชื่อ" placeholder="ระบุคำนำหน้าชื่อ" :options="titleList"
          v-model="dataForm.nametitleCode" name="nametitleCode" />
        <!-- <BizShareInputText v-if="dataForm.nametitle === 'other'" label="คำนำหน้าชื่อ" placeholder="เช่น นาย"
          v-model="dataForm.othernametitle" name="othernametitle" /> -->
        <BizShareInputText label="ชื่อ" placeholder="เช่น อานน" v-model="dataForm.firstname" name="firstname" />
        <BizShareInputText label="นามสกุล" placeholder="เช่น บางสาน" v-model="dataForm.lastname" name="lastname" />
        <BizShareInputDate label="วัน/เดือน/ปีเกิด" placeholder="วันเดือนปีเกิดตามบัตร ปชช." v-model="dataForm.birthday"
          name="birthday" />

        <BizShareInputText v-if="maskidcard && maskidcard.length == 13 && checkTrue" @Change="delInputIDcard()"
          label="เลขบัตรประชาชน" type="text" placeholder="เช่น 1234567890123" v-model="maskidcard" />
        <BizShareInputText v-else label="เลขบัตรประชาชน" type="number" placeholder="เช่น 1234567890123"
          v-model="dataForm.idcard" name="idcard" />

        <BizShareValidateItem v-model="dataForm.address.line1" name="address.line1">
          <!-- <BizShareItemLink @click="goVisit('kyc', 'kyc-basic-th-address', 'endp-address')" -->
          <BizShareItemLink @click="goToAddress()" title="ที่อยู่ตามบัตรประชาชน" :description="addAddress"
            :transparent="false" />
        </BizShareValidateItem>
        <UDivider />
        <BizShareInputCheckbox v-model="dataForm.remember" text-checkbox="อนุญาตให้ระบบจดจำข้อมูลของคุณ" />
      </MuiCard>
      <ActionButton text="ถัดไป" />
    </BizShareManaForm>
  </MuiPage>
</template>

<script lang="ts" setup>
import { getManaContext, ActionButton, setupEnvironment, getMagicKey } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { number, z } from "zod";
import { storeToRefs } from "pinia";

const manaLib = await getManaContext();
const addAddress = ref("คุณยังไม่ระบุ");
const maskidcard = ref('');
const checkTrue = ref(true);

const delInputIDcard = async () => {
  checkTrue.value = false;
  dataForm.value.idcard = '';
  maskidcard.value = '';
  saveDataToMobile();
}

const kyc = useKycStore();
const { datakyc } = storeToRefs(kyc);
const { getData, postData, getAddress } = kyc;

getData('get-basic-th-create').then(async () => {
  maskidcard.value = datakyc?.value.data.hideidcard ? datakyc?.value.data.hideidcard : '';
  if (!datakyc.value.data.hideidcard) {
    checkTrue.value = false;
  }

  addAddress.value = getAddress(datakyc.value.data.address);
  dataForm.value.hideidcard = datakyc?.value.data.hideidcard ? datakyc?.value.data.hideidcard : '';
  dataForm.value.nametitleCode = datakyc?.value.data.nametitleCode ? datakyc?.value.data.nametitleCode.toString() : '';
  dataForm.value.firstname = datakyc?.value.data.firstname ? datakyc?.value.data.firstname : '';
  dataForm.value.lastname = datakyc?.value.data.lastname ? datakyc?.value.data.lastname : '';
  dataForm.value.birthday = datakyc?.value.data.birthday ? datakyc?.value.data.birthday : '';
  dataForm.value.address = datakyc?.value.data.address ? datakyc?.value.data.address : {};
  dataForm.value.remember = datakyc?.value.data.remember ? datakyc?.value.data.remember : false;
  dataForm.value.idcard = datakyc?.value.data.idcard ? datakyc?.value.data.idcard : '';

  let userAgent = navigator.userAgent;
  let isiOS = /iPad|iPhone|iPod/.test(userAgent);

  if (isiOS) {
    await getMobileData();
  }

});

const goToAddress = async () => {
  let data = dataForm.value.address;
  let optionDlgResult = await manaLib.showOptionDlg("kyc-basic-th-address", "1btn", JSON.stringify(data), "close", "", "f");
  if (optionDlgResult && !optionDlgResult.isCancel) {
    let rsp = optionDlgResult?.selection; //ข้อมูลที่ได้จาก dialog
    addAddress.value = await getAddress(rsp)
    dataForm.value.address = rsp;
    saveDataToMobile();
  }
}

// TODO: ใช้ ref แทน reactive อย่าลืม .value ใน dataForm ด้วย
const initData = reactive({
  nametitleCode: '',
  // othernametitle: '',
  firstname: '',
  lastname: '',
  birthday: '',
  idcard: '',
  hideidcard: '',
  address: {
    line1: '',
    district: '',
    amphoe: '',
    province: '',
    zipcode: '',
    remark: '',
  } as any,
  remember: false
});

const titleList = ref([
  {
    name: 'นาย', value: '3000'
  }, {
    name: 'นาง', value: '8000'
  }, {
    name: 'นางสาว', value: '7000'
  }, {
    name: 'เด็กชาย', value: '1000'
  }, {
    name: 'เด็กหญิง', value: '6000'
  }
  // , {
  //   name: 'อื่นๆ', value: 'other'
  // }
]);

const getnametitle = async (code: string) => {
  switch (code) {
    case "3000": return "นาย"
      break;
    case "8000": return "นาง"
      break;
    case "7000": return "นางสาว"
      break;
    case '1000': return "เด็กชาย"
      break;
    case "6000": return "เด็กหญิง"
      break;
    default: return "index"
      break;
  }
}

const validationRules = z.object({
  nametitleCode: z.string().min(1, "Invalid request"),
  // othernametitle: z.string().min(1, "Invalid request"),
  firstname: z.string().min(1, "Invalid request"),
  lastname: z.string().min(1, "Invalid request"),
  birthday: z.string().min(1, "Invalid request"),
  address: z.object({
    line1: z.string().min(1, "Invalid request"),
    district: z.string(),
    amphoe: z.string(),
    province: z.string(),
    zipcode: z.string(),
    remark: z.string(),
  }) as any,

  // address: z.string().min(1, "Invalid request"),
  idcard: z.string().min(13, "Invalid request"),
  remember: z.boolean()
});

const dataForm = ref(initData);
type Schema = z.output<typeof validationRules>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      nametitle: await getnametitle(event.data.nametitleCode),
      nametitleCode: parseInt(event.data.nametitleCode),
      firstname: event.data.firstname,
      lastname: event.data.lastname,
      birthday: event.data.birthday,
      idcard: event.data.idcard,
      remember: event.data.remember,
      address: {
        line1: event.data.address.line1,
        district: event.data.address.district,
        amphoe: event.data.address.amphoe,
        province: event.data.address.province,
        zipcode: event.data.address.zipcode,
        remark: event.data.address.remark
      }
    };
    await postData(formdata, "post-basic-th-create");
  }
}

// Hotfix for iOS saving data when navigate back to this page
const handleInputChange = async () => await saveDataToMobile();

// Hotfix for iOS saving data when navigate back to this page
const getMobileData = async () => {
  let url = `http://localhost:9000/mapp/getState`;
  const { data: mobileData, error } = await useMFetch<any>(url, { method: "GET", headers: { "Accept": "application/json", "pageId": manaLib.pageId } });
  if (mobileData.value) {
    let mData = JSON.parse(mobileData.value);
    addAddress.value = getAddress(mData?.address ?? datakyc.value.data?.address);
    dataForm.value = mData;
  }
}

// Hotfix for iOS saving data when navigate back to this page
const saveDataToMobile = async () => {
  let url = `http://localhost:9000/mapp/setState`
  await useMFetch<any>(url, { method: "POST", headers: { "Accept": "application/json", "pageId": manaLib.pageId }, body: JSON.stringify(dataForm.value) });
};

import { useWindowFocus } from '@vueuse/core'
const focused = useWindowFocus()
watch(focused, (isFocused) => {
  if (isFocused) {
    setupEnvironment();
  }
})
</script>