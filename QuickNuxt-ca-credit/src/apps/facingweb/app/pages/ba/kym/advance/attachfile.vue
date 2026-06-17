<template>
  <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
    <div v-if="pending">
      <BizShareSkeletonLabel />
    </div>
    <div v-else>
      <MuiPage>
        <MuiHeader title="การยืนยันตัวตนธุรกิจ" />
        <BizShareSessionTitle label="1. เอกสารตามกฏหมายกำหนดพร้อมลายเซ็น" />
        <MuiCard>
          <BizShareValidateItem v-model="dataForm.certificateCompanyWithSignatureName"
            name="certificateCompanyWithSignatureName">
            <BizShareInputUploadFile btn-label="อัพโหลด" label="1.1 ใบทะเบียนพาณิชย์หรือหนังสือรับรองบริษัท"
              v-model="dataForm.certificateCompanyWithSignatureName" @on-tapped="onSelectCerCompanyDoc" />
            <span v-if="!dataForm.certificateCompanyWithSignatureName" class="error-message">
              กรุณาอัพโหลดใบทะเบียนพาณิชย์หรือหนังสือรับรองบริษัท
            </span>
          </BizShareValidateItem>
        </MuiCard>

        <!-- TODO: lesson learn checkbox session title -->
        <BizShareInputCheckbox text-checkbox="2. กรณีมอบอำนาจพร้อมลายเซ็น" v-model="isTransferAttorney" />
        <MuiCard v-if="isTransferAttorney">
          <BizShareValidateItem v-model="dataForm.certificateLetterOfPowerOfAttorneyName"
            name="certificateLetterOfPowerOfAttorneyName">
            <BizShareInputUploadFile btn-label="อัพโหลด" label="2.1 หนังสือมอบอำนาจ"
              v-model="dataForm.certificateLetterOfPowerOfAttorneyName"
              @on-tapped="onSelectCerLetterOfPowerOfAttorneyDoc" />
          </BizShareValidateItem>
          <BizShareValidateItem v-model="dataForm.certificateAuthorizedIDCardWithSignatureName"
            name="certificateAuthorizedIDCardWithSignatureName">
            <BizShareInputUploadFile btn-label="อัพโหลด" label="2.2 สำเนาบัตรปชช. ผู้รับมอบอำนาจ"
              v-model="dataForm.certificateAuthorizedIDCardWithSignatureName"
              @on-tapped="onSelectCerAuthorizedIDcardDoc" />
          </BizShareValidateItem>
          <BizShareValidateItem v-model="dataForm.certificateAuthorizedAddressName"
            name="certificateAuthorizedAddressName">
            <BizShareInputUploadFile btn-label="อัพโหลด" label="2.3 สำเนาทะเบียนบ้าน ผู้รับมอบอำนาจ"
              v-model="dataForm.certificateAuthorizedAddressName" @on-tapped="onSelectCerAuthorizedAddressDoc" />
          </BizShareValidateItem>
          <BizShareInputCheckbox text-checkbox="หนังสือความยินยอมถอนเงินเข้าบัญชีอื่น"
            v-model="isWithdrawToOtherAccount" />
          <div v-if="isWithdrawToOtherAccount">

            <BizShareValidateItem v-model="dataForm.certificateConsentToWithdrawName"
              name="certificateConsentToWithdrawName">
              <BizShareInputUploadFile btn-label="อัพโหลด" label="2.4. หนังสือความยินยอมถอนเงินเข้าบัญชีอื่น"
                v-model="dataForm.certificateConsentToWithdrawName" @on-tapped="onSelectCerConsentToWithdrawDoc" />
            </BizShareValidateItem>
          </div>

          <BizShareInputUploadFile v-for="(item, index) in dataForm.otherCopyAttorneyNames" btn-label="อัพโหลด"
            :label="item.title" v-model="dataForm.otherCopyAttorneyNames[index].attachName"
            @on-tapped="onSelectEditOtherAttorney(index)" />
          <BizShareItem title="เพิ่มสำเนาบัตรปชช. ผู้มีอำนาจดำนเนิการ" src="i-material-symbols-light-add"
            @on-tapped="onSelectAddOtherAttorney" />
        </MuiCard>

        <BizShareSessionTitle label="3. เอกสารอื่นๆ พร้อมลายเซ็น" />
        <MuiCard>
          <BizShareInputUploadFile v-for="(item, index) in dataForm.optionals" btn-label="อัพโหลด" :label="item.title"
            v-model="dataForm.optionals[index].attachName" @on-tapped="onSelectEditOtherDoc(index)" />
          <BizShareItem v-if="dataForm.optionals.length < 4" title="เพิ่มเอกสารอื่นๆ ของบริษัท"
            src="i-material-symbols-light-add" @on-tapped="onSelectAddOtherDoc" />
        </MuiCard>
      </MuiPage>
    </div>
    <ActionButton text="ตกลง" />
  </BizShareManaForm>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ActionButton, getManaContext, setupEnvironment } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import { addYears } from "date-fns";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const { goVisit } = useManaService();
