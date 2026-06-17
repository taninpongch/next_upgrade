<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <BizFinancialShareBankList heading="เลือกร้านค้า" :data="balist" @on-tapped="onSelect" />
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";

const lib = await getManaContext();
const store = useDeliveryStore();
const { data, pending } = storeToRefs(store);
const { getData, postOptionSelect } = store;
const balist = ref<any>([]);

getData("get-partnerships-delivery-consent-shopSelect").then(async () => {
  data.value.map((item: any) => {
    balist.value.push({
      id: item._id,
      src: lib.getUrl(item.logoHost ? item.logoHost : "failfast.blob.core.windows.net", item.logoPath ? item.logoPath : "mcontent-imgs/defaults/dfshop.png"),
      title: item.name,
      location: item.address,
      logoHost: item.logoHost,
      logoPath: item.logoPath,
    })
  })
});

const dataForm = reactive({
  shopLogoHost: "",
  shopLogoPath: "",
  shopId: "",
  shopName: "",
  shopSrc: "",
  shopLocation: {}
});

const onSelect = (item: any) => {
  dataForm.shopId = item.id;
  dataForm.shopName = item.title;
  dataForm.shopSrc = item.src;
  dataForm.shopLocation = item.location;
  dataForm.shopLogoHost = item.logoHost ? item.logoHost : "failfast.blob.core.windows.net";
  dataForm.shopLogoPath = item.logoPath ? item.logoPath : "mcontent-imgs/defaults/dfshop.png";
  onSubmit(dataForm);
}

async function onSubmit(dataForm: any) {
  await postOptionSelect(dataForm);
}
</script>