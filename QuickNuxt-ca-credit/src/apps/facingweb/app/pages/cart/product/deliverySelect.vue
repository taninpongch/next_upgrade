<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <BizFinancialShareBankList heading="เลือกผู้จัดส่ง" :data="deliveryList" @on-tapped="deliSelect" />
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useCartStore();
const { data, pending } = storeToRefs(store);
const { getData, postOptionSelect } = store;

getData("get-cart-product-deliverySelect").then(() => convertAll(data?.value?.data));
const deliveryList = ref();
const convertAll = async (list: any[]) => {
  deliveryList.value = list.map((it) => {
    return {
      id: it.id,
      src: manaLib.getUrl(it.deliLogoHost, it.deliLogoPath),
      title: it.title,
      description: it.description,
    };
  });
};

const dataForm = reactive({
  deliveryId: "",
  deliveryName: "",
  deliverySrc: ""
});

const deliSelect = (data: any) => {
  dataForm.deliveryId = data.id;
  dataForm.deliveryName = data.title;
  dataForm.deliverySrc = data.src;
  onSubmit(dataForm);
};

async function onSubmit(dataForm: any) {
  await postOptionSelect(dataForm);
}
</script>