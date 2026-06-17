<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ถอนเงิน" />
      <BizShareListItem heading="เลือกบัญชีที่ผูกไว้" :data="myAccount" @on-select-item="callbackPath" />
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const { goVisit } = useManaService();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const myAccount = ref<any>([]);

getData('get-ca-account-list').then(async () => {
  myAccount.value = data.value?.map((it: any) => {
    const img = it.logoHost == "icon"
      || it.logoHost == ""
      ? "https://failfast.blob.core.windows.net/mcontent-imgs/banks/bankacc-grey.svg" : manaLib.getUrl(it.logoHost, it.logoPath);
    return {
      id: it.id,
      src: img,
      title: it.name,
      description: it.accountNumber
    }
  });
});

const imgsrc = computed(() => {
  const img = data.value?.logoHost == "icon"
    || data.value?.logoHost == ""
    ? "https://failfast.blob.core.windows.net/mcontent-imgs/banks/bankacc-grey.svg" : manaLib.getUrl(data.value?.logoHost, data.value?.logoPath);
  return img;
});


const callbackPath = async (item: any) => {
  // TODO: implement select item
  await goVisit("ba", "ca-withdraw-create", item.id);
};
</script>
