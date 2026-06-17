<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage :bg-white="true">
      <div>
        <BizShareSessionTitle label="เลือกร้านค้า" />
        <div v-for="item in itemList">
          <BizShareItemStatus :src="checkImgUrl(item.logoUrl)" :title="item.name" rightText="เลือก" :transparent="true"
            :is-divider="true" @on-tapped="itemSelect(item)" />
          <UDivider />
        </div>
      </div>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

await getManaContext();
const contractStore = useContractStore();
const { dataContract, pending } = storeToRefs(contractStore);
const { getData, postOptionSelect } = contractStore;
const itemList = ref<any>([]);

getData("get-restaurant-list", "delivery").then(() => {
  itemList.value = dataContract.value?.items
});
// // const itemList = ref();
// const convertAll = async (list: any[]) => {
//   itemList.value = list.map((it) => {
//     return {
//       _id: it._id,
//       name: it.name,
//       logoUrl: it.logoUrl.startsWith("https://") ? it.logoUrl : `https://${it.logoUrl}`,
//     };
//   });
// };

const dataForm = reactive({
  _id: "",
  name: "",
  logoUrl: ""
});

const itemSelect = (data: any) => {
  dataForm._id = data._id;
  dataForm.name = data.name;
  dataForm.logoUrl = data.logoUrl;
  onSubmit(dataForm);
};

async function onSubmit(dataForm: any) { 
  await postOptionSelect(dataForm);
}

// TODO: remove when use manalib
const checkImgUrl = (imgUrl: string) => {
  let img = imgUrl.startsWith("https://") ? imgUrl : `https://${imgUrl}`;
  return img
}
</script>
