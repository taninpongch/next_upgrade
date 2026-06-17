<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <MuiPage>
        <MuiHeader title="การยืนยันตัวตนธุรกิจ" />
        <BizShareSessionTitle label="ข้อมูลขั้นพื้นฐานของคุณ" />
        <MuiCard>
          <BizShareListInfoHorizontal heading="ข้อมูลบุคคล" :infos="kycinfo" />
          <BizShareSessionTitle label=" " :button="{ icon: '', label: 'ดูข้อมูล' }" @on-tapped="onSelectKYCData" />
        </MuiCard>

        <BizShareSessionTitle label="ข้อมูลของธุรกิจ" />
        <MuiCard>
          <BizShareValidateItem v-model="dataForm.logoResourceName" name="logoResourceName">
            <BizShareInputUploadFile :src="displayLogo" label="โลโก้ธุรกิจของคุณ" v-model="dataForm.logoResourceName"
              @on-tapped="uploadLogo" />
          </BizShareValidateItem>
          <BizShareValidateItem v-model="dataForm.shopThumbnailResourceName" name="shopThumbnailResource">
            <BizShareInputUploadFile :src="displayShopImg" label="รูปถ่ายร้าน" size="custom" :rounded="false"
              v-model="dataForm.shopThumbnailResourceName" @on-tapped="uploadShopImg" />
          </BizShareValidateItem>
          <BizShareInputText label="ชื่อธุรกิจ" v-model="dataForm.name" name="name" />
          <BizShareInputText label="ชื่อบริษัทที่จดทะเบียน" v-model="dataForm.registeredName"
            placeholder="เช่น บริษัท จดทะเบียน จำกัด" name="registeredName" />
          <BizShareInputText label="เลขทะเบียนพาณิชย์/เลขประจำตัวผู้เสียภาษีอากร" inputMode="numeric"
            v-model="dataForm.registeredId" placeholder="เช่น 0121550020013" name="registeredId" />
          <BizShareInputText label="เบอร์โทรร้าน" placeholder="เช่น 0850123456" v-model="dataForm.telephone"
            inputMode="numeric" name="telephone" />
          <BizShareValidateItem v-model="dataForm.bankAccountNo" name="bankAccountNo">
            <BizShareSessionTitle label="เลขบัญชีสำหรับรับเงินตอนถอนออกจากร้าน" />
            <BizShareItemLink title="" :description="displayWithdrawInfo" @on-tapped="onSelectTiedAccount" />
          </BizShareValidateItem>
          <BizShareValidateItem v-model="dataForm.address.line1" name="address.line1">
            <BizShareItemLink title="สถานที่ตั้ง" src="" :description="descriptionAddress" v-model="dataForm.address"
              name="address" @on-tapped="onSelectAddress" />
          </BizShareValidateItem>
        </MuiCard>
      </MuiPage>
      <ActionButton text="ถัดไป" />
    </BizShareManaForm>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ActionButton, getManaContext, setupEnvironment } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import { useWindowFocus } from '@vueuse/core'

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData, postData, getAddress } = store;
const { goVisit } = useManaService();
const logores = ref();
const pictureres = ref();
const focused = useWindowFocus()
const descriptionAddress = ref("ระบุสถานที่ตั้ง");

watch(focused, (isFocused) => {
  if (isFocused) {
    setupEnvironment();
  }
})

