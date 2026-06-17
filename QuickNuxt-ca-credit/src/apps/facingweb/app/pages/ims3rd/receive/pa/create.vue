<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="สร้างคิวอาร์โค้ดรับเงินสำหรับบุคคล" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizSharePartyHero :src="srcProfile" :title="data?.name" :subtitle="data?.subName" />
          <BizShareInputCurrency v-model="dataForm.amount" name="amount" label="จำนวนเงิน" placeholder="ระบุยอดเงิน"
            :currency="walletSelect.currency" />

          <!-- <BizShareItemWalletChange src="i-lucide-wallet" heading="กระเป๋าที่ใช้รับ" :title="walletSelect.name"
            :button="{ icon: 'i-material-symbols-light-repeat', label: '' }" :rightText="walletSelect.amount"
            @on-tapped="gotoselectWallet" /> -->

          <div>
            <BizShareSessionTitle label="กระเป๋าที่ใช้รับ"
              :button="{ icon: 'i-material-symbols-light-repeat', label: '' }" @on-tapped="onSelectWallet" />
            <BizShareItem src="i-lucide-wallet" :title="walletSelect.name" :transparent="true"
              :close-button="{ label: walletSelect.amount, color: 'gray', variant: 'ghost', padded: false }"
              :ui="{ icon: { base: 'w-8 h-8' } }" @click="emits(emitName)" />
          </div>

          <BizShareLine />
          <!-- <BizShareItemInfo heading="เพิ่มเติม" title="-" />
        <BizShareLine /> -->

          <BizShareInputNote v-model="dataForm.remark" label="หมายเหตุ" hint="optional" placeholder="ระบุหมายเหตุ" />
        </MuiCard>
        <ActionButton text="ตกลง" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext, ActionButton } from "@manaapp/ui";
import { storeToRefs } from "pinia";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const store = useIms3rdStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;

const emitName = "onTapped";
const emits = defineEmits([emitName]);

getData("get-receive-pa-create").then(async () => {
  if (data.value?.shortcut) {
    await manaLib.visit("ims3rd", `default/ims-shortcut-dlg?endpointId=closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg`);
  }
});

const walletSelect = computed(() => {
  return {
    name: data?.value?.listwallets?.walletName,
    amount: manaLib.toText(data?.value?.listwallets?.balance, 'all'),
    currency: manaLib.toText(data?.value?.listwallets?.balance, 'cur')
  };
});

const onSelectWallet = async () => {
  let optionDlgResult = await manaLib.showOptionDlg("ims3rd-select-wallet", "1btn", JSON.stringify({}), "close", "", "f");
  if (optionDlgResult && !optionDlgResult.isCancel) {
    walletSelect.value.name = optionDlgResult?.selection.walletName;
    walletSelect.value.amount = manaLib.toText(optionDlgResult?.selection.balance, 'all');
    walletSelect.value.currency = manaLib.toText(optionDlgResult?.selection.balance, 'cur');

    // dataForm.walletId = optionDlgResult?.selection._id;
    // dataForm.currency = manaLib.value?.toText(optionDlgResult?.selection.balance, 'cur');
  }
}

const validationRules = z.object({
  walletId: z.string(),
  currency: z.string(),
  amount: z.string().min(1, "Invalid request"),
  remark: z.string(),
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  walletId: "",
  currency: "USD",
  amount: "",
  remark: "",
});

const srcProfile = computed(() => {
  const img = manaLib.getUrl(data.value?.logoHost, data.value?.logoPath);
  return img;
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
  console.log(walletSelect?.value?.currency);
  console.log(walletSelect?.value?.currency);

  if (event.data) {
    var formdata = {
      name: data.value?.name,
      subName: data.value?.subName,
      logoHost: data.value?.logoHost,
      logoPath: data.value?.logoPath,
      listwallets: {
        _id: data.value?.listwallets?._id,
        walletName: walletSelect.value.name,
      },
      // data: data.value,
      amount: {
        amountUnit: parseFloat(dataForm.amount) * 1000,
        currency: walletSelect.value.currency
      },
      remark: dataForm.remark,
      // externalAccountId: ""
    };
    console.log("formdata", formdata);
    await postData(formdata, "post-receive-pa-create");
  }
}

</script>