<template>
  <BizShareManaForm @submit="onSubmit">

    <div v-if="pending">
      <BizShareSkeletonList />
    </div>
    <div v-else>
      <MuiPage>
        <!-- <MuiHeader title="Delivery company" /> -->
        <MuiCard>
          <BizSharePartyHero
            src="https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/deliveryOrange.png"
            title="คำสั่งซื้อของคุณถูกยกเลิกแล้ว" />
          <BizShareListInfoVertical heading="" :infos="bankinfo" />
          <BizShareLine />
          <BizBillShareTxSummary heading="รายละเอียดการคืนเงิน" :data="refundSummary" />
          <BizShareLine />
          <div>
            <BizShareSessionTitle label="รายการที่สั่ง" />
            <BizShareItem :src="data?.data?.restaurant?.logo" :title="data?.data?.restaurant?.name"
              :transparent="true" />
            <BizShareItemStatus v-for="(item, i) in products" :key="i" :title="`x${item.quantity} ${item.name}`"
              :description="item.options" :rightText="displayAmount(item.price)" :transparent="true" />
          </div>
        </MuiCard>
        <ActionButton text="ตกลง"></ActionButton>
      </MuiPage>
    </div>
  </BizShareManaForm>

</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useDeliveryStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const bankinfo = ref<any>([]);

getData("get-order-cancelled").then(async () => {
  bankinfo.value = [
    { label: 'เหตุผล', value: data.value.data?.cancelorder.reason },
    { label: 'การคืนเงิน', value: `คุณได้รับเงินคืน ${manaLib.toText(data.value.data?.cancelorder?.totalToPay)}` },
  ];
});

const products = computed(() => data.value.data?.products);
const displayAmount = (price: any) => {
  return manaLib?.toText(price);
};

const refundSummary = computed(() => [
  { description: 'รวมค่าสินค้า', value: manaLib.toText(data.value.data?.cancelorder?.totalPrice) },
  { description: 'ค่าจัดส่ง', value: manaLib.toText(data.value.data?.cancelorder?.deliveryFree) },
  // { description: 'ส่วนลด', value: "0.00 THB" },
  { description: 'ราคารวมทั้งหมด', value: manaLib.toText(data.value.data?.cancelorder?.totalToPay) }
])

const onSubmit = () => postData({}, "post-order-cancelled");

</script>