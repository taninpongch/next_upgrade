<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>

    <MuiPage>
      <MuiHeader title="การยืนยันตัวตน" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit" @input="handleInputChange">

        <BizShareSessionTitle label="ข้อมูลจากบัตร" />
        <MuiCard>
          <BizShareListInfoHorizontal heading="ข้อมูลบัญชี" :infos="infos" />
        </MuiCard>
        <BizShareSessionTitle label="ข้อมูลจากบัตร" />
        <MuiCard>
          <BizShareInputText v-if="maskbackidcard && maskbackidcard.length == 12 && checkTrue"
            label="เลขหลังบัตรประชาชน" v-model="maskbackidcard" @Change="delInputBackIDcard()"
            placeholder="เช่น AB1-2345678-90" inputMode="text" />
          <BizShareInputText v-else label="เลขหลังบัตรประชาชน" placeholder="เช่น AB1-2345678-90"
            v-model="dataForm.backidcard" name="backidcard" inputMode="text" @input="autoDashBackidcard" />

        </MuiCard>


        <!-- <BizShareSessionTitle label="ข้อมูลบุคคล" />
        <BizShareValidateItem @click="goToFaceDetechtion()" v-model="dataForm.photograph" name="photograph">
          <BizShareItemLink title="ถ่ายรูปหน้าตรง" src="i-ion-ios-person-outline"
            :description="dataForm.photograph ? 'ทำแล้ว' : 'คุณยังไม่ระบุ'" v-model="dataForm.photograph"
            name="photograph" />
        </BizShareValidateItem> -->

        <BizShareSessionTitle label="ข้อมูลอื่นๆ" />
        <MuiCard>
          <BizShareInputSelect label="อาชีพ" placeholder="ระบุอาชีพ" :options="occupationList"
            v-model="dataForm.occupationCode" name="occupationCode" />
          <BizShareInputText v-if="dataForm.occupationCode === 'Z999'" label="โปรดระบุอาชีพ"
            placeholder="เช่น ธุรกิจส่วนตัว" v-model="dataForm.occupationOrther" name="occupationOrther" />

          <BizShareInputSelect label="วัตถุประสงค์การใช้งาน" placeholder="ระบุวัตถุประสงค์การใช้งาน"
            :options="purposeList" v-model="dataForm.purposeCode" name="purposeCode" />
          <BizShareInputText v-if="dataForm.purposeCode === 'Z999'" label="โปรดระบุวัตถุประสงค์การใช้งาน"
            placeholder="เช่น ธุรกิจส่วนตัว" v-model="dataForm.purposeOther" name="purposeOther" />

          <BizShareValidateItem v-model="dataForm.currentaddress.line1" name="currentaddress.line1">
            <BizShareItemLink @click="goToCurrentAddress()" title="ที่อยู่ปัจจุบัน" :description="addCurrentAddress"
              :transparent="false" />
          </BizShareValidateItem>

          <BizShareValidateItem v-model="dataForm.phone" name="phone">
            <BizShareItemLink @click="goToCheckPhoneNumber()" title="ตรวจสอบเบอร์โทรศัพท์ของคุณ"
              :description="maskphone ? maskphone : 'คุณยังไม่ระบุ'" :transparent="false" />
          </BizShareValidateItem>
          <UDivider />
          <BizShareInputCheckbox disabled v-model="dataForm.remember" text-checkbox="อนุญาตให้ระบบจดจำข้อมูลของคุณ" />
        </MuiCard>

        <ActionButton text="ถัดไป" />
      </BizShareManaForm>

    </MuiPage>
  </div>

</template>

<script lang="ts" setup>
import { getManaContext, ActionButton, setupEnvironment, getMagicKey } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const { goVisit } = useManaService();
const kyc = useKycStore();
const { datakyc, pending } = storeToRefs(kyc);
const { getData, postData, getAddress } = kyc;
const infos = ref<any>([]);
const addCurrentAddress = ref("คุณยังไม่ระบุ");
const maskbackidcard = ref('');
const maskphone = ref('');
const checkTrue = ref(true);

const delInputBackIDcard = async () => {
  checkTrue.value = false;
  dataForm.value.backidcard = '';
  maskbackidcard.value = '';
  saveDataToMobile();
}

const normalizeBackIdCard = (value: string) => value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 12);

const inputBackIDcard = async (inputBackIDcard: string) => {
  dataForm.value.backidcard = inputBackIDcard
  saveDataToMobile();
}

