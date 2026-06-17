<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ตรวจสอบข้อมูลของคุณ" />
      <BizShareManaForm @submit="onSubmit">
        <MuiCard>
          <BizSharePartyHero :src="srcShop" :title="data?.shop?.name" />
          <BizShareItem title="จำนวนเงิน" :description="amount" class="text-center" :transparent="true"
            :ui="{ title: 'text-base text-sm', description: 'text-base font-semibold text-red-500' }" />
          <!-- <BizShareLine />
        <BizShareItemInfo heading="เพิ่มเติม" title="-" /> -->
          <BizShareLine />
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

getData("get-receive-ba-confirm").then(async () => {
  console.log("data", data.value);
});

const amount = computed(() => {
  return manaLib.toText(data?.value?.amount, 'all')
});

const srcShop = computed(() => {
  const img = manaLib.getUrl(data?.value?.shop.logoHost, data?.value?.shop.logoPath);
  return img;
});


async function onSubmit() {
  //TODO: add formdata
  var formdata = {
    shopId: data?.value?.shop?._id,
    amount: {
      amountUnit: parseFloat(data?.value?.amount.amountUnit)/1000,
      currency: data?.value?.amount.currency
    },
    remark: data?.value?.remark,
    // listwalletsId: data?.value?.listwallets?.walletId,
    // externalAccountId: ""
  };
  await postData(formdata, "post-receive-ba-confirm");
}

</script>