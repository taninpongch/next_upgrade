<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ตรวจสอบข้อมูลของคุณ" />
      <BizShareManaForm @submit="onSubmit">
        <MuiCard>
          <BizSharePartyHero :src="srcProfile" :title="data?.name" :subtitle="data?.subName" />
          <BizShareItem title="จำนวนเงิน" :description="amount" class="text-center" :transparent="true"
            :ui="{ title: 'text-base text-sm', description: 'text-base font-semibold text-red-500' }" />
          <BizShareLine />

          <div>
            <BizShareSessionTitle label="กระเป๋าที่ใช้รับ" />
            <UAlert :title="walletSelect.name" icon="i-lucide-wallet" variant="soft"
              :ui="{ icon: { base: 'w-8 h-8 ' } }" />
            <!-- <BizShareItemInfo heading="กระเป๋าที่ใช้รับ" src="i-lucide-wallet" :title="walletSelect.name" /> -->
          </div>

          <BizShareLine />
          <!-- <BizShareItemInfo heading="เพิ่มเติม" title="-" />
        <BizShareLine /> -->
          <BizShareItemInfo heading="หมายเหตุ" :title="data?.remark ? data?.remark : '-'" />
        </MuiCard>
        <ActionButton text="ยืนยัน" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext, ActionButton } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useIms3rdStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const emitName = "onTapped";
const emits = defineEmits([emitName]);

getData("get-receive-pa-confirm").then(async () => {
  console.log("data", data.value);
});

const amount = computed(() => {
  return manaLib.toText(data?.value?.amount, 'all')
});

const walletSelect = computed(() => {
  return {
    name: data?.value?.listwallets?.walletName,
    // amount: manaLib.value?.toText(data?.value?.listwallets?.balance, 'all'),
    // currency: manaLib.value?.toText(data?.value?.listwallets?.balance, 'cur')
  };
});

const srcProfile = computed(() => {
  const img = manaLib.getUrl(data.value?.logoHost, data.value?.logoPath);
  return img;
});

async function onSubmit() {
  var formdata = {
    amount: {
      amountUnit: parseFloat(data?.value?.amount.amountUnit)/1000,
      currency: data?.value?.amount.currency
    },
    remark: data?.value?.remark,
    // listwalletsId: data?.value?.listwallets?.walletId,
    // externalAccountId: ""
  };
  console.log("formdata", formdata);
  await postData(formdata, "post-receive-pa-confirm");
}

</script>