const displayStatus = (value: any) => value ? "ทำแล้ว" : "";
const isTransferAttorney = ref(false)
const isWithdrawToOtherAccount = ref(false)
const resultRule = ref<any>();

watch(isTransferAttorney, async (newValue, oldValue) => {
  resultRule.value = validationRules.value.safeParse(dataForm.value);
  // validationRules.value.safeParse(dataForm.value);
  // ตรวจสอบว่าค่าใหม่เป็น false และค่าเก่าไม่ใช่ false (เพื่อป้องกันการเรียกซ้ำเมื่อเริ่มต้น)
  if (newValue === false && oldValue !== false) {
    let getFileInfo1 = await manaLib.getPhotoInfo("certificateLetterOfPowerOfAttorneyId")
    let getFileInfo2 = await manaLib.getPhotoInfo("certificateAuthorizedIDCardWithSignatureId")
    let getFileInfo3 = await manaLib.getPhotoInfo("certificateAuthorizedAddressId")
    if (getFileInfo1) {
      await manaLib.deletePhotoInfo("certificateLetterOfPowerOfAttorneyId")
    }
    if (getFileInfo2) {
      await manaLib.deletePhotoInfo("certificateAuthorizedIDCardWithSignatureId")
    }
    if (getFileInfo3) {
      await manaLib.deletePhotoInfo("certificateAuthorizedAddressId")
    }
    dataForm.value.certificateLetterOfPowerOfAttorneyId = ""
    dataForm.value.certificateLetterOfPowerOfAttorneyName = ""
    dataForm.value.certificateAuthorizedIDCardWithSignatureId = ""
    dataForm.value.certificateAuthorizedIDCardWithSignatureName = ""
    dataForm.value.certificateAuthorizedAddressId = ""
    dataForm.value.certificateAuthorizedAddressName = ""
    // TODO: ลบข้อมูลในฟอร์มและข้อมูลใน attachment โดยใช้ libs DeletPhoto
  }
});

watch(isWithdrawToOtherAccount, async (newValue, oldValue) => {
  resultRule.value = validationRules.value.safeParse(dataForm.value);
  // ตรวจสอบว่าค่าใหม่เป็น false และค่าเก่าไม่ใช่ false (เพื่อป้องกันการเรียกซ้ำเมื่อเริ่มต้น)
  if (newValue === false && oldValue !== false) {
    let getFileInfo1 = await manaLib.getPhotoInfo("certificateConsentToWithdrawId")
    if (getFileInfo1) {
      await manaLib.deletePhotoInfo("certificateConsentToWithdrawId")
    }
    dataForm.value.certificateConsentToWithdrawId = ""
    dataForm.value.certificateConsentToWithdrawName = ""
    // TODO: ลบข้อมูลในฟอร์มและข้อมูลใน attachment โดยใช้ libs DeletPhoto
  }
});

const checkvalid = async () => {
  resultRule.value = validationRules.value.safeParse(dataForm.value);
  const result = validationRules.value.safeParse(dataForm.value);
  if (result.success) {
    // Proceed with form submission or further processing
  } else {
    // Handle validation errors
  }
};


