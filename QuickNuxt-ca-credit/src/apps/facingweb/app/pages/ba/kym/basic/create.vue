<template>
  <MuiPage>
    <MuiHeader title="สร้างธุรกิจใหม่" />
    <BizShareSessionTitle label="ข้อมูลที่จำเป็น" />
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <MuiCard>
        <BizShareInputText label="ตั้งชื่อธุรกิจของคุณ" placeholder="เช่น ร่ำรวย" v-model="dataForm.name" name="name" />
        <BizShareValidateItem v-model="dataForm.bizType[0]" name="bizType">
          <BizShareItemLink title="ประเภทสินค้าและบริการ" src="" :description="displayType" @on-tapped="onSelectType" />
        </BizShareValidateItem>
        <BizShareValidateItem v-model="dataForm.shopPicResourceKey" name="shopPicResourceKey">
          <BizShareInputUploadFile :src="displayShopPic" label="รูปถ่ายร้าน" size="custom" :rounded="false"
            v-model="dataForm.shopPicResourceName" @on-tapped="uploadShopImg" />
        </BizShareValidateItem>
      </MuiCard>

      <BizShareSessionTitle label="ข้อมูลอื่นๆสามารถกรอกภายหลังได้" />
      <MuiCard>

        <BizShareInputUploadFile :src="displayLogo" label="โลโก้ธุรกิจของคุณ" v-model="dataForm.logoResourceName"
          @on-tapped="uploadLogo" />
        <BizShareInputText label="เลขทะเบียนพาณิชย์" placeholder="เช่น 1234567890" v-model="dataForm.licenseNo"
          name="licenseNo" />
        <BizShareInputText label="เบอร์โทรร้าน" placeholder="เช่น 0911234567" v-model="dataForm.contactNo"
          name="contactNo" />

        <!-- TODO: Implement later -->
        <BizShareItemLink title="สถานที่ตั้ง" src="" :description="descriptionAddress" v-model="dataForm.address"
          name="address" @on-tapped="onSelectAddress" />
        <!--     <BizShareItemLink title="เวลาทำการ" src="" description="ระบุเวลาทำการ" v-model="dataForm.schedule"
          name="schedule" @on-tapped="onSelectSchedule" /> -->
      </MuiCard>
      <ActionButton text="ตกลง" />
    </BizShareManaForm>
  </MuiPage>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import { ActionButton, getManaContext, setupEnvironment } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useBAStore();
const { postData, getAddress } = store;
const { goVisit } = useManaService();
const validationRules = z.object({
  name: z.string().min(1, "Invalid request"),
  bizType: z.array(z.string()).min(1, "Invalid request"),
  shopPicResourceKey: z.string().min(1, "Invalid request"),
  // shopPicResourceKey: z.string(),
  // logoHost: z.string(),
  // logoPath: z.string(),
  // licenseNo: z.string(),
  // contactNo: z.string(),
  // address: z.object({}),
  // schedule: z.object({})
  address: z.object({
    line1: z.string(),
    district: z.string(),
    amphoe: z.string(),
    province: z.string(),
    zipcode: z.string(),
    remark: z.string(),
  }) as any,
});
const descriptionAddress = ref("ระบุสถานที่ตั้ง");
const logoBase64String = ref("");
const logoBase64ImgType = ref("");
const displayLogo = computed(() => {
  if (logoBase64String.value) {
    return `data:${logoBase64ImgType.value};base64,${logoBase64String.value}`
  }
  return 'https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png'
})

const shopPicBase64String = ref("");
const shopPicBase64ImgType = ref("");
const displayShopPic = computed(() => {
  if (shopPicBase64String.value) {
    return `data:${shopPicBase64ImgType.value};base64,${shopPicBase64String.value}`
  }
  return 'https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png'
})
const initiBrowseLogo = ref(false);

