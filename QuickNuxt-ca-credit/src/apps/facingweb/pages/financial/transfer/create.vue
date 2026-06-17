<template>
  <div v-if="pending">
    <BizShareSkeletonLogo />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="จ่ายเงิน" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizSharePartyHero :src="src" :title="dataTransfer?.session?.toName"
            :subtitle="dataTransfer?.session?.toSubName" />
          <BizShareInputCurrency label="จำนวนเงิน" placeholder="กรุณาระบุยอดเงิน" currency="THB"
            v-model="dataForm.amount" name="amount" />
          <BizShareItemWalletChange src="i-ion-wallet-outline" heading="เลือกกระเป๋า"
            :title="dataTransfer?.wallet?.walletName" :button="{ icon: 'i-material-symbols-light-repeat', label: '' }"
            :rightText="amount" />
          <UDivider />
          <BizFinancialShareAddCoupon heading="คูปอง" :button="{ icon: 'i-ion-plus-circled', label: '' }"
            :data="dataTransfer?.session?.coupon" />
          <UDivider />
          <BizShareListInfoHorizontal heading="เพิ่มเติม" :infos="refData" />
          <BizShareInputNote label="หมายเหตุ" hint="optional" v-model="dataForm.remark" name="remark" />
        </MuiCard>
        <ActionButton />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types';
import { z } from "zod";
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const transferStore = useTransferStore();
const { postData, getData } = transferStore;
const { dataTransfer, pending } = storeToRefs(transferStore);
const src = ref<any>();
const amount = ref<any>();
getData('get-transfer-create').then(async () => {
  src.value = manaLib.getUrl(dataTransfer?.value?.session?.toLogoHost, dataTransfer?.value?.session?.toLogoPath)
  amount.value = manaLib.toText(dataTransfer?.value?.wallet?.balance);
  convertAll(dataTransfer?.value?.session?.refs)
});

const refData = ref();
const convertAll = async (list: any[]) => {
  refData.value = list.map(it => {
    return {
      label: it.name,
      value: it.value,
    }
  });
};

const validationRules = z.object({
  currency: z.string(),
  amount: z.string().min(1, "Invalid request"),
  remark: z.string(),
});

type Schema = z.output<typeof validationRules>;
const dataForm = reactive({
  currency: 'THB',
  amount: '',
  remark: '',
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      currency: event.data.currency,
      amount: parseFloat(event.data.amount),
      remark: event.data.remark
    }
    await postData(formdata, 'post-transfer-create');
  }
}

</script>