getData('get-ba-kym-advance-attachfile').then(async () => {
});

const validationRules = computed(() => {
  const baseRules = z.object({
    certificateCompanyWithSignatureName: z.string().min(1, "Invalid request"),
  });
  // Base validation rules
  // Extend rules if "isTransferAttorney" is true
  if (isTransferAttorney.value && !isWithdrawToOtherAccount.value) {
    return baseRules.extend({
      certificateLetterOfPowerOfAttorneyName: z.string().min(1, "Invalid request"),
      certificateAuthorizedIDCardWithSignatureName: z.string().min(1, "Invalid request"),
      certificateAuthorizedAddressName: z.string().min(1, "Invalid request"),
    });
  } else if (isTransferAttorney.value && isWithdrawToOtherAccount.value) {
    // Extend rules if "isWithdrawToOtherAccount" is true
    return baseRules.extend({
      certificateConsentToWithdrawName: z.string().min(1, "Invalid request"),
    });
  }
  // Return base rules if no conditions are met
  return baseRules;
});

type Schema = z.output<typeof validationRules.value>;

const dataForm = ref({
  certificateCompanyWithSignatureId: "",
  certificateLetterOfPowerOfAttorneyId: "",
  certificateAuthorizedIDCardWithSignatureId: "",
  certificateAuthorizedAddressId: "",
  certificateConsentToWithdrawId: "",
  certificateCompanyWithSignatureName: "",
  certificateLetterOfPowerOfAttorneyName: "",
  certificateAuthorizedIDCardWithSignatureName: "",
  certificateAuthorizedAddressName: "",
  certificateConsentToWithdrawName: "",
  otherCopyAttorneyNames: [] as { title: string; attachId: string; attachName: string; }[],
  optionals: [] as { title: string; attachId: string; attachName: string; }[],
});

const onSelectCerCompanyDoc = async () => {
  const param = {
    title: "หนังสือรับรองบริษัทพร้อมลายเซ็น",
    attachId: "certificateCompanyWithSignatureId",
    attachName: dataForm.value.certificateCompanyWithSignatureName
  }
  let uploadRes = await manaLib.browsePhoto(param.attachId);
  if (uploadRes?.selection?.isComplete) {
    let getFileInfo = await manaLib.getPhotoInfo(param.attachId)
    if (getFileInfo) {
      dataForm.value.certificateCompanyWithSignatureId = param.attachId
      dataForm.value.certificateCompanyWithSignatureName = getFileInfo.FileName
      setupEnvironment();
    }
  }
}

const onSelectCerAuthorizedIDcardDoc = async () => {
  const param = {
    title: "สำเนาบัตรปชช. ผู้มีอำนาจลงนามแทนบริษัทและลายเซ็น",
    attachId: "certificateAuthorizedIDCardWithSignatureId",
    attachName: dataForm.value.certificateAuthorizedIDCardWithSignatureName
  }
  let uploadRes = await manaLib.browsePhoto(param.attachId);
  if (uploadRes?.selection?.isComplete) {
    let getFileInfo = await manaLib.getPhotoInfo(param.attachId)
    if (getFileInfo) {
      dataForm.value.certificateAuthorizedIDCardWithSignatureId = param.attachId
      dataForm.value.certificateAuthorizedIDCardWithSignatureName = getFileInfo.FileName
      setupEnvironment();
    }
  }
}

const onSelectCerAuthorizedAddressDoc = async () => {
  const param = {
    title: "สำเนาทะเบียนบ้าน ของกรรมการผู้มีอำนาจ",
    attachId: "certificateAuthorizedAddressId",
    attachName: dataForm.value.certificateAuthorizedAddressName
  }
  let uploadRes = await manaLib.browsePhoto(param.attachId);
  if (uploadRes?.selection?.isComplete) {
    let getFileInfo = await manaLib.getPhotoInfo(param.attachId)
    if (getFileInfo) {
      dataForm.value.certificateAuthorizedAddressId = param.attachId
      dataForm.value.certificateAuthorizedAddressName = getFileInfo.FileName
      setupEnvironment();
    }
  }
}