getData('get-ba-kym-advance-create').then(async () => {
  // TODO: ทำให้ ba อัพโหลดรูปได้ แล้วดึงแสดงตอนทำ CA
  // dataForm.value.logoResource = manaLib.getUrl(data.value?.logoHost, data.value?.logoPath)
  // dataForm.value.shopThumbnailResource = manaLib.getUrl(data.value?.ShopThumbnailHost, data.value?.ShopThumbnailPath)
  dataForm.value.name = data.value.name;
  dataForm.value.registeredName = data.value.registeredName;
  dataForm.value.registeredId = data.value.registeredId;
  dataForm.value.telephone = data.value.telephone;
  dataForm.value.bankAccountNo = data.value.bankAccountNo;
  dataForm.value.bankName = data.value.bankName;
  dataForm.value.bankId = data.value.bankId;
  dataForm.value.address.line1 = data?.value.address.line1 ? data?.value.address.line1 : '';
  dataForm.value.address.zipcode = data?.value.address.zipcode ? data?.value.address.zipcode : '';
  dataForm.value.address.district = data?.value.address.district ? data?.value.address.district : '';
  dataForm.value.address.amphoe = data?.value.address.amphoe ? data?.value.address.amphoe : '';
  dataForm.value.address.province = data?.value.address.province ? data?.value.address.province : '';
  dataForm.value.address.remark = data?.value.address.remark ? data?.value.address.remark : '';
  descriptionAddress.value = await getAddress(data.value.address);
  dataForm.value.logoResourceId = "";
  dataForm.value.shopThumbnailResourceId = "";
});

const validationRules = z.object({
  logoResourceId: z.string(),
  logoResourceName: z.string(),
  shopThumbnailResourceId: z.string(),
  shopThumbnailResourceName: z.string(),
  name: z.string().min(1, "Invalid request"),
  registeredName: z.string().min(1, "Invalid request"),
  registeredId: z.string().min(1, "Invalid request"),
  telephone: z.string().min(1, "Invalid request"),
  bankId: z.string().min(1, "Invalid request"),
  bankName: z.string().min(1, "Invalid request"),
  bankAccountNo: z.string().min(1, "Invalid request"),
  address: z.object({
    line1: z.string().min(1, "Invalid request"),
    district: z.string(),
    amphoe: z.string(),
    province: z.string(),
    zipcode: z.string(),
    remark: z.string(),
  }) as any
});

type Schema = z.output<typeof validationRules>;

const dataForm = ref({
  logoResourceId: "",
  logoResourceName: "",
  shopThumbnailResourceId: "",
  shopThumbnailResourceName: "",
  name: "",
  registeredName: "",
  registeredId: "",
  telephone: "",
  bankId: "",
  bankName: "",
  bankAccountNo: "",
  address: {
    line1: '',
    district: '',
    amphoe: '',
    province: '',
    zipcode: '',
    remark: '',
  } as any
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      DisplayName: event.data.name,
      RegisteredName: event.data.registeredName,
      BusinessRegistrationNumber: event.data.registeredId,
      PhoneNumber: event.data.telephone,
      BankCode: event.data.bankId,
      BankAccountNumber: event.data.bankAccountNo,
      LogoAccessResourceId: event.data.logoResourceId,
      // LogoAccessResourceName: event.data.logoResourceName,
      LocationImageAccessResourceId: event.data.shopThumbnailResourceId,
      // LocationImageAccessResourceName: event.data.shopThumbnailResourceName,
      Address: {
        Line1: event.data.address.line1,
        District: event.data.address.district,
        City: event.data.address.amphoe,
        Province: event.data.address.province,
        PostalCode: event.data.address.zipcode,
        Remark: event.data.address.remark,
      },
    };
    await postData(formdata, "post-ba-kym-advance-create");
  }
}

const kycinfo = computed(() => {
  if (data.value && data.value?.kycInfo.firstName && data.value?.kycInfo?.lastName) {
    return [
      { label: "ชื่อ", value: `${data.value.kycInfo?.firstName} ${data.value.kycInfo?.lastName}` },
      { label: "สถานะ", value: displayVerification(data.value.kycInfo.status) },
    ]
  }
  return [
    { label: "ชื่อ", value: "-" },
    { label: "สถานะ", value: "-" },
  ]
});

const displayVerification = (data: any) => {
  switch (data.toLowerCase()) {
    case "no": return "ยังไม่ได้ยืนยันตัวตน";
    case "pending": return "กำลังตรวจสอบ";
    case "rejected": return "ยืนยันตัวตนไม่สำเร็จ";
    case "approved": return "ยืนยันตัวตนผ่านแล้ว";
    default: return "";
  }
};

