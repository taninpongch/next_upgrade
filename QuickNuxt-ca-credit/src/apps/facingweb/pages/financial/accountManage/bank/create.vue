<template>
  <MuiPage>
    <MuiHeader title="สร้างบัญชีธนาคาร" />
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <MuiCard>
        <BizSharePartyHero
          src="i-material-symbols-light-universal-currency-outline-rounded"
          title="บัญชีธนาคาร"
        />
        <BizShareInputText
          label="ชื่อเรียกบัญชี"
          placeholder="บัญชีธนาคารของฉัน"
          v-model="dataForm.accountName"
          name="accountName"
        />

        <BizShareValidateItem v-model="dataForm.accountCode" name="accountCode">
          <BizShareItemLink
            title="บัญชีธนาคาร"
            :description="bankName"
            :transparent="false"
            @on-tapped="onSelectBankList"
          />
        </BizShareValidateItem>

        <BizShareInputText
          label="เลขบัญชี"
          placeholder="เช่น 1234567895421"
          inputMode="numeric"
          v-model="dataForm.accountNo"
          name="accountNo"
        />
      </MuiCard>
      <ActionButton text="ตกลง" />
    </BizShareManaForm>
  </MuiPage>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useBankAccountStore();
const { postData } = store;

const validationRules = z.object({
  accountName: z.string().min(1, "Invalid request"),
  accountType: z.string().min(1, "Invalid request"),
  accountCode: z.string().min(1, "Invalid request"),
  accountNo: z.string().min(1, "Invalid request"),
});

type Schema = z.output<typeof validationRules>;
const bankName = ref("กรุณาเลือก");
const dataForm = reactive({
  accountName: "",
  accountType: "ExternalBankAccount",
  accountCode: "",
  accountNo: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    await postData(event.data, "post-create-bank-account");
  }
}

const onSelectBankList = async () => {
  // let optionDlgResult = await manaLib.showOptionDlg("bank-select", "1btn", JSON.stringify({ dataBankSelect: "xyz" }), 'ok', 'cancle', 'f');
  let optionDlgResult = await manaLib.showOptionDlg(
    "bank-select",
    "1btn",
    JSON.stringify({}),
    "close",
    "",
    "f"
  );
  //TODO: handle option dialog result
  if (optionDlgResult && !optionDlgResult.isCancel) {
    dataForm.accountCode = optionDlgResult?.selection?.bankId;
    bankName.value = optionDlgResult?.selection?.bankName;
  }
};
</script>