const uploadLogo = async () => {
  // HACK: Fix bug in case browsePhoto does not respond (Android)
  // Verifying if any photo has been selected on the device
  var interval = setInterval(async () => {
    if (initiBrowseLogo.value) {
      let getFileInfo = await manaLib.getPhotoInfo("logoResourceKey")
      if (getFileInfo) {
        clearInterval(interval);

        dataForm.value.logoResourceName = getFileInfo.FileName
        dataForm.value.logoResourceKey = "logoResourceKey";
        logoBase64String.value = getFileInfo.Content
        logoBase64ImgType.value = `image/${uploadRes?.selection?.extension}`
        setupEnvironment();
      }
    }
  }, 1000);

  initiBrowseLogo.value = true;
  let uploadRes = await manaLib.browsePhoto("logoResourceKey");
  if (uploadRes?.selection?.isComplete) {
    let getFileInfo = await manaLib.getPhotoInfo("logoResourceKey")
    if (getFileInfo) {
      clearInterval(interval);
      dataForm.value.logoResourceName = getFileInfo.FileName
      dataForm.value.logoResourceKey = "logoResourceKey";
      logoBase64String.value = getFileInfo.Content
      logoBase64ImgType.value = `image/${uploadRes?.selection?.extension}`
      setupEnvironment();
    }
  }
}

const initiBrowsePhoto = ref(false);
const uploadShopImg = async () => {

  // HACK: Fix bug in case browsePhoto does not respond (Android)
  // Verifying if any photo has been selected on the device
  var interval = setInterval(async () => {
    if (initiBrowsePhoto.value) {
      let getFileInfo = await manaLib.getPhotoInfo("shopPicResourceKey")
      if (getFileInfo) {
        clearInterval(interval);

        dataForm.value.shopPicResourceName = getFileInfo.FileName
        dataForm.value.shopPicResourceKey = "shopPicResourceKey";
        shopPicBase64String.value = getFileInfo.Content
        shopPicBase64ImgType.value = `image/${uploadRes?.selection?.extension}`
        setupEnvironment();
      }
    }
  }, 1000);


  initiBrowsePhoto.value = true;
  let uploadRes = await manaLib.browsePhoto("shopPicResourceKey");
  if (uploadRes?.selection?.isComplete) {
    let getFileInfo = await manaLib.getPhotoInfo("shopPicResourceKey")
    if (getFileInfo) {
      clearInterval(interval);
      dataForm.value.shopPicResourceName = getFileInfo.FileName
      dataForm.value.shopPicResourceKey = "shopPicResourceKey";
      shopPicBase64String.value = getFileInfo.Content
      shopPicBase64ImgType.value = `image/${uploadRes?.selection?.extension}`
      setupEnvironment();
    }
  }
}

type Schema = z.output<typeof validationRules>;

const dataForm = ref({
  name: "",
  bizType: [],
  logoHost: "",
  logoPath: "",
  licenseNo: "",
  contactNo: "",
  address: {
    line1: '',
    district: '',
    amphoe: '',
    province: '',
    zipcode: '',
    remark: '',
  } as any,
  schedule: null,
  logoResourceName: "",
  logoResourceKey: "",
  shopPicResourceName: "",
  shopPicResourceKey: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    await postData(event.data, "post-ba-kym-basic-create");
  }
}

const onSelectType = async () => {
  console.log("dataForm.value.bizType", dataForm.value.bizType);

  let optionDlgResult = await manaLib.showOptionDlg("ba-kym-basic-select-type", "2btn", JSON.stringify(dataForm.value.bizType), "ok", "cancel", "f");
  if (optionDlgResult && !optionDlgResult.isCancel) {
    console.log("Done", optionDlgResult);

    dataForm.value.bizType = optionDlgResult?.selection;
  }

}

const displayType = computed(() => {
  if (!dataForm.value.bizType || dataForm.value.bizType.length < 1) {
    return "ระบุประเภทสินค้าและบริการ";
  }

  return dataForm.value.bizType.join(', ')
})

const onSelectAddress = async () => {
  let optionDlgResult = await manaLib.showOptionDlg("ba-kym-fill-address", "1btn", JSON.stringify(dataForm.value.address), "close", "", "f");
  if (optionDlgResult && !optionDlgResult.isCancel) {
    let rsp = optionDlgResult?.selection; //ข้อมูลที่ได้จาก dialog
    descriptionAddress.value = await getAddress(rsp)
    dataForm.value.address = rsp;
  }
  // goVisit("ba", "ba-kym-basic-address", "endp-ba-kym-basic-address")
};
const onSelectSchedule = () => goVisit("ba", "ba-kym-basic-schedule-list", "endp-ba-kym-basic-schedule-list");

</script>