getData('get-basic-th-create-info').then(async () => {
  infos.value = [
    { label: "ชื่อ", value: `${datakyc?.value.session.titlename} ${datakyc?.value.session.fristname}` },
    { label: "นามสกุล", value: datakyc?.value.session.lastname },
    { label: "วัน/เดือน/ปีเกิด", value: manaLib.getDateText(datakyc?.value.session.birthday, "date") },
    { label: "เลขบัตรประชาชน", value: datakyc?.value.session.hideidcard },
    { label: "ที่อยู่", value: getAddress(datakyc?.value.session.address) }
  ];

  maskphone.value = datakyc?.value.data.hidephone ? datakyc?.value.data.hidephone : ''
  maskbackidcard.value = datakyc?.value.data.hidebackidcard ? datakyc?.value.data.hidebackidcard : '';
  if (!datakyc?.value.data.hidebackidcard) {
    checkTrue.value = false;
  }
  else {
    dataForm.value.photograph = "OK"
  }
  addCurrentAddress.value = getAddress(datakyc?.value.data.currentaddress);
  dataForm.value.backidcard = datakyc?.value.data.backidcard ? datakyc?.value.data.backidcard : '';
  dataForm.value.currentaddress = datakyc?.value.data.currentaddress ? datakyc?.value.data.currentaddress : {};
  dataForm.value.occupationCode = datakyc?.value.data.occupationCode ? datakyc?.value.data.occupationCode : '';
  if (datakyc?.value.data.occupationCode == "Z999" || datakyc?.value.data.occupationCode == "z999") {
    dataForm.value.occupationOrther = datakyc?.value.data.occupationTitle
  }
  dataForm.value.purposeCode = datakyc?.value.data.purposeCode ? datakyc?.value.data.purposeCode : '';
  if (datakyc?.value.data.purposeCode == "Z999" || datakyc?.value.data.purposeCode == "z999") {
    dataForm.value.purposeOther = datakyc?.value.data.purposeTitle
  }

  dataForm.value.phone = datakyc?.value.data.phone ? datakyc?.value.data.phone : '';
  // dataForm.value.photograph = datakyc.value.data.photograph ? datakyc.value.data.photograph : '';
  dataForm.value.remember = datakyc?.value.session.remember;

  let userAgent = navigator.userAgent;
  let isiOS = /iPad|iPhone|iPod/.test(userAgent);

  if (isiOS) {
    await getMobileData();
    await checkFacial();
  }

});

// เพิ่มฟังก์ชัน autoDashBackidcard เพื่อเติม '-' หลังตัวที่ 3 และตัวที่ 10 (แก้ไขให้รองรับ v-model)
const autoDashBackidcard = (e: Event) => {
  let val = normalizeBackIdCard((e.target as HTMLInputElement).value);
  if (val.length > 3) {
    val = val.slice(0, 3) + '-' + val.slice(3);
  }
  if (val.length > 11) {
    val = val.slice(0, 11) + '-' + val.slice(11);
  }
  dataForm.value.backidcard = val;
};


const goToFaceDetechtion = async () => {
  let openPhoto = await manaLib.takeFacialMasterPhoto();
  if (openPhoto?.selection?.isComplete) {
    dataForm.value.photograph = "OK"
    saveDataToMobile();
  }
}

const goToCurrentAddress = async () => {
  let data = {
    currentaddress: dataForm.value.currentaddress,
    address: datakyc?.value.session.address
  }
  let optionDlgResult = await manaLib.showOptionDlg("kyc-basic-th-currentAddress", "1btn", JSON.stringify(data), "close", "", "f");
  if (optionDlgResult && !optionDlgResult.isCancel) {
    let rsp = optionDlgResult?.selection; //ข้อมูลที่ได้จาก dialog
    addCurrentAddress.value = await getAddress(rsp);
    dataForm.value.currentaddress = rsp;
    saveDataToMobile();
  }
}

const goToCheckPhoneNumber = async () => {
  let data = '';
  let optionDlgResult = await manaLib.showOptionDlg("kyc-basic-th-checkPhoneNumber", "1btn", JSON.stringify(data), "close", "", "f");
  if (optionDlgResult && !optionDlgResult.isCancel) {
    let rsp = optionDlgResult?.selection;
    dataForm.value.phone = rsp.phone;
    maskphone.value = dataForm.value.phone;
    saveDataToMobile();
  }
}

// TODO: ใช้ ref แทน reactive อย่าลืม .value ใน dataForm ด้วย
const initData = reactive({
  backidcard: '',

  hidebackidcard: '',
  currentaddress: {
    zipcode: '',
    line1: '',
    district: '',
    amphoe: '',
    province: '',
    remark: '',
  } as any,
  occupationCode: '',
  occupationOrther: '',
  purposeCode: '',
  purposeOther: '',
  phone: '',
  photograph: '',
  remember: false
});

