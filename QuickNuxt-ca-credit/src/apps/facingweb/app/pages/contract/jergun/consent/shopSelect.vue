<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage :bg-white="true">
      <div>
        <BizShareSessionTitle label="เลือกร้านค้า" />
        <div v-for="item in itemList">
          <BizShareItemStatus :src="item.logoUrl" :title="item.name" rightText="เลือก" :transparent="true"
            :is-divider="true" @on-tapped="itemSelect(item)" />
          <UDivider />
        </div>
      </div>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const jergunStore = useJergunStore();
const { dataJergun, pending } = storeToRefs(jergunStore);
const { getData, postOptionSelect } = jergunStore;
const itemList = ref<any>([]);

getData("get-restaurant-list").then(async () => {
  itemList.value = dataJergun.value?.items.map((it: any) => ({
    _id: it._id,
    name: it.name,
    logoUrl: it.logohost == "icon" ? it.logoPath : manaLib.getUrl(it.logoHost, it.logoPath)
  }));
});

const dataForm = reactive({
  _id: "",
  name: "",
  logoUrl: ""
});

const itemSelect = async (data: any) => {
  dataForm._id = data._id;
  dataForm.name = data.name;
  dataForm.logoUrl = data.logoUrl;
  onSubmit(dataForm);
};

async function onSubmit(dataForm: any) {
  await postOptionSelect(dataForm);
}

</script>
