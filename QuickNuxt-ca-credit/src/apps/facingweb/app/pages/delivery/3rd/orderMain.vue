<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>

    <MuiPage>
      <!-- <BizShareItem :title="gps.title" :description="gps.description" /> -->

      <BizShareItem :src="deliveryLogo" :title="data?.data?.delivery?.name" />
      <MuiCard>
        <BizDeliveryStatusOrder :orderStatus="orderStatus" :displayDate="displayCreateDate"
          :orderCode="data?.data?.orderCode" :statusLogo="statusLogo" :riderLogo="riderLogo"
          :riderName="data?.data?.biker?.name" />
        <BizShareLine />
        <BizShareGroupButton :rightAlignment="true">
          <BizShareActionNormal icon="i-heroicons-phone" label="ติดต่อ" :block="false" color="black" variant="ghost"
            :disabled="true" />
          <BizShareActionNormal :disabled="isHideCancelBtn" label="ยกเลิก" :block="false" color="red" variant="ghost"
            @on-tapped="cancelOrder" />
        </BizShareGroupButton>
      </MuiCard>

      <MuiCard>
        <div>
          <!-- //TODO: รูป bill เป็น https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/bill.png -->
          <div class="flex items-center justify-between mb-2">
            <BizShareSessionTitle label="รายการที่สั่ง" />
            <BizShareImage size="2xs" src="https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/bill.png"
              :rounded="false" @click="gotobill()" />
          </div>
          <BizShareItem :src="restaurantLogo" :title="data?.data?.restaurant?.name" :transparent="true" />
          <BizShareItemStatus v-for="(item, i) in products" :key="i" :title="`x${item.quantity} ${item.name}`"
            :description="item.options" :rightText="displayAmount(item.price)" :transparent="true" />
        </div>
      </MuiCard>
    </MuiPage>
  </div>

</template>

<script setup lang="ts">
// ถามออเรื่องการ update status order
// import pusher from "pusher-js";
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useDeliveryStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;
const isHideCancelBtn = ref(false);
const _displayDate = ref(new Date());
const { goVisit } = useManaService();
const displayCreateDate = ref('');
// const gps = ref({
//   title: '',
//   description: ''
// });

getData("get-order-main").then(async () => {
  displayCreateDate.value = displayDate(data.value?.data?.createDate);
  await manaLib.setGpsAddress(data.value?.data?.shippingAddress);

  // gps.value.title = data.value.data.gps.title;
  // gps.value.description = data.value.data.gps.description;

  if (data.value?.data?.cancelDate) {
    _orderStatus.value.status = 'cancelDate'
  }
  else if (data.value?.data?.cancelRequestId) {
    _orderStatus.value.status = 'cancelRequest'
  }
  else if (data.value?.data?.destinationDate && (!data.value?.data?.cancelRequestId && !data.value?.data?.cancelDate)) {
    _orderStatus.value.status = 'destination'
  }
  else if (data.value?.data?.shippingDate && (!data.value?.data?.cancelRequestId && !data.value?.data?.cancelDate)) {
    _orderStatus.value.status = 'shipping'
  }
  else if (data.value?.data?.acceptRequestDate && (!data.value?.data?.cancelRequestId && !data.value?.data?.cancelDate)) {
    _orderStatus.value.status = 'acceptrequest'
  }
});

const displayDate = (date: string) => {
  return manaLib?.getDateText(date);
};

const displayAmount = (price: any) => {
  return manaLib?.toText(price);
};


const _orderStatus = ref({
  status: 'pending'
})
const orderStatus = computed(() => {
  switch (_orderStatus.value.status) {
    case "pending":
    default:
      return {
        value: null,
        display: 'กำลังค้นหาไรเดอร์...',
        estimate: `เวลาจัดส่งโดยประมาณ ${data.value?.data.predictDeliveryTotalMinutes} นาที`,
        color: 'blue'
      }
    case "acceptrequest":
      isHideCancelBtn.value = false;
      _displayDate.value = data.value?.data?.acceptRequestDate ? data.value?.data?.acceptRequestDate : new Date();
      return {
        value: 1,
        display: 'ไรเดอร์รับออเดอร์',
        estimate: `เวลาจัดส่งโดยประมาณ ${data.value?.data.predictDeliveryTotalMinutes} นาที`,
        color: 'blue'
      }
    case "shipping":
      isHideCancelBtn.value = false;
      _displayDate.value = data.value?.data?.shippingDate ? data.value?.data?.shippingDate : new Date();
      return {
        value: 2,
        display: 'กำลังจัดส่ง...',
        estimate: `เวลาจัดส่งโดยประมาณ ${data.value?.data.predictDeliveryTotalMinutes} นาที`,
        color: 'blue'
      }
    case "destination":
      isHideCancelBtn.value = true;
      _displayDate.value = data.value?.data?.destinationDate ? data.value?.data?.destinationDate : new Date();
      return {
        value: 3,
        display: 'ไรเดอร์ถึงแล้ว',
        estimate: `เวลาจัดส่งโดยประมาณ ${data.value?.data.predictDeliveryTotalMinutes} นาที`,
        color: 'blue'
      }
    case "cancelRequest":
      isHideCancelBtn.value = true;
      return {
        value: null,
        display: 'รอการอนุมัติยกเลิก !',
        estimate: `เวลาจัดส่งโดยประมาณ ${data.value?.data.predictDeliveryTotalMinutes} นาที`,
        color: 'red'
      }
    case "cancelDate":
    case "cancelconfirm":
      isHideCancelBtn.value = true;
      return {
        value: 0,
        display: 'ออเดอร์ถูกยกเลิก',
        estimate: `เวลาจัดส่งโดยประมาณ ${data.value?.data.predictDeliveryTotalMinutes} นาที`,
        color: 'red'
      }
  }
})

const products = computed(() => data.value?.data?.products ?? []);

const statusLogo = computed(() => {
  if (_orderStatus.value && (_orderStatus.value.status === 'cancelDate' || _orderStatus.value.status === 'cancelconfirm')) {
    return 'https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/cancelorder.png'
  }
  return 'https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/waitrider.png'
})

const deliveryLogo = computed(() => {
  const logoUrl = ref('https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/deliveryOrange.png');
  const raw = data.value?.data?.delivery?.logoImage;
  if (raw) {
    logoUrl.value = raw.startsWith('https://') ? raw : `https://${raw}`;
  }
  return logoUrl.value;
})

const riderLogo = computed(() => {
  const logoUrl = ref('https://manadevmaster.blob.core.windows.net/images/dfprofile.png');
  const raw = data.value?.data?.biker?.logoImage;
  if (raw) {
    logoUrl.value = raw.startsWith('https://') ? raw : raw;
  }
  return logoUrl.value;
})

const restaurantLogo = computed(() => {
  const logoUrl = ref('https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png');
  const raw = data.value?.data?.restaurant?.logoImage;
  if (raw) {
    logoUrl.value = raw.startsWith('https://') ? raw : `https://${raw}`;
  }
  return logoUrl.value;
})

const cancelOrder = async () => {
  await goVisit('delivery', 'delivery-order-cancel-request', `cancelRequest:${data.value?.data?.manaEndpoint}`)
};

const gotobill = async () => {
  await goVisit('delivery', 'delivery-bill-temporary', data.value?.data?.manaEndpoint)
};


</script>