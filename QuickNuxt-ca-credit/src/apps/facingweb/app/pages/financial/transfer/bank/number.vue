<template>
  <MuiPage>
    <MuiHeader title="ระบุบัญชีปลายทาง" />
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <MuiCard>
        <BizShareValidateItem v-model="dataForm.accountCode" name="accountCode">
          <BizShareItemLink
            title="เลือกธนาคาร"
            :description="bankName"
            :transparent="false"
            @on-tapped="onSelectBankList"
          />
        </BizShareValidateItem>
        <BizShareInputText
          label="ระบุหมายเลขบัญชีธนาคาร"
          placeholder="ระบุหมายเลขบัญชีธนาคาร"
          inputMode="numeric"
          v-model="dataForm.accountNo"
          name="accountNo"
        />
      </MuiCard>
      <ActionButton />
    </BizShareManaForm>
  </MuiPage>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types';
import { z } from "zod";
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const transferStore = useTransferStore();
const { postData } = transferStore;

const validationRules = z.object({
  accountType: z.string(),
  accountCode: z.string().min(1, "Invalid request"),
  accountNo: z.string().min(1, "Invalid request"),
});

type Schema = z.output<typeof validationRules>;
const bankName = ref("กรุณาเลือก");
const dataForm = reactive({
  accountType: "ExternalBankAccount",
  accountCode: "",
  accountNo: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    await postData(event.data, 'post-transfer-bank-number');
  }
}

const onSelectBankList = async () => {
  // let optionDlgResult = await manaLib.showOptionDlg("bank-select", "1btn", JSON.stringify({ dataBankSelect: "xyz" }), 'ok', 'cancle', 'f');
  let optionDlgResult = await manaLib.showOptionDlg("bank-select", "1btn", JSON.stringify({}), 'close', '', 'f');
  //TODO: handle option dialog result

  if (optionDlgResult && !optionDlgResult.isCancel) {
    dataForm.accountCode = optionDlgResult?.selection?.bankId;
    bankName.value = optionDlgResult?.selection?.bankName;
  }
}
</script>