const onSelectCerConsentToWithdrawDoc = async () => {
  const param = {
    title: "หนังสือยินยอมถอนเงินเข้าบัญชีที่บริษัทกำหนด",
    attachId: "certificateConsentToWithdrawId",
    attachName: dataForm.value.certificateConsentToWithdrawName
  }
  let uploadRes = await manaLib.browsePhoto(param.attachId);
  if (uploadRes?.selection?.isComplete) {
    let getFileInfo = await manaLib.getPhotoInfo(param.attachId)
    if (getFileInfo) {
      dataForm.value.certificateConsentToWithdrawId = param.attachId
      dataForm.value.certificateConsentToWithdrawName = getFileInfo.FileName
      setupEnvironment();
    }
  }
}

const onSelectCerLetterOfPowerOfAttorneyDoc = async () => {
  const param = {
    title: "หนังสือมอบอำนาจ (กรณีไม่ใช่กรรมการดำเนินการ)",
    attachId: "certificateLetterOfPowerOfAttorneyId",
    attachName: dataForm.value.certificateLetterOfPowerOfAttorneyName
  }
  let uploadRes = await manaLib.browsePhoto(param.attachId);
  if (uploadRes?.selection?.isComplete) {
    let getFileInfo = await manaLib.getPhotoInfo(param.attachId)
    if (getFileInfo) {
      dataForm.value.certificateLetterOfPowerOfAttorneyId = param.attachId
      dataForm.value.certificateLetterOfPowerOfAttorneyName = getFileInfo.FileName
      setupEnvironment();
    }
  }
}

const onSelectEditOtherAttorney = async (index: any) => {
  const param = {
    title: `สำเนาบัตรปชช. ผู้มีอำนาจดำเนินการ ${index + 1}`,
    attachId: `otherCopyAttorneyNames${index}`,
    attachName: ""
  }
  let uploadRes = await manaLib.browsePhoto(param.attachId);
  if (uploadRes?.selection?.isComplete) {
    let getFileInfo = await manaLib.getPhotoInfo(param.attachId)
    if (getFileInfo) {
      let isExisting = dataForm.value.otherCopyAttorneyNames.find(it => it.attachId == param.attachId);
      if (isExisting) {
        dataForm.value.otherCopyAttorneyNames[index].title = param.title
        dataForm.value.otherCopyAttorneyNames[index].attachId = param.attachId
        dataForm.value.otherCopyAttorneyNames[index].attachName = getFileInfo.FileName
      }
      else {
        dataForm.value.otherCopyAttorneyNames.push({ title: param.title, attachId: param.attachId, attachName: getFileInfo.FileName });
      }
      setupEnvironment();
    }
  }
}

const onSelectAddOtherAttorney = async () => {
  await onSelectEditOtherAttorney(dataForm.value.otherCopyAttorneyNames.length);
}

const onSelectEditOtherDoc = async (index: any) => {
  const param = {
    title: `3.${index + 1} เอกสารอื่นๆ ของบริษัท`,
    attachId: `docOptional${index}`,
    attachName: ""
  }
  let uploadRes = await manaLib.browsePhoto(param.attachId);
  if (uploadRes?.selection?.isComplete) {
    let getFileInfo = await manaLib.getPhotoInfo(param.attachId)
    if (getFileInfo) {
      let isExisting = dataForm.value.optionals.find(it => it.attachId == param.attachId);
      if (isExisting) {
        dataForm.value.optionals[index].title = param.title
        dataForm.value.optionals[index].attachId = param.attachId
        dataForm.value.optionals[index].attachName = getFileInfo.FileName
      }
      else {
        dataForm.value.optionals.push({ title: param.title, attachId: param.attachId, attachName: getFileInfo.FileName });
      }
      setupEnvironment();
    }
  }
}

const onSelectAddOtherDoc = async () => {
  let maximumOptionalDocument = 4;
  if (dataForm.value.optionals.length <= maximumOptionalDocument) {
    await onSelectEditOtherDoc(dataForm.value.optionals.length);
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    await postData(event.data, "post-ba-kym-advance-attachfile");
  }
}

</script>