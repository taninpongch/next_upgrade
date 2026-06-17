<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="เติมเงินเข้าร้าน" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizBAShareTransferInfo :from="transferInfo?.from" :to="transferInfo?.to" />
        </MuiCard>

        <MuiCard>
          <BizShareItemWalletChange src="i-ion-wallet-outline" heading="เติมจาก" :title="walletselect?.walletName"
            :button="{ icon: 'i-material-symbols-light-repeat', label: '' }" :rightText="walletselect?.balance"
            @on-tapped="onClickSelectWallet" />
        </MuiCard>

        <MuiCard>
          <BizShareInputCurrency label="จำนวนเงิน" placeholder="ระบุยอดเงิน" v-model="dataForm.amount" name="amount" />
        </MuiCard>
        <MuiCard>
          <BizShareInputNote label="หมายเหตุ" placeholder="กรุณาระบุ" hint="Optional" v-model="dataForm.note"
            name="note" />
        </MuiCard>

        <ActionButton text="ตกลง"></ActionButton>
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { getManaContext, ActionButton } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const walletselect = ref();
const transferInfo = ref();

getData('get-ba-topup-create').then(async () => {
  walletselect.value = {
    id: data.value?.wallets[0].id,
    walletName: data.value?.wallets[0]?.walletName,
    balance: manaLib.toText(data.value?.wallets[0]?.balance),
  };
  const baimg = data.value?.bizAccountdata?.logoHost == "icon"
    || data.value?.bizAccountdata?.logoHost == ""
    ? "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png" : manaLib.getUrl(data.value?.bizAccountdata?.logoHost, data.value?.bizAccountdata?.logoPath);

  transferInfo.value = {
    from: {
      heading: "กระเป๋าที่ใช้เติม",
      src: "i-ion-wallet-outline",
      title: walletselect.value?.walletName,
      description: walletselect.value?.balance ? walletselect.value?.balance : "0.00 THB"
    },
    to: {
      heading: "ร้านที่เติมเข้า",
      src: baimg,
      title: data.value?.bizAccountdata.name,
      description: data.value?.bizAccountdata.walletBalance ? manaLib.toText(data.value?.bizAccountdata.walletBalance) : "0.00 THB"
    },
  };
});

const validationRules = z.object({
  currency: z.string().min(1, "Invalid request"),
  amount: z.string().min(1, "Invalid request"),
  note: z.string(),
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  currency: "THB",
  amount: "",
  note: ""
});

const onClickSelectWallet = () => {
  // TODO: implement select wallet
  // await navigateTo("");}
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      currency: event.data.currency,
      amount: parseFloat(event.data.amount),
      baId: data.value.bizAccountdata.baId,
      remark: event.data.note
    };
    await postData(formdata, "post-ba-topup-create");
  }
}
</script>
