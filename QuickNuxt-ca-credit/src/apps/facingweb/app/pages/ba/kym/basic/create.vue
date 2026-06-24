<template>
  <MuiPage>
    <MuiHeader title="สร้างธุรกิจใหม่" />
    <BizShareSessionTitle label="ข้อมูลที่จำเป็น" />
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <MuiCard>
        <BizShareInputText label="ตั้งชื่อธุรกิจของคุณ" placeholder="เช่น ร่ำรวย" v-model="dataForm.name" name="name" />

        <BizShareInputSelect label="วัตถุประสงค์การใช้งาน" placeholder="ระบุวัตถุประสงค์การใช้งาน"
          :options="purposeList" v-model="dataForm.purposeCode" name="purposeCode" />
        <BizShareInputText v-if="dataForm.purposeCode === 'Z999'" label="โปรดระบุวัตถุประสงค์การใช้งาน"
          placeholder="เช่น ธุรกิจส่วนตัว" v-model="dataForm.purposeOther" name="purposeOther" />

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

// "วัตถุประสงค์การใช้งาน สำหรับบัญชีร้านค้า
// เดลิเวอรี่
// เพื่อจ่ายเงินเดือนพนักงาน
// เพื่อรับชำระค่าสินค้าและบริการ
// เพื่อชำระค่าสินค้าจาก Supplier / คู่ค้า
// เพื่อชำระค่าสาธารณูปโภคหรือค่าใช้จ่ายในร้าน
// เพื่อบริหารจัดการเงินหมุนเวียนในธุรกิจ
// อื่นๆ (โปรดระบุ)"


const purposeList = ref([{
  name: 'เดลิเวอรี่', value: 'A001', riskLevel: 'undefined'
}, {
  name: 'เพื่อจ่ายเงินเดือนพนักงาน', value: 'A002', riskLevel: 'undefined'
}, {
  name: 'เพื่อรับชำระค่าสินค้าและบริการ', value: 'A003', riskLevel: 'undefined'
}, {
  name: 'เพื่อชำระค่าสินค้าจาก Supplier / คู่ค้า', value: 'A004', riskLevel: 'undefined'
}, {
  name: 'เพื่อชำระค่าสาธารณูปโภคหรือค่าใช้จ่ายในร้าน', value: 'A005', riskLevel: 'undefined'
}, {
  name: 'เพื่อบริหารจัดการเงินหมุนเวียนในธุรกิจ', value: 'A006', riskLevel: 'undefined'
}, {
  name: 'อื่นๆ (โปรดระบุ)', value: 'Z999', riskLevel: 'undefined'
}
]);

const getpurposename = async (code: string) => {
  switch (code) {
    case "A001": return "เดลิเวอรี่"
      break;
    case "A002": return "เพื่อจ่ายเงินเดือนพนักงาน"
      break;
    case "A003": return "เพื่อรับชำระค่าสินค้าและบริการ"
      break;
    case "A004": return "เพื่อชำระค่าสินค้าจาก Supplier / คู่ค้า"
      break;
    case "A005": return "เพื่อชำระค่าสาธารณูปโภคหรือค่าใช้จ่ายในร้าน"
      break;
    case "A006": return "เพื่อบริหารจัดการเงินหมุนเวียนในธุรกิจ"
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
    case "A006":
    case "Z999":
      return "undefined"
      break;
    default: return "index"
      break;
  }
}



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
        logoBase64ImgType.value = `image/${uploadRes.selection?.extension}`
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
      logoBase64ImgType.value = `image/${uploadRes.selection?.extension}`
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
        shopPicBase64ImgType.value = `image/${uploadRes.selection?.extension}`
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
      shopPicBase64ImgType.value = `image/${uploadRes.selection?.extension}`
      setupEnvironment();
    }
  }
}

type Schema = z.output<typeof validationRules>;

const dataForm = ref({
  name: '',
  bizType: [],
  purposeCode: '',
  purposeOther: '',
  logoHost: '',
  logoPath: '',
  licenseNo: '',
  contactNo: '',
  address: {
    line1: '',
    district: '',
    amphoe: '',
    province: '',
    zipcode: '',
    remark: '',
  } as any,
  schedule: null,
  logoResourceName: '',
  logoResourceKey: '',
  shopPicResourceName: '',
  shopPicResourceKey: '',
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      name: dataForm.value.name,
      bizType: dataForm.value.bizType,
      purposeCode: dataForm.value.purposeCode,
      purposeRiskLevel: await getpurposeriskLevel(dataForm.value.purposeCode),
      purposeName: await getpurposename(dataForm.value.purposeCode),
      logoResourceName: dataForm.value.logoResourceName,
      logoResourceKey: dataForm.value.logoResourceKey,
      licenseNo: dataForm.value.licenseNo,
      contactNo: dataForm.value.contactNo,
      address: {
        line1: dataForm.value.address.line1,
        district: dataForm.value.address.district,
        amphoe: dataForm.value.address.amphoe,
        province: dataForm.value.address.province,
        zipcode: dataForm.value.address.zipcode,
        remark: dataForm.value.address.remark
      },
      // schedule: dataForm.value.schedule,
      shopPicResourceName: dataForm.value.shopPicResourceName,
      shopPicResourceKey: dataForm.value.shopPicResourceKey
    }

    await postData(formdata, "post-ba-kym-basic-create");
  }
}

const onSelectType = async () => {
  let optionDlgResult = await manaLib.showOptionDlg("ba-kym-basic-select-type", "2btn", JSON.stringify(dataForm.value.bizType), "ok", "cancel", "f");
  if (optionDlgResult && !optionDlgResult.isCancel) {
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
