<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="รายการที่ต้องจ่ายทั้งหมด" />

      <BizShareItemStatus v-if="databill?.length > 0" v-for="item in databill" :title="item.title"
        :description="item.description" :src="displayImage(item.logoHost, item.logoPath)"
        :rightText="displayAmount(manaLib.toText(item?.balance))"
        :rightColor="displayColor(manaLib.toText(item?.balance))" @on-tapped="goto(item)" />
      <BizShareEmptyList v-else />
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const { goVisit } = useManaService();
const _data = useBillStore();
const { databill, pending } = storeToRefs(_data);
const { getDataNewBill } = _data;
getDataNewBill("get-employeelist").then(() => {

});


const displayColor = (data: any) => {
  if (data.includes('-')) {
    return "red";
  }
  return "blue";
}

const displayAmount = (data: any) => {
  if (data.includes('-')) {
    return data;
  }
  return data.replace("", "+");
}

const displayImage = (logoHost: string, logoPath: string) => {
  return manaLib.getUrl(logoHost, logoPath) || "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfprofile.png";
};


const goto = async (item: any) => {
  await goVisit("bill", "bill-transactionDetails", item.endpointUrl);
  // await goVisit("bill", "bill-transactionDetails", item.id);
};




</script>