const validationRules = z.object({
  backidcard: z.string().refine(val => /^[A-Z0-9]{12}$/.test(normalizeBackIdCard(val)), { message: "Invalid request" }),
  currentaddress: z.object({
    line1: z.string().min(1, "Invalid request"),
    district: z.string(),
    amphoe: z.string(),
    province: z.string(),
    zipcode: z.string(),
    remark: z.string(),
  }) as any,
  occupationCode: z.string().min(1, "Invalid request"),
  occupationOrther: z.string().refine((value) => {
    if (dataForm.value.occupationCode === 'Z999') {
      dataForm.value.occupationOrther = value;
      return value !== '';
    }
    return true;
  }, {
    message: "Invalid request",
  }),

  purposeCode: z.string().min(1, "Invalid request"),
  purposeOther: z.string().refine((value) => {
    if (dataForm.value.purposeCode === 'Z999') {
      dataForm.value.purposeOther = value;
      return value !== '';
    }
    return true;
  }, {
    message: "Invalid request",
  }),
  phone: z.string().min(1, "Invalid request"),
  // photograph: z.string().min(1, "Invalid request"),
  photograph: z.string(),
  remember: z.boolean()
});

const dataForm = ref(initData);
type Schema = z.output<typeof validationRules>;

const purposeList = ref([
  {
    name: 'บริการเดลิเวอรี่', value: 'B001', riskLevel: 'undefined'
  }, {
    name: 'รับเงินเดือน', value: 'B002', riskLevel: 'undefined'
  }, {
    name: 'เพื่อชำระค่าสินค้าและบริการทั่วไป', value: 'A001', riskLevel: 'undefined'
  }, {
    name: 'เพื่อชำระค่าสาธารณูปโภค / บิล', value: 'A002', riskLevel: 'undefined'
  }, {
    name: 'เพื่อโอนเงินให้สมาชิกในครอบครัว', value: 'A003', riskLevel: 'undefined'
  }, {
    name: 'เพื่อรับชำระเงินจากการค้าขาย', value: 'A004', riskLevel: 'undefined'
  }, {
    name: 'เพื่อการออมและบริหารเงินส่วนตัว', value: 'A005', riskLevel: 'undefined'
  }, {
    name: 'อื่นๆ (โปรดระบุ)', value: 'Z999', riskLevel: 'undefined'
  }
]);

const getpurposename = async (code: string) => {
  switch (code) {
    case "B001": return "บริการเดลิเวอรี่"
      break;
    case 'B002': return "รับเงินเดือน"
      break;
    case "A001": return "เพื่อชำระค่าสินค้าและบริการทั่วไป"
      break;
    case "A002": return "เพื่อชำระค่าสาธารณูปโภค / บิล"
      break;
    case "A003": return "เพื่อโอนเงินให้สมาชิกในครอบครัว"
      break;
    case "A004": return "เพื่อรับชำระเงินจากการค้าขาย"
      break;
    case "A005": return "เพื่อการออมและบริหารเงินส่วนตัว"
      break;
    case "Z999": return dataForm.value.purposeOther
      break;
    default: return "index"
      break;
  }
}

const getpurposeriskLevel = async (code: string) => {
  switch (code) {
    case "A001":
    case "A002":
    case "A003":
    case "A004":
    case "A005":
    case "B001":
    case "B002":
    case "Z999":
      return "undefined"
      break;
    default: return "index"
      break;
  }
}

const occupationList = ref([{
  name: 'รับจ้างทั่วไป/พนักงานเงินเดือน', value: 'A001', riskLevel: 'low'
}, {
  name: 'ค้าขาย/ธุรกิจส่วนตัว', value: 'A002', riskLevel: 'low'
}, {
  name: 'เกษตรกร', value: 'A003', riskLevel: 'low'
}, {
  name: 'ข้าราชการ/รัฐวิสาหกิจ', value: 'A004', riskLevel: 'low'
}, {
  name: 'นักการเมือง', value: 'B001', riskLevel: "high"
}, {
  name: 'ค้าอัญมณี/ทองคำ', value: 'B002', riskLevel: "high"
}, {
  name: 'ค้าของเก่า', value: 'B003', riskLevel: "high"
}, {
  name: 'รับแลกเปลี่ยนเงิน', value: 'B004', riskLevel: "high"
}, {
  name: 'โอนเงินออกนอกประเทศ', value: 'B005', riskLevel: "high"
}, {
  name: 'ธุรกิจกาสิโน/บ่อนการพนัน', value: 'B006', riskLevel: "high"
}, {
  name: 'ธุรกิจสถานบริการ', value: 'B007', riskLevel: "high"
}, {
  name: 'ค้าอาวุธ', value: 'B008', riskLevel: "high"
}, {
  name: 'ตัวแทนหรือนายหน้าจัดหางาน', value: 'B009', riskLevel: "high"
}, {
  name: 'ธุรกิจนำเที่ยว/ทัวร์', value: 'B010', riskLevel: "high"
}, {
  name: 'อื่นๆ (โปรดระบุ)', value: 'Z999', riskLevel: 'low'
}
]);


