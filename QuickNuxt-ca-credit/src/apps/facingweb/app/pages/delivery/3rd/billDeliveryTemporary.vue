<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="รายละเอียดธุรกรรม" />
      <MuiCard>
        <BizBillShareTxSummary heading="รายละเอียดธุรกรรม" :data="txsummary" />
        <UDivider />
        <div>
          <!-- <BizShareItem :src="restaurantLogo" :title="data?.data.restaurant?.name" :transparent="true" /> -->
          <BizShareSessionTitle :label='`รายการที่สั่ง (${data?.data?.products?.length} ชิ้น)`' />
          <BizShareItemStatus v-for="(item, i) in data?.data?.products" :key="i"
            :title="`x${item.quantity} ${item.name}`" :description="item.options" :rightText="displayAmount(item.price)"
            :transparent="true" />
        </div>
      </MuiCard>
    </MuiPage>
  </div>

</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useDeliveryStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;

getData("get-bill-delivery-temporary").then(async () => {
});

const txsummary = computed(() => {
  return [
    { description: 'รวมค่าสินค้า', value: manaLib?.toText(data.value.data?.amount, 'all') },
    { description: 'ค่าธรรมเนียม', value: manaLib?.toText(data.value.data?.fee, 'all') },
    { description: 'ค่าจัดส่ง', value: manaLib?.toText(data.value.data?.shippingFee, 'all') },
    { description: 'ส่วนลด', value: `-${manaLib?.toText(data.value.data?.discount, 'all')}` },
    { description: 'ราคารวมทั้งหมด', value: manaLib?.toText(data.value.data?.totalAmount, 'all') }
  ];
});

// const products = computed(() => data?.value.data?.products);

const restaurantLogo = computed(() => {
  const logoUrl = ref('https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png');
  if (data && data.value?.data.restaurant?.logoImage) {
    const rawUrl = ref(data.value?.data.restaurant?.logoImage);
    logoUrl.value = rawUrl.value.startsWith('https://') ? rawUrl.value : `https://${rawUrl.value}`
  }
  return logoUrl.value
})

const displayAmount = (price: any) => {
  return manaLib?.toText(price);
};


</script>