<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ตรวจสอบข้อมูลของคุณ" />
      <BizShareManaForm @submit="onSubmit">
        <MuiCard>
          <BizSharePartyHero :src="tosrc" :title="data?.toName" :subtitle="data?.toSubName" />
          <BizShareSessionTitle label="รายละเอียดธุรกรรม" />
          <UFormGroup v-for="(item, index) in txsummary" :label="item.description">
            <template #hint>
              <!-- <BizShareText :text="item.value" :is-bold="index == txsummary.length - 1"
                :color="index == txsummaryi-lucide-wallet.length - 1 ? 'red' : ''" /> -->
              <BizShareText v-if="index == 3" :text="item.value" :is-bold="index == 3"
                :color="index == 3 ? 'red' : ''" />
              <BizShareText v-else-if="index == 4" :text="`${item.value}`" class="text-gray-400" />
              <BizShareText v-else :text="item.value" />
            </template>
          </UFormGroup>
          <BizShareLine />
          <BizShareItemInfo src="i-lucide-wallet" heading="กระเป๋าผู้จ่าย" :title="data.fromwalletName" />
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

const manaLib = await getManaContext();
const store = useImsStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;

getData("get-pay-confirm").then(async () => {
  console.log("data", data.value);
});

const fromsrc = computed(() => {
  const img = data.value?.fromlogoHost == "icon"
    || data.value?.fromlogoHost == ""
    ? "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png" : manaLib.getUrl(data.value?.fromlogoHost, data.value?.fromlogoPath);
  return img;
});

const tosrc = computed(() => {
  const img = data.value?.tologoHost == "icon"
    || data.value?.tologoHost == ""
    ? "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png" : manaLib.getUrl(data.value?.tologoHost, data.value?.tologoPath);
  return img;
});

const toTaltoPay = computed(() => {
  return `${manaLib.toText(data.value?.totalToPay)} (${manaLib.toText(data.value?.convertTotalToPay)})`;
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
  }, {
    description: ' ',
    value: "รวมทั้งหมด (THB)" + manaLib.toText(data.value?.amountExchange),
  }]

)

async function onSubmit() {
  await postData({}, "post-pay-confirm");
}

</script>