const getoccupationname = async (code: string) => {
  switch (code) {
    case "A001": return "รับจ้างทั่วไป/พนักงานเงินเดือน"
      break;
    case "A002": return "ค้าขาย/ธุรกิจส่วนตัว"
      break;
    case "A003": return "เกษตรกร"
      break;
    case 'A004': return "ข้าราชการ/รัฐวิสาหกิจ"
      break;
    case "B001": return "นักการเมือง"
      break;
    case "B002": return "ค้าอัญมณี/ทองคำ"
      break;
    case "B003": return "ค้าของเก่า"
      break;
    case "B004": return "รับแลกเปลี่ยนเงิน"
      break;
    case "B005": return "โอนเงินออกนอกประเทศ"
      break;
    case "B006": return "ธุรกิจกาสิโน/บ่อนการพนัน"
      break;
    case "B007": return "ธุรกิจสถานบริการ"
      break;
    case "B008": return "ค้าอาวุธ"
      break;
    case "B009": return "ตัวแทนหรือนายหน้าจัดหางาน"
      break;
    case "B010": return "ธุรกิจนำเที่ยว/ทัวร์"
      break;
    case "Z999": return dataForm.value.occupationOrther
      break;
    default: return "index"
      break;
  }
}

const getoccupationriskLevel = async (code: string) => {
  switch (code) {
    case "A001":
    case "A002":
    case "A003":
    case "A004":
    case "Z999":
      return "low"
      break;
    case "B001":
    case "B002":
    case "B003":
    case "B004":
    case "B005":
    case "B006":
    case "B007":
    case "B008":
    case "B009":
    case "B010":
      return "high"
      break;
    default: return "index"
      break;
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      backidcard: dataForm.value.backidcard.replace(/-/g, ''),
      occupationCode: event.data.occupationCode,
      occupationRiskLevel: await getoccupationriskLevel(event.data.occupationCode),
      occupationName: await getoccupationname(event.data.occupationCode),
      purposeCode: event.data.purposeCode,
      purposeRiskLevel: await getpurposeriskLevel(event.data.purposeCode),
      purposeName: await getpurposename(event.data.purposeCode),
      phone: event.data.phone,
      remember: event.data.remember,
      currentaddress: {
        line1: event.data.currentaddress.line1,
        district: event.data.currentaddress.district,
        amphoe: event.data.currentaddress.amphoe,
        province: event.data.currentaddress.province,
        zipcode: event.data.currentaddress.zipcode,
        remark: event.data.currentaddress.remark
      }
    };
    await postData(formdata, "post-basic-th-create-info");
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
    if (mData?.currentaddress?.line1) {
      addCurrentAddress.value = getAddress(mData?.currentaddress);
    }
    maskphone.value = maskphone.value ?? mData?.phone;
    dataForm.value = mData;
  }
}

// Hotfix for iOS saving data when navigate back to this page
const saveDataToMobile = async () => {
  let url = `http://localhost:9000/mapp/setState`
  await useMFetch<any>(url, { method: "POST", headers: { "Accept": "application/json", "pageId": manaLib.pageId }, body: JSON.stringify(dataForm.value) });
};

// Hotfix for iOS saving data when navigate back to this page
const checkFacial = async () => {
  let url = `http://localhost:9000/mapp/attachments?keys=FacialMaster`;
  const { data: mobileData } = await useMFetch<any>(url, { method: "GET", headers: { "Accept": "application/json", "pageId": manaLib.pageId } });
  let result = mobileData.value?.some((it: any) => it.toLocaleLowerCase().includes("facialmaster"));
  if (result) {
    dataForm.value.photograph = "OK";
    await saveDataToMobile();
  }
}

import { useWindowFocus } from '@vueuse/core'
const focused = useWindowFocus()
watch(focused, (isFocused) => {
  if (isFocused) {
    setupEnvironment();
  }
})
</script>
