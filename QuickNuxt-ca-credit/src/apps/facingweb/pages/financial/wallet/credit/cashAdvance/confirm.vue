<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="จ่ายเงิน" />
      <BizShareManaForm @submit="onSubmit">
        <MuiCard>
          <BizShareSessionTitle label="ผู้รับเงิน" />
          <BizSharePartyHero :src="fromsrc" :title="data.toName" :subtitle="data.toSubName" />
          <BizShareSessionTitle label="รายละเอียดธุรกรรม" />
          <UFormGroup v-for="(item, index) in txsummary" :label="item.description">
            <template #hint>
              <BizShareText v-if="index == 3" :text="item.value" :is-bold="index == 3"
                :color="index == 3 ? 'red' : ''" />
              <BizShareText v-else-if="index == 4" :text="`${item.value}`" class="text-gray-400" />
              <BizShareText v-else :text="item.value" />
            </template>
          </UFormGroup>
          <BizShareLine />
          <BizShareItemInfo src="i-lucide-wallet" heading="กระเป๋าที่ใช้รับ" :title="data.fromwalletName" />
          <BizShareLine />
          <BizShareItemInfo heading="หมายเหตุ" :title="data.remark ? data.remark : '-'" />
        </MuiCard>
        <ActionButton text="ตกลง" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext, ActionButton } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const store = useFinancialStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;

getData("get-cashadvance-confirm").then(async () => {
  // dataForm.id = data.value?.endpointId;
  // dataForm.selectedWalletId = data.value?.wallet.id;
  // dataForm.amount = data.value?.toTalToPay?.amountUnit.toString();
});

const fromsrc = computed(() => {
  const img = data.value?.tologoHost == "icon"
    || data.value?.tologoHost == ""
    ? "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png" : manaLib.getUrl(data.value?.tologoHost, data.value?.tologoPath);
  return img;
});

const txsummary = computed(() =>
  [{
    description: 'จำนวนเงิน',
    value: manaLib.toText(data.value?.amount),
  }, {
    description: 'ค่าธรรมเนียม',
    value: manaLib.toText(data.value?.fee),
  }, {
    description: 'ส่วนลด',
    value: `-${manaLib.toText(data.value?.discount)}`,
  }, {
    description: 'รวมทั้งหมด',
    value: manaLib.toText(data.value?.totalAmount),
  }
    // , {
    //   description: ' ',
    //   value: "รวมทั้งหมด (THB)" + manaLib.value?.toText(data.value?.amountExchange),
    // }
  ]
);

const walletSelect = computed(() => {
  return {
    name: data?.value?.wallets[0]?.walletName,
    balance: manaLib.toText(data?.value?.wallets[0]?.balance),
  };
});

async function onSubmit() {
  await postData({}, "post-cashadvance-confirm");
}

</script>