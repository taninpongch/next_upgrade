<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizSharePartyHero :src="fromSrc" :title="data?.shop?.name" />
          <BizShareInputCurrency label="จำนวนเงิน" placeholder="0.00" currency="THB" v-model="dataForm.amount"
            name="amount" />
          <BizShareItemWalletChange src="i-lucide-credit-card" heading="กระเป๋าเงิน" :title="walletSelect?.walletName"
            :button="{ icon: 'i-material-symbols-light-repeat', label: '' }" :rightText="walletSelect?.balance"
            @on-tapped="onSelectWallet" />
          <BizShareLine />
          <BizFinancialShareAddCoupon heading="คูปอง" :button="{ icon: 'i-ion-plus-circled', label: '' }" :data="[]" />
          <BizShareLine />
          <BizShareInputNote label="หมายเหตุ" placeholder="กรุณาระบุ" hint="Optional" v-model="dataForm.remark"
            name="remark" />
        </MuiCard>
        <ActionButton text="ตกลง" />
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
const store = useCartStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const walletSelect = ref();
const fromSrc = ref();
const { goVisit } = useManaService();

getData("get-cart-additional-credit-create").then(async () => {
  if (data.value?.isSuccess) {
    walletSelect.value = {
      id: data.value?.listwallets[0].id,
      walletName: data.value?.listwallets[0]?.walletName,
      balance: manaLib?.toText(data.value?.listwallets[0]?.balance),
    };
    if (data.value?.shop?.logoHost && data.value?.shop?.logoPath) {
      fromSrc.value = manaLib.getUrl(data.value?.shop?.logoHost, data.value?.shop?.logoPath);
    } else {
      fromSrc.value = "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
    }
    dataForm.id = data.value?.contractId;
    dataForm.selectedWalletId = walletSelect.value?.id;
  } else {
    await goVisit("cart", "dialogNoCreditWallet", data.value?.endpointUrl);
  }
});

const onSelectWallet = async () => {
  let optionDlgResult = await manaLib.showOptionDlg("cart-additional-nexum-credit-selectWallet", "1btn", JSON.stringify({}), "close", "", "f");
  if (optionDlgResult && !optionDlgResult.isCancel) {
    walletSelect.value.id = optionDlgResult?.selection.walletId;
    dataForm.selectedWalletId = walletSelect.value.id;
    walletSelect.value.walletName = optionDlgResult?.selection.walletName;
    walletSelect.value.balance = optionDlgResult?.selection.walletBalance;
  }
}

const validationRules = z.object({
  id: z.string().min(1, "Invalid request"),
  selectedWalletId: z.string().min(1, "Invalid request"),
  amount: z.string().min(1, "Invalid request"),
  remark: z.string(),
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  id: "",
  selectedWalletId: "",
  amount: "",
  remark: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      contractId: event.data.id,
      selectedWalletId: event.data.selectedWalletId,
      amount: {
        amountUnit: parseFloat(event.data.amount) * 1000,
        currency: "THB",
      },
      remark: event.data.remark,
    };
    await postData(formdata, "post-cart-additional-credit-create");
  }
}

</script>