const displayWithdrawInfo = computed(() => {
  return dataForm.value?.bankId && dataForm.value?.bankAccountNo ? `${dataForm.value?.bankName} ${dataForm.value?.bankAccountNo}` : 'คุณยังไม่ระบุ'
})

const onSelectTiedAccount = async () => {
  let optionDlgResult = await manaLib.showOptionDlg("ba-kym-advance-tiedaccount-create", "1btn", JSON.stringify({}), "close", "", "f");
  if (optionDlgResult && !optionDlgResult.isCancel) {
    dataForm.value.bankAccountNo = optionDlgResult?.selection.bankAccountNo;
    dataForm.value.bankId = optionDlgResult?.selection.bankId;
    dataForm.value.bankName = optionDlgResult?.selection.bankName;
  }
}

const logoBase64String = ref("");
const logoBase64ImgType = ref("");
const displayLogo = computed(() => {
  if (logoBase64String.value) {
    return `data:${logoBase64ImgType.value};base64,${logoBase64String.value}`
  } else if (manaLib && data.value.logoHost && data.value.logoPath) {

    // dataForm.value.logoResourceName = data.value.logoPath.split('/').pop();
    return manaLib.getUrl(data?.value?.logoHost, data?.value?.logoPath);
  } else {
    return 'https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png'
  }
})

const uploadLogo = async () => {
  let uploadRes = await manaLib.browsePhoto("attachIdCaLogo");
  if (uploadRes?.selection?.isComplete) {
    let getFileInfo = await manaLib.getPhotoInfo("attachIdCaLogo")
    if (getFileInfo) {
      dataForm.value.logoResourceId = "attachIdCaLogo";
      dataForm.value.logoResourceName = getFileInfo.FileName
      logoBase64String.value = getFileInfo.Content
      logoBase64ImgType.value = `image/${uploadRes.selection?.extension}`
      setupEnvironment();
    }
  }
}

const shopImgBase64String = ref("");
const shopImgBase64ImgType = ref("");
const displayShopImg = computed(() => {
  if (shopImgBase64String.value) {
    return `data:${shopImgBase64ImgType.value};base64,${shopImgBase64String.value}`
  } else if (manaLib && data.value.shopThumbnailHost && data.value.shopThumbnailPath) {
    // dataForm.value.shopThumbnailResourceName = data.value.shopThumbnailPath.split('/').pop();
    return manaLib.getUrl(data.value?.shopThumbnailHost, data.value?.shopThumbnailPath);
  } else {
    return 'https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png'
  }
})

const uploadShopImg = async () => {
  let uploadRes = await manaLib.browsePhoto("attachIdCaImg");
  if (uploadRes?.selection?.isComplete) {
    let getFileInfo = await manaLib.getPhotoInfo("attachIdCaImg")
    if (getFileInfo) {
      dataForm.value.shopThumbnailResourceId = "attachIdCaImg";
      dataForm.value.shopThumbnailResourceName = getFileInfo.FileName
      shopImgBase64String.value = getFileInfo.Content
      shopImgBase64ImgType.value = `image/${uploadRes.selection?.extension}`
      setupEnvironment();
    }
  }
}

const onSelectKYCData = async () => {
  manaLib.showOptionDlg("ba-kym-advance-kycInfo", "1btn",
    JSON.stringify({ kycInfo: data.value?.kycInfo }), "close", "", "f");
}

const onSelectAddress = async () => {
  let optionDlgResult = await manaLib.showOptionDlg("ba-kym-fill-address", "1btn", JSON.stringify(dataForm.value.address), "close", "", "f");
  if (optionDlgResult && !optionDlgResult.isCancel) {
    let rsp = optionDlgResult?.selection; //ข้อมูลที่ได้จาก dialog
    descriptionAddress.value = await getAddress(rsp)
    dataForm.value.address = rsp;
  }
};
</script>
