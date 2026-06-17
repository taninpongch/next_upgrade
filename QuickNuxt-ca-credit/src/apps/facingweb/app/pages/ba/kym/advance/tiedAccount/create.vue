<template>
  <MuiPage>
    <MuiHeader title="ตรวจสอบเลขบัญชี" />
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <BizShareSessionTitle label="ใส่ข้อมูลบัญชีสำหรับรับเงินตอนถอนออกจากร้าน" />
      <MuiCard>
        <BizShareInputSelect label="ธนาคาร" :options="bankType" v-model="dataForm.bankId" name="accountCode" />
        <BizShareInputText label="เลขบัญชีธนาคาร" placeholder="เช่น 0911234567" inputMode="numeric"
          v-model="dataForm.bankAccountNo" name="accountNo" />
        <BizShareActionNormal label="ตรวจสอบ" color="gray" @on-tapped="checkBankAcc" />
      </MuiCard>
      <MuiCard v-if="isCheck == 'true'">
        <BizShareListInfoHorizontal heading="ข้อมูลบัญชี" :infos="bankInfo" />
      </MuiCard>
      <MuiCard v-else-if="isCheck == 'false'">
        <BizSharePartyHero src="https://failfast.blob.core.windows.net/mana2018/imgs/iconunsuccess.png"
          subtitle="ไม่พบข้อมูลบัญชี" pattern="3" />
      </MuiCard>
      <ActionButton text="ยืนยัน" />
    </BizShareManaForm>
  </MuiPage>
</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const baStore = useBAStore();
const { dataBankAcc } = storeToRefs(baStore);
const { postOptionSelect, getDataCheckBankAcc } = baStore;

const isCheck = ref("");

const _bankinfo = ref();
const bankInfo = computed(() => {
  if (dataBankAcc.value) {
    _bankinfo.value = [
      { label: "ธนาคาร", value: dataBankAcc.value?.bankName },
      { label: "เลขบัญชี", value: dataBankAcc.value?.bankAccountNo },
      { label: "ชื่อบัญชี", value: dataBankAcc.value?.bankAccNameTh },
      { label: " ", value: dataBankAcc.value?.bankAccNameEn },
    ]
  }
  return _bankinfo.value;
});

const bankType = [
  {
    name: "กรุณาเลือก",
    value: "",
  },
  {
    name: "กรุงศรีอยุธยา (BAY)",
    value: "025",
  },
  {
    name: "ธนาคารกรุงเทพ (BBL)",
    value: "002",
  },
  {
    name: "ธนาคารออมสิน (GSB)",
    value: "030",
  },
  {
    name: "ธนาคารกสิกรไทย (KBANK)",
    value: "004",
  },
  {
    name: "ธนาคารกรุงไทย (KTB)",
    value: "006",
  },
  {
    name: "ธนาคารไทยพาณิชย์ (SCB)",
    value: "014",
  },
  {
    name: "ธนาคารทหารไทยธนชาต จำกัด (มหาชน) (TTB)",
    value: "011",
  }
];

const validationRules = z.object({
  bankId: z.string().min(1, "Invalid request"),
  bankAccountNo: z.string().min(1, "Invalid request"),
});

type Schema = z.output<typeof validationRules>;

const dataForm = ref({
  bankId: "",
  bankAccountNo: "",
});

const checkBankAcc = async () => {
  if (dataForm.value.bankId && dataForm.value.bankAccountNo) {
    await getDataCheckBankAcc("get-ba-kym-advance-checkbankacc", `${dataForm.value.bankAccountNo}~${dataForm.value.bankId}`).then(async () => {
      if (dataBankAcc.value) {
        isCheck.value = "true";
      }
      else {
        isCheck.value = "false";
      }
    });
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data && isCheck.value == "true" && dataBankAcc.value) {
    var formdata = {
      bankAccountNo: dataBankAcc.value?.bankAccountNo,
      bankId: dataBankAcc.value?.bankId,
      bankName: dataBankAcc.value?.bankName,
    };
    await postOptionSelect(formdata);
  }
}
</script>
