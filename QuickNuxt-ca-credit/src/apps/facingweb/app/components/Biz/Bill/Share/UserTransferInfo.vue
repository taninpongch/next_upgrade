<template>
  <BizSharePartyHero :src="toImage" :title="data?.session?.toName" :subtitle="data?.session?.toSubName" />
  <BizBillShareTxSummary heading="รายละเอียดธุรกรรม" :data="txsummary" />
  <UDivider />
  <BizShareItemInfo heading="Wallet" :src="data?.session?.fromName ? 'i-ion-wallet-outline' : ''"
    :title="data?.session?.fromName ? data?.session?.fromName : '-'" />
  <UDivider />
  <BizShareSessionTitle label="คูปอง" />
  <div v-if="data?.session?.coupon && data?.session?.coupon?.length > 0">
    <BizShareItem v-for="(item) in data?.session?.coupon" :src="item?.src ? item?.src : 'i-ion-ticket-outline'"
      :title="`x ${item?.amount} ${item?.name}`" :transparent="true">
    </BizShareItem>
  </div>
  <div v-else>
    <BizShareItem title="-" :transparent="true" />
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";
const lib = await getManaContext();

const props = withDefaults(
  defineProps<{
    data?: any,
  }>(), {}
)

const txsummary = computed(() => [{
  description: 'จำนวนเงิน',
  value: lib.toText(props?.data?.session?.amount),
}, {
  description: 'ค่าธรรมเนียม',
  value: lib.toText(props?.data?.session?.fee),
}, {
  description: 'ส่วนลด',
  value: `-${lib.toText(props?.data?.session?.discount)}`,
}, {
  description: 'รวมทั้งหมด',
  value: lib.toText(props?.data?.session?.totalAmount),
}])

const fromImage = computed(() => {
  //TODO: change img path
  let displayLogo = "https://failfast.blob.core.windows.net/mana2018/imgs/dfshop.png";
  if (props.data && props.data?.session && props.data?.session?.fromLogoHost && props.data?.session?.fromLogoPath) {
    displayLogo = props.data?.session?.fromLogoHost == 'icon' ? props.data?.session?.fromLogoPath : lib.getUrl(props.data?.session?.fromLogoHost, props.data?.session?.fromLogoPath);
  }
  else if (props.data && props.data?.session && props.data?.session?.fromLogoHost.startsWith("i-")) {
    displayLogo = props.data?.session?.fromLogoHost;
  }

  return displayLogo;
})

const toImage = computed(() => {
  //TODO: change img path
  let displayLogo = "https://failfast.blob.core.windows.net/mana2018/imgs/dfshop.png";
  if (props.data && props.data?.session && props.data?.session?.toLogoHost && props.data?.session?.toLogoPath) {
    displayLogo = props.data?.session?.toLogoHost == 'icon' ? props.data?.session?.toLogoPath : lib.getUrl(props.data?.session?.toLogoHost, props.data?.session?.toLogoPath);
  }
  else if (props.data && props.data?.session && props.data?.session?.toLogoHost.startsWith("i-")) {
    displayLogo = props.data?.session?.toLogoHost;
  }

  return displayLogo;
})

</script>