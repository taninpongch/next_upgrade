<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage :bg-white="true">
      <div>
        <BizShareSessionTitle label="เลือกร้านค้า" />
        <div v-for="item in itemList">
          <BizShareItemStatus :src="checkImgUrl(item.logoHost, item.logoPath)" :title="item.name" rightText="เลือก"
            :transparent="true" :is-divider="true" @on-tapped="itemSelect(item)" />
          <UDivider />
        </div>
      </div>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const contractStore = useContractStore();
const { dataContract, pending } = storeToRefs(contractStore);
const { getData, postOptionSelect } = contractStore;
const itemList = ref<any>([]);

getData("get-list-shop", "ims").then(async () => {
  itemList.value = dataContract?.value
});

const checkImgUrl = (host: string, path: string) => {
  const img = manaLib.getUrl(host, path);
  return img
}

const dataForm = reactive({
  _id: "",
  name: "",
  logoHost: "",
  logoPath: ""
});

const itemSelect = (data: any) => {
  dataForm._id = data._id;
  dataForm.name = data.name;
  dataForm.logoHost = data.logoHost;
  dataForm.logoPath = data.logoPath;

  onSubmit(dataForm);
};

async function onSubmit(dataForm: any) {
  await postOptionSelect(dataForm);
}

</script>
