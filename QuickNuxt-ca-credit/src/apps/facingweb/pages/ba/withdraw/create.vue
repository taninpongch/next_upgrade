<template>
  <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
    <div v-if="pending">
      <BizShareSkeletonLabel />
    </div>
    <div v-else>
      <MuiPage>
        <MuiHeader title="ถอนเงินออกจากบัญชีร้าน" />
        <MuiCard>
          <BizBAShareTransferInfo :from="transferInfo?.from" :to="transferInfo?.to" />
        </MuiCard>

        <MuiCard>
          <BizShareItemWalletChange src="i-ion-wallet-outline" heading="ถอนไปยัง" :title="dataForm.wallet?.walletName"
            :button="{ icon: 'i-material-symbols-light-repeat', label: '' }"
            :right-text="dispalyWalletAmount(dataForm.wallet?.balance)" @on-tapped="onSelectWallet" />
        </MuiCard>

        <MuiCard>
          <BizShareInputCurrency label="จำนวนเงิน" placeholder="ระบุยอดเงิน" v-model="dataForm.amount" name="amount" />
        </MuiCard>

        <MuiCard>
          <BizShareInputNote label="หมายเหตุ" placeholder="กรุณาระบุ" hint="Optional" v-model="dataForm.remark"
            name="remark" />
        </MuiCard>

      </MuiPage>
    </div>
    <ActionButton text="ตกลง" />
  </BizShareManaForm>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ActionButton, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const transferInfo = ref();

getData('get-ba-withdraw-create').then(async () => {
  dataForm.currency = data.value.currency;
  dataForm.wallet = {
    id: data.value.toWalletId,
    walletName: data.value.toWalletName,
    displayName: data.value.toWalletDisplayName,
    balance: data.value.toWalletBalance
  };
  updateTopic();
});

const validationRules = z.object({
  wallet: z.object({}),
  amount: z.string().min(1, "Invalid request"),
  currency: z.string(),
  remark: z.string()
});

type Schema = z.output<typeof validationRules>;

//TODO:change react to ref
const dataForm = reactive({
  wallet: {} as any,
  amount: "",
  currency: "THB",
  remark: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      baWalletId: data.value.fromWalletId,
      amount: parseFloat(event.data.amount),
      currency: event.data.currency,
      ownerWalletId: event.data.wallet.id,
      remark: event.data.remark
    };
    await postData(formdata, "post-ba-withdraw-create");
  }
}

const onSelectWallet = async () => {
  let optionDlgResult = await manaLib.showOptionDlg("ba-select-wallet", "1btn", JSON.stringify(data.value.wallets), "close", "", "f");
  if (optionDlgResult && !optionDlgResult.isCancel) {
    dataForm.wallet = {
      id: optionDlgResult?.selection.id,
      walletName: optionDlgResult?.selection.walletName,
      displayName: data.value.toWalletDisplayName,
      balance: optionDlgResult?.selection.balance
    };
    updateTopic();
  }
}

const dispalyWalletAmount = computed(() => {
  return (item: any) => {
    return manaLib && item ? `${manaLib.toText(item, 'amt')} ${manaLib.toText(item, 'cur')}` : "";
  };
});

//TODO: use computed
const updateTopic = () => {
  //TODO: change img path
  let displayLogo = "https://failfast.blob.core.windows.net/mana2018/imgs/dfshop.png";
  if (data.value?.logoHost && data.value?.logoPath) {
    displayLogo = manaLib.getUrl(data.value?.fromLogoHost, data.value?.fromLogoPath)
  }

  transferInfo.value = {
    from: {
      heading: "ร้านที่ถอน",
      src: displayLogo,
      title: data.value?.fromName,
      description: dispalyWalletAmount.value(data.value?.fromWalletBalance)
    },
    to: {
      heading: "ถอนไปยัง",
      src: "i-ion-wallet-outline",
      title: dataForm.wallet?.displayName,
      description: dataForm.wallet?.walletName
    }
  };
}

</script>
