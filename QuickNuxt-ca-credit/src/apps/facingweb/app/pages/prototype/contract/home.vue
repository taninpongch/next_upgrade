<template>
  <MuiPage>
    <!-- <MuiHeader title="Home" /> -->
    <!-- <BizHomeShortcutMenu :data="shortcutItems" @on-tapped="visitEndpoint" /> -->
    <BizHomeFeedMenu :data="feedItems" @on-tapped="visitEndpoint" />
  </MuiPage>
</template>

<style scoped>
div:last-of-type {
  @apply mb-6
}
</style>

<script setup lang="ts">
// const { goVisitWithEndpoint } = useManaService();

const loading = ref<boolean>(true);
const data = ref<any>();

const feedItems = [
  {
    id: 1,
    title: "DemoDelivery",
    description: "คำขอเข้าร่วม DemoDelivery (KYC)",
    src: "https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/dfdelivery.png",
    expirationDate: new Date().toISOString(),
    endpointId: "endpointId",
    endpointUrl: "rider/kyc",
    status: ""
  },
  {
    id: 2,
    title: "DemoDelivery",
    description: "คำขอเข้าร่วม DemoDelivery  (NO KYC)",
    src: "https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/dfdelivery.png",
    expirationDate: new Date().toISOString(),
    endpointId: "endpointId",
    endpointUrl: "rider/nokyc",
    status: ""
  },
  {
    id: 3,
    title: "DemoDelivery",
    description: "คำขอเข้าร่วม DemoDelivery (SHOP)",
    src: "https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/dfdelivery.png",
    expirationDate: new Date().toISOString(),
    endpointId: "endpointId",
    endpointUrl: "shop/main",
    status: ""
  },
  {
    id: 4,
    title: "Demo Devster",
    description: "คำขอทำการเปิด Bussiness Account สำหรับ Delivery",
    src: "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png",
    expirationDate: new Date().toISOString(),
    endpointId: "endpointId",
    endpointUrl: "delivery/main",
    status: ""
  }
]

const visitEndpoint = (value: any) => {
  navigateTo(value.endpointUrl);
  // if (value.endpointUrl) {
  //   let endpoint = value.endpointUrl.replace(/\//g, "_");
  //   goVisitWithEndpoint(endpoint);
  // }
};
